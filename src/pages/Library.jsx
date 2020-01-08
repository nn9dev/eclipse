import React from 'react';
import ReactDOM from 'react-dom';

import {
	Page,
	Navbar,
	NavLeft,
	NavTitle,
	NavTitleLarge,
	NavRight,
	Link,
	PageContent,
	Searchbar,
	Card,
	Col,
	Block,
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
				<Navbar sliding={false} large={!this.$theme.md} largeTransparent={!this.$theme.md}>
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
							iconMd="material:add" 
							onClick={this.addButton.bind(this)}
						/>
					</NavRight>
					{(!this.$theme.md) ? <NavTitleLarge>Library</NavTitleLarge> : null}
					<Searchbar
						className="searchbar-demo"
						expandable
						searchContainer=".search-list"
						searchIn=".item-title"
						disableButton={!this.$theme.aurora}
					></Searchbar>
				</Navbar>
				{/* Page content */}
				{this.state.games.length > 0 ? 
					(<div className="list no-hairlines" style={{ margin: '0px', marginBottom: '16px', padding: '0px 8px'}}>
						<ul className="row no-gap" style={{ backgroundColor: 'transparent'}}>
							{this.state.games.map((game, i) => (
								<Col key={i.toString()} width="50" medium="33" large="25" xlarge="20">
									<Link href={`/game/${game.id}/play/`} style={{ display: 'block', color: 'inherit' }}>
										<Card className="game-card" noOutline noShadow>
											<div className="boxart" data-id={game.id} style={{ backgroundImage: 'url(' + (!!game.boxart ? game.boxart : 'static/img/default-cover.png') + ')'}} onContextMenu={this.gameMenu.bind(this)}></div>
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
					</div>) : (
						<PageContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px',  height: 'calc(100% - calc(var(--f7-navbar-height) + var(--f7-navbar-large-title-height)))' }}>
							<Block strong inset style={{textAlign: "center", backgroundColor: 'transparent'}}>
								<h1>No Games</h1>
								<p>You can add some games to your library by pressing + in the top right corner.</p>
							</Block>
						</PageContent>
					)
				}
			</Page>
		);
	}

	componentDidMount() {
		Archive.init({
			workerUrl: './static/libarchive/worker-bundle.js'
		});
		eclipse.games.list().then(games => this.setState({ games }));
	}
	
	addButton() {
		const app = this.$f7;

		let addGame = app.actions.create({
			buttons: [
				[
					{
						text: 'Add Game',
						label: true,
					},

					// Game Hub

					{
						text: 'Game Hub',
						color: 'blue',
						onClick: () => this.$f7router.navigate('/game-hub/')
					},

					// Upload Games

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
								this.$f7.preloader.show();
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

					// URL

					{
						text: 'URL',
						color: 'blue',
						onClick: () => {
							app.dialog.prompt('Enter the direct URL for a game', async (link) => {
								try {
									let url = new URL(link);
									app.preloader.show();

									let res = await this.handleGameURL(url.href);
									console.log(res);
									app.preloader.hide();
								} catch (error) {
									console.error(error);
									app.dialog.alert('Please enter a valid URL.');
								}
							});
						}
					}
				],
				[
					{
						text: 'Cancel',
						color: 'blue',
						bold: true,
					}
				],
			],
			// Need to specify popover target
			// targetEl: document.querySelector('.add-game-button'),
		});
	
		// Open
		addGame.open();
	}

	async handleUploadedGames(files) {
		let db = await eclipse.openvgdb.init();
		let games = await Promise.all(
			files.map(
				async (file) => {
					let name = this.$f7.utils.removeDiacritics(file.name);
					let game = await this.gameFromFileName(name, db);
					let data = await this.getFileData(file);
					return {
						file: data,
						...game,
					};
				}
			)
		);
		for (var i in games) {
			await eclipse.games.add(games[i]);
		}
		this.$f7.preloader.hide();
		let res = await eclipse.games.list();
		this.setState({ games: res });
	}

	getFileData(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result)
			reader.onerror = (err) => reject(err);
			reader.readAsBinaryString(file);
		});
	}

	async handleGameURL(url) {
		let db = await eclipse.openvgdb.init();
		let fileName = url.split('/').pop();
		let game = await this.gameFromFileName(fileName, db);
		eclipse.games.add({
			url,
			...game,
		});
		this.$f7.preloader.hide();
		let res = await eclipse.games.list();
		this.setState({ games: res });
		// games[0];
	}

	async gameFromFileName(name, db) {
		// Get file extension & system
		let ext = name.split('.').pop();
		let system = eclipse.system({ fileType: ext });
		
		// Clean file name & split into parts
		var parts = name.replace(/_/g, ' ').replace(/-/g, ' ').replace('%20', ' ').replace(`.${ext}`, '').toLowerCase().split(' ').map(res => {
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

		// Return
		return (games.length > 0) ? games[0] : {
			boxart: '',
			name: name.replace(`.${ext}`, ''),
			system: system.name.short,
		};
	}

	async gameMenu(evt) {
		evt.preventDefault();
		console.log(evt);
		let games = await eclipse.games.get({ id: evt.target.dataset.id });
		let game = games[0];
		console.log(game);
		let system = await eclipse.system({ short: game.system });
		console.log(system);
		f7.actions.create({
			buttons: [
				[
					{
						text: game.name,
						label: true,
					},
					{
						text: 'Rename',
						color: 'blue',
						onClick: () => {
							f7.dialog.prompt(`Rename "${game.name}"`, 'Eclipse', async renamed => {
								console.log(renamed);
								let g = game;
								g.name = renamed;
								await eclipse.games.update(g);
								let games = await eclipse.games.list();
								this.setState({
									games
								});
							}, undefined, `${game.name}`);
						}
					},
					{
						text: 'Change Boxart',
						color: 'blue',
					},
					(game.url != null) ? ({
						text: 'Edit URL',
						color: 'blue',
						onClick: () => {
							this.$f7.dialog.prompt(`Edit URL for "${game.name}"`, 'Eclipse', renamed => {
								console.log(renamed)
							}, _ => {}, `${game.url}`);
						}
					}) : null,
					(game.file == null) ? ({
						text: 'Download',
						color: 'blue',
					}) : null,
					(system.methods.storeSave) ? ({
						text: 'Saves',
						color: 'blue',
					}) : null,
					(system.methods.loadCheats) ? ({
						text: 'Cheats',
						color: 'blue',
					}) : null,
					{
						text: 'Delete',
						color: 'red',
						onClick: () => {
							this.$f7.dialog.confirm(`Are you sure you want to delete ${game.name}?`, async () => {
								await eclipse.games.remove(game.id);
								let games = await eclipse.games.list();
								this.setState({
									games
								});
							});
						}
					},
				].filter(v => !!v),
				[
					{
						text: 'Cancel',
						color: 'blue',
						bold: true,
					}
				],
			],
			// Need to specify popover target
		}).open();
	}
}