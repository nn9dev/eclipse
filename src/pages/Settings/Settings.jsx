import React from 'react';
import { 
	Page, 
	Navbar, 
	Block, 
	BlockTitle, 
	List, 
	ListItem, 
	ListInput, 
	Range, 
	Icon,
	Toggle,
	ListButton,
	f7,
} from 'framework7-react';

export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			settings: eclipse.defaultSettings
		}
	}

	async componentDidMount() {
		let settings = await eclipse.settings();
		this.setState({
			settings,
		});
	}

	render() {
		return (
			<Page>
				<Navbar title="Settings" large={!this.$theme.md} largeTransparent={!this.$theme.md} backLink="Back" />

				{/*

					About

				*/}

				<BlockTitle>About</BlockTitle>
				<List inset>
					<ListItem title="Version" after={this.$f7.version}>
						<div slot="media" className="sidebar-media bg-color-blue">
							<Icon ios="f7:info" md="material:add" aurora="f7:info"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/versions/" title="Version History">
						<div slot="media" className="sidebar-media bg-color-blue">
							<Icon ios="f7:clock_fill" md="material:add" aurora="f7:clock_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/help/" title="Help">
						<div slot="media" className="sidebar-media bg-color-blue">
							<Icon ios="f7:question" md="material:help" aurora="f7:question"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/credits/" title="Credits & Support">
						<div slot="media" className="sidebar-media bg-color-blue">
							<Icon ios="f7:person_2_fill" md="material:add" aurora="f7:person_2_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/credits/" title="Issue Tracker">
						<div slot="media" className="sidebar-media bg-color-black">
							<Icon ios="f7:logo_github" md="material:add" aurora="f7:logo_github"></Icon>
						</div>
					</ListItem>
				</List>


				{/* 
					
					Interface
				
				*/}

				<BlockTitle>Library</BlockTitle>
				<List inset color="green">
					<ListItem title="List View">
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:list_bullet" md="material:add" aurora="f7:list_bullet"></Icon>
						</div>
						<Toggle slot="after" name="libraryListView" onChange={this.toggleChanged.bind(this)} defaultChecked={!!this.state.settings.libraryListView} />
					</ListItem>
					<ListItem
						title="Sort Library"
						smartSelect
						smartSelectParams={{openIn: 'popover'}}
					>
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:sort_down" md="material:add" aurora="f7:sort_down"></Icon>
						</div>
						<select name="sortlibraryby" defaultValue={this.state.settings.sortLibraryBy}>
							<option value="name">Name</option>
							<option value="system">System</option>
							<option value="recentlyAdded">Recently Added</option>
							<option value="recentlyPlayed">Recently Played</option>
						</select>
					</ListItem>
				</List>
				
				{/* 
					
					Emulation
				
				*/}

				<BlockTitle>Emulation</BlockTitle>
				<List inset color="green">
					<ListItem
						title="Auto-save Rate"
						smartSelect
						smartSelectParams={{openIn: 'sheet'}}
					>
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:floppy_disk" md="material:save" aurora="f7:floppy_disk"></Icon>
						</div>
						<select name="autosaverate" defaultValue={this.state.settings.autosaveRate}>
							<option value="never">Never</option>
							<option value="1000">1s</option>
							<option value="5000">5s</option>
							<option value="10000">10s</option>
							<option value="15000">15s</option>
							<option value="30000">30s</option>
							<option value="45000">45s</option>
							<option value="60000">1m</option>
							<option value="300000">5m</option>
							<option value="600000">10m</option>
							<option value="900000">15m</option>
							<option value="1800000">30m</option>
							<option value="2700000">45m</option>
							<option value="3600000">1h</option>
						</select>
					</ListItem>
					<ListItem title="Audio">
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:speaker_2_fill" md="material:add" aurora="f7:speaker_2_fill"></Icon>
						</div>
						<Toggle slot="after" name="audio" onChange={this.toggleChanged.bind(this)} defaultChecked={this.state.settings.audio} />
					</ListItem>
					<ListItem title="Aspect Ratio">
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:tv_fill" md="material:add" aurora="f7:tv_fill"></Icon>
						</div>
						<Toggle slot="after" name="fillScreen" onChange={this.toggleChanged.bind(this)} defaultChecked={!this.state.settings.fillScreen} />
					</ListItem>
					<ListItem title="Hide Controls">
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:eye_slash_fill" md="material:add" aurora="f7:eye_slash_fill"></Icon>
						</div>
						<Toggle slot="after" name="desktopMode" onChange={this.toggleChanged.bind(this)} defaultChecked={this.state.settings.desktopMode} />
					</ListItem>
					<ListInput label="Controller Opacity" input={false}>
						<div slot="media" className="sidebar-media bg-color-red">
							<Icon ios="f7:eyeglasses" md="material:add" aurora="f7:eyeglasses"></Icon>
						</div>
						<Range color="blue" slot="input" label={true} value={this.state.settings.controllerOpacity} min={0} max={100} step={1}/>
					</ListInput>
				</List>
				
				{/* 
				
					Cloud
				
				*/}

				<BlockTitle>Cloud</BlockTitle>
				<List inset>
					<ListItem link="#" title="Google Drive" footer="Importing games from Google Drive">
						<img slot="media" className="social-icons" src="static/img/google-drive.jpg" />
					</ListItem>
					<ListItem link="/cloud/dropbox/" title="Dropbox" footer="Sync saves, games, and other settings.">
						<img slot="media" className="social-icons" src="static/img/dropbox.jpg" />
					</ListItem>
				</List>
				
				{/* 
				
					Social
				
				*/}

				<BlockTitle>Social</BlockTitle>
				<List inset>
					<ListItem link="#" external title="Discord" footer="Official Zenith Devs Discord">
						<img slot="media" className="social-icons" src="static/img/discord.png" />
					</ListItem>
					<ListItem link="https://reddit.com/r/eclipseemu" external title="Reddit" footer="Offical Subreddit">
						<img slot="media" className="social-icons" src="static/img/reddit.png" />
					</ListItem>
					<ListItem link="https://twitter.com/tryeclipse" external title="Twitter" footer="Offical Twitter">
						<img slot="media" className="social-icons" src="static/img/twitter.png" />
					</ListItem>
				</List>

				{/* 
				
					Backups
				
				*/}
				
				<BlockTitle>Backups</BlockTitle>
				<List inset>
					<ListButton color="blue" title="Import Backup" />
					<ListButton color="blue" title="Export Backup" />
				</List>

				{/* 
				
					Reset
				
				*/}

				<BlockTitle>Reset</BlockTitle>
				<List inset>
					<ListButton onClick={this.resetGames} title="Reset Games" />
					<ListButton onClick={this.resetSources} title="Reset Sources" />
					<ListButton onClick={this.resetSkins} title="Reset Skins" />
					<ListButton onClick={this.resetEverything} title="Reset All Content & Settings" />
				</List>
			</Page>
		);
	}

	/* 
	
		Set Settings
	
	*/

	async toggleChanged(evt) {
		let settingsChanged = {}
		let el = evt.target;
		let key = el.getAttribute('name');
		settingsChanged[key] = el.checked;
		console.log(settingsChanged);
		await eclipse.setSettings(settingsChanged);
		let settings = await eclipse.settings();
		this.setState({
			settings,
		});
	}

	/* 

		Reset

	*/

	async resetGames() {
		f7.dialog.confirm('Are you sure you want to reset your games?', async() => {
			let games = await eclipse.games.list();
			let files = games.map(g => g.file).filter(v => !!v);
			await eclipse.storage.removeItem('games');
			files.forEach(async file => {
				await eclipse.storage.removeItem(file);
			});
			f7.toast.create({
				text: 'Games successfully reset.',
				closeTimeout: 4000,
			}).open();
		});
	}

	async resetSources() {
		f7.dialog.confirm('Are you sure you want to reset your sources?', async () => {
			await eclipse.storage.removeItem('repos');
			f7.toast.create({
				text: 'Sources successfully reset.',
				closeTimeout: 4000,
			}).open();
		});
	}

	async resetSkins() {
		f7.dialog.confirm('Are you sure you want to reset your skins?', async () => {
			await eclipse.storage.removeItem('skins');
			f7.toast.create({
				text: 'Skins successfully reset.',
				closeTimeout: 4000,
			}).open();
		});
	}

	async resetEverything() {
		f7.dialog.confirm('Are you sure you want to reset Eclipse to its default settings?', async () => {
			await eclipse.storage.clear();
			await localStorage.clear();
			location.reload(true);
		});
	}
}