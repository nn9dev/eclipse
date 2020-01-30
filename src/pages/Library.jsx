/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

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
	Block
} from 'framework7-react';

import 'regenerator-runtime/runtime';

import { Archive } from 'libarchive.js/main';

export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			games: []
		};
	}

	componentDidMount() {
		// Setup libArchive
		Archive.init({
			workerUrl: './static/libarchive/worker-bundle.js'
		});

		// Bind add button
		global.document
			.querySelector('.add-game-button')
			.addEventListener('click', () => this.addButton());

		// List all games
		global.eclipse.games.list().then(games => this.setState({ games }));
	}

	componentDidUpdate() {
		// Bind Game Cards
		[...global.document.querySelectorAll('.game-card .boxart')].forEach(el => {
			const openGameMenu = evt => this.gameMenu(evt);

			// Unbind Previous
			el.removeEventListener('taphold', openGameMenu);
			el.removeEventListener('taphold', openGameMenu);

			// Bind Again
			el.addEventListener('taphold', openGameMenu);
			el.addEventListener('contextmenu', openGameMenu);
			this.$f7.lazy.loadImage(el);
		});
	}

	// MARK: Games API
	// TODO: Migrate file handling and API results to ../js/eclipse/openvgdb.js

	getFileData(file) {
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line no-undef
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = err => reject(err);
			reader.readAsBinaryString(file);
		});
	}

	async handleUploadedGames(files) {
		const db = await global.eclipse.openvgdb.init();
		const games = await Promise.all(
			files.map(async file => {
				const name = this.$f7.utils.removeDiacritics(file.name);
				const game = await this.gameFromFileName(name, db);
				const data = await this.getFileData(file);
				return {
					file: data,
					...game
				};
			})
		);
		await Promise.all(games.map(async game => global.eclipse.games.add(game)));
		this.$f7.preloader.hide();
		const res = await global.eclipse.games.list();
		this.setState({ games: res });
	}

	async handleGameURL(url) {
		await global.eclipse.openvgdb.init();
		const fileName = url.pathname.split('/').pop();
		const game = await this.gameFromFileName(fileName);
		console.log(game);
		global.eclipse.games.add({
			url: url.href,
			...game
		});
		this.$f7.preloader.hide();
		const res = await global.eclipse.games.list();
		this.setState({ games: res });
	}

	async gameFromFileName(name) {
		// Get file extension & system
		const ext = name.split('.').pop();
		const system = global.eclipse.system({ fileType: ext });

		// Clean file name & split into parts
		const parts = name
			.replace(/_/g, ' ')
			.replace(/-/g, ' ')
			.replace('%20', ' ')
			.replace(`.${ext}`, '')
			.toLowerCase()
			.split(' ')
			.map(res => {
				return res.replace(/\[.*?\]/, '').replace(/\(.*?\)/, '');
			})
			.filter(a => a !== '');

		// Convert into SQL query & run
		const query = `system IS ${parts
			.map(part => `name LIKE '%${part}%' AND system IS '${system.name.short}'`)
			.join('\nOR ')}`;
		const sqlResponses = await global.eclipse.openvgdb.run(query);

		// Reduce More
		const games = sqlResponses.filter(item => {
			const regex = new RegExp(`(?=.*${parts.join(')(?=.*')})`, 'i');
			return regex.test(this.$f7.utils.removeDiacritics(item.name));
		});

		// Return
		if (games.length > 0) {
			return games[0];
		}

		return {
			boxart: '',
			name: name.replace(`.${ext}`, ''),
			system: system.name.short
		};
	}

	// MARK: Add Button

	addButton() {
		const app = this.$f7;
		const addGame = app.actions.create({
			buttons: [
				[
					{
						text: 'Add Game',
						label: true
					},

					// Game Hub

					{
						text: 'Game Hub',
						color: 'blue',
						onClick: () => this.$f7router.navigate('/game-hub/')
					},

					// URL

					{
						text: 'URL',
						color: 'blue',
						onClick: () => {
							app.dialog.prompt('Enter the direct URL for a game', async link => {
								try {
									const url = new URL(link);
									app.preloader.show();
									const res = await this.handleGameURL(url);
									console.log(res);
									app.preloader.hide();
								} catch (error) {
									console.error(error);
									app.dialog.alert('Please enter a valid URL.');
								}
							});
						}
					},

					// Upload Games

					{
						text: 'Files',
						color: 'blue',
						onClick: () => {
							// Get acceted files
							const systems = global.eclipse.systems.flatMap(res => res.fileTypes);
							const archiveTypes = ['zip', '7z', 'rar', 'tar'];
							const acceptsString = [...archiveTypes, ...systems]
								.map(type => `.${type}`)
								.join(', ');

							// Create upload element
							const input = global.document.createElement('input');
							input.setAttribute('type', 'file');
							input.setAttribute('accept', acceptsString);
							input.setAttribute('multiple', true);

							// Handle file upload
							input.onchange = async evt => {
								this.$f7.preloader.show();
								const files = await Promise.all(
									[...evt.target.files].map(async file => {
										const filetype = file.name.split('.').pop();

										// Check if file was an archive
										if (archiveTypes.indexOf(filetype) > -1) {
											// Is an archive, unarcive.
											const archive = await Archive.open(file);
											const archivedFiles = await archive.getFilesArray();

											// Check if there are any supported files, without expanding the zip
											const supported = archivedFiles.filter(res => {
												const type = res.file._name.split('.').pop();
												return systems.indexOf(type) > -1;
											});

											// Check if there are supported games
											if (supported.length > 0) {
												const extractedFiles = await archive.extractFiles();
												const supportedFiles = supported
													.map(res => extractedFiles[res.file._name])
													.filter(v => !!v);
												console.log({
													supported,
													supportedFiles,
													extractedFiles,
													files: archivedFiles
												});
												return supportedFiles;
											}
											return null;
										}
										return file;
									})
								);
								this.handleUploadedGames(files.flat());
							};

							// Open
							input.click();
						}
					}
				],
				[
					{
						text: 'Cancel',
						color: 'blue',
						bold: true
					}
				]
			],
			// Need to specify popover target
			targetEl: global.document.querySelector('.add-game-button')
		});

		// Open
		addGame.open();
	}

	async gameMenu(evt) {
		evt.preventDefault();
		console.log(evt);
		const games = await global.eclipse.games.get({ id: evt.target.dataset.id });
		const game = games[0];
		console.log(game);
		const system = await global.eclipse.system({ short: game.system });
		console.log(system);
		this.$f7.actions
			.create({
				buttons: [
					[
						{
							text: game.name,
							label: true
						},
						{
							text: 'Rename',
							color: 'blue',
							onClick: () => {
								this.$f7.dialog.prompt(
									`Rename "${game.name}"`,
									'Eclipse',
									async renamed => {
										console.log(renamed);
										const g = game;
										g.name = renamed;
										await global.eclipse.games.update(g);
										const list = await global.eclipse.games.list();
										this.setState({
											games: list
										});
									},
									null,
									`${game.name}`
								);
							}
						},
						{
							text: 'Change Boxart',
							color: 'blue'
						},
						{
							text: game.url != null ? 'Edit URL' : null,
							color: 'blue',
							onClick: () => {
								this.$f7.dialog.prompt(
									`Edit URL for "${game.name}"`,
									'Eclipse',
									renamed => {
										console.log(renamed);
									},
									() => {},
									`${game.url}`
								);
							}
						},
						{
							text: !game.file ? 'Download' : null,
							color: 'blue'
						},
						{
							text: system.methods.storeSave ? 'Saves' : null,
							color: 'blue'
						},
						{
							text: system.methods.loadCheats ? 'Cheats' : null,
							color: 'blue'
						},
						{
							text: 'Delete',
							color: 'red',
							onClick: () => {
								this.$f7.dialog.confirm(
									`Are you sure you want to delete ${game.name}?`,
									async () => {
										await global.eclipse.games.remove(game.id);
										const list = await global.eclipse.games.list();
										this.setState({
											games: list
										});
									}
								);
							}
						}
					].filter(v => !!v.text),
					[
						{
							text: 'Cancel',
							color: 'blue',
							bold: true
						}
					]
				],
				// Need to specify popover target
				targetEl: evt.target
			})
			.open();
	}

	render() {
		const { games } = this.state;

		return (
			<Page name="home">
				{/* Top Navbar */}
				<Navbar large={!this.$theme.md} largeTransparent={!this.$theme.md} sliding={false}>
					<NavLeft>
						<Link
							iconIos="f7:bars"
							iconAurora="f7:bars"
							iconMd="material:menu"
							panelOpen="left"
						/>
					</NavLeft>
					<NavTitle sliding>Library</NavTitle>
					{!this.$theme.md ? <NavTitleLarge>Library</NavTitleLarge> : null}
					<NavRight>
						<Link
							searchbarEnable=".search-games-library"
							iconIos="f7:search"
							iconAurora="f7:search"
							iconMd="material:search"
						/>
						<Link
							className="add-game-button"
							iconIos="f7:plus"
							iconAurora="f7:plus"
							iconMd="material:add"
						/>
					</NavRight>
					<Searchbar
						className="search-games-library"
						searchContainer=".search-games-library-list"
						searchIn=".name"
						expandable
						disableButton={!this.$theme.aurora}
					/>
				</Navbar>

				{/* Page content */}

				{games.length > 0 ? (
					<div
						className="list search-games-library-list no-hairlines"
						style={{ margin: '0px', marginBottom: '16px', padding: '0px 8px' }}
					>
						<ul className="row no-gap" style={{ backgroundColor: 'transparent' }}>
							{games.map((game, i) => (
								<Col
									key={i.toString()}
									width="50"
									medium="33"
									large="25"
									xlarge="20"
								>
									<Link
										href={`/game/${game.id}/play/`}
										style={{ display: 'block', color: 'inherit' }}
									>
										<Card className="game-card" noOutline noShadow>
											<div
												className="boxart lazy lazy-fade-in"
												data-id={game.id}
												data-background={
													game.boxart
														? game.boxart
														: 'static/img/default-cover.png'
												}
											/>
											<p className="name">{game.name}</p>
											<p className="system">{game.system}</p>
										</Card>
									</Link>
								</Col>
							))}
							<Col width="50" medium="33" large="25" xlarge="20" />
							<Col width="50" medium="33" large="25" xlarge="20" />
							<Col width="50" medium="33" large="25" xlarge="20" />
							<Col width="50" medium="33" large="25" xlarge="20" />
							<Col width="50" medium="33" large="25" xlarge="20" />
						</ul>
					</div>
				) : (
					<PageContent
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '0px',
							height:
								'calc(100% - calc(var(--f7-navbar-height) + var(--f7-navbar-large-title-height)))'
						}}
					>
						<Block
							strong
							inset
							style={{ textAlign: 'center', backgroundColor: 'transparent' }}
						>
							<h1>No Games</h1>
							<p>
								You can add some games to your library by pressing + in the top
								right corner.
							</p>
						</Block>
					</PageContent>
				)}
			</Page>
		);
	}
}
