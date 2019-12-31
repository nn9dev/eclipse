import React from 'react';
import {
	Page,
	Navbar,
	NavLeft,
	NavTitle,
	NavTitleLarge,
	NavRight,
	Link,
	Subnavbar,
	Searchbar,
	List,
	ListItem,
	Card,
	Row,
	Col,
} from 'framework7-react';
// import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { Archive } from 'libarchive.js/main.js';

export default class extends React.Component {

	constructor() {
		super();
		this.state = {
			games: [],
		}
	}
	
	render() {
		return (
			<Page name="home">
				{/* Top Navbar */}
				<Navbar sliding={false} large largeTransparent>
					<NavLeft>
						<Link iconIos="f7:bars" iconAurora="f7:bars" iconMd="material:menu" panelOpen="left" />
					</NavLeft>
					<NavTitle sliding>Library</NavTitle>
					<NavRight>
						{(this.$f7.theme != 'aurora') ? <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search"></Link> : null}
						<Link 
							className="add-game-button" 
							iconIos="f7:plus" 
							iconAurora="f7:plus" 
							iconMd="material:menu" 
							onClick={this.addButton.bind(this)}
						/>
					</NavRight>
					<NavTitleLarge>Library</NavTitleLarge>
					<Searchbar
						className="searchbar-demo"
						expandable
						searchContainer=".search-list"
						searchIn=".item-title"
						disableButton={!this.$theme.aurora}
					></Searchbar>
				</Navbar>
				{/* Page content */}
				<div className="list no-hairlines" style={{ margin: '0px', marginBottom: '16px', padding: '0px 8px'}}>
					<ul className="row no-gap" style={{ backgroundColor: 'transparent'}}>
						{Array(25).fill({
							id: this.$f7.utils.id(),
							name: 'Pokémon Emerald',
							system: 'GBA',
							boxart: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn3.spong.com%2Fpack%2Fp%2Fo%2Fpokemoneme179293l%2F_-Pokemon-Emerald-GBA-_.jpg&f=1&nofb=1',
						}).map((game, i) => (
							<Col key={i.toString()} width="50" medium="33" large="25" xlarge="20">
								<Link href={`/game/${game.id}/play/`} style={{ display: 'block', color: 'inherit' }}>
									<Card className="game-card" noOutline noShadow>
										<div className="boxart" data-id={game.id} style={{ backgroundImage: `url(${game.boxart})`}} onContextMenu={this.gameMenu.bind(this)}></div>
										<p className="name">{ game.name }</p>
										<p className="system">{ game.system }</p>
									</Card>
								</Link>
							</Col>
						))}
						<Col width="50" medium="33" large="25" xlarge="20"></Col>
						<Col width="50" medium="33" large="25" xlarge="20"></Col>
						<Col width="50" medium="33" large="25" xlarge="20"></Col>
						<Col width="50" medium="33" large="25" xlarge="20"></Col>
						<Col width="50" medium="33" large="25" xlarge="20"></Col>
					</ul>
				</div>
			</Page>
		);
	}

	componentDidMount() {
		Archive.init({
			workerUrl: './static/libarchive/worker-bundle.js'
		});
		eclipse.games.init().then(() => eclipse.games.list().then(
			games => {
				this.setState({
					games,
				})
			})
		);
	}

	addButton() {
		const app = this.$f7;

		let addGame = app.actions.create({
			buttons: [
				{
					text: 'Add Game',
					label: true,
				},
				{
					text: 'Game Hub',
					color: 'blue',
					onClick: () => this.$f7router.navigate('/game-hub/')
				},
				{
					text: 'Upload',
					color: 'blue',
					onClick: () => {

						// Get acceted files
						let systems = eclipse.systems.flatMap(res => res.fileTypes);
						let archiveTypes = ['zip', '7z', 'rar', 'tar'];
						let acceptsString = [...archiveTypes, ...systems].map(type => `.${type}`).join(', ');

						// Create upload element
						let input = document.createElement('input');
						input.setAttribute('type', 'file');
						input.setAttribute('accept', acceptsString);
						input.setAttribute('multiple', true);
						
						// Handle file upload
						input.onchange = async (evt) => {
							let files = await Promise.all([...evt.target.files].map(async (file) => {
								let filetype = file.name.split('.').pop();

								// Check if file was an archive
								if (archiveTypes.indexOf(filetype) > -1) {

									// Is an archive, unarcive.
									let archive = await Archive.open(file);
									let files = await archive.getFilesArray();

									// Check if there are any supported files, without expanding the zip
									let supported = files.filter(res => {
										let type = res.file._name.split('.').pop();
										return systems.indexOf(type) > -1;
									});

									// Check if there are supported games
									if (supported.length > 0) {
										let extractedFiles = await archive.extractFiles();
										let supportedFiles = supported.map(res => extractedFiles[res.file._name]).filter(v => !!v);
										console.log({supported, supportedFiles, extractedFiles, files});
										return supportedFiles;
									}
									return;
								}
								return file;
							}));
							this.handleUploadedGames(files.flat());
						}

						// Open
						input.click();
					}
				},
				{
					text: 'URL',
					color: 'blue',
					onClick: () => {
						app.dialog.prompt('Enter the direct URL for a game', (link) => {
							try {
								let url = new URL(link);
							} catch {
								app.dialog.alert('Please enter a valid URL.');
							}
						});
					}
				},
				{
					text: 'Cancel',
					color: 'red',
				},
			],
			// Need to specify popover target
			targetEl: document.querySelector('.add-game-button'),
		});
	
		// Open
		addGame.open();
	}

	async handleUploadedGames(files) {
		let db = await eclipse.openvgdb.init();
		console.time(`${file.name}`);
		let games = await Promise.all(
			files.map(
				async (file) => {
					// Clean file name
					let name = this.$f7.utils.removeDiacritics(file.name);

					// Get file extension & system
					let ext = name.split('.').pop();
					let system = eclipse.system({ fileType: ext });
					console.log('system')
					
					// Clean file name & split into parts
					var parts = name.replace(/_/g, ' ').replace(/-/g, ' ').replace(`.${ext}`, '').toLowerCase().split(' ').map(res => {
						return res.replace(/\[.*?\]/, "").replace(/\(.*?\)/, "")
					}).filter(a => a != '');

					// Convert into SQL query & run
					let query = `system IS ${parts.map(part => `name LIKE '%${part}%' AND system IS '${system.name.short}'`).join('\nOR ')}`;
					let sqlResponses = await eclipse.openvgdb.run({
						query,
						db,
					});

					// Reduce More
					let games = sqlResponses.filter(item => {
						var regex = new RegExp(`(?=.*${parts.join(')(?=.*')})`, 'i');
						return regex.test(this.$f7.utils.removeDiacritics(item.name));
					});

					// Return response

					return {
						file,
						games,
					};
				}
			)
		);
		console.timeEnd(`${file.name}`);
		console.log(games)
	}

	async gameMenu(evt) {
		evt.preventDefault();
		console.log(this);
		let game = await eclipse.games.get({ id: evt.target.dataset.id });

		this.$f7.actions.create({
			buttons: [
				{
					text: game.name,
					label: true,
				},
				{
					text: 'Button 1',
					color: 'blue',
				},
				{
					text: 'Button 2',
					color: 'blue',
				},
				{
					text: 'Cancel',
					color: 'red',
				},
			],
			// Need to specify popover target
			targetEl: evt.target,
		}).open();
	}
}