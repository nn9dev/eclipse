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
} from 'framework7-react';

export default class extends React.Component {
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
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:info" md="material:add" aurora="f7:info"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/versions/" title="Version History">
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:clock" md="material:add" aurora="f7:clock"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/help/" title="Help">
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:question" md="material:help" aurora="f7:question"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/credits/" title="Credits & Support">
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:person_2" md="material:add" aurora="f7:person_2"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/credits/" title="Issue Tracker">
						<div slot="media" className="sidebar-media sb-system-bg">
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
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:list_bullet" md="material:add" aurora="f7:list_bullet"></Icon>
						</div>
						<Toggle slot="after" defaultChecked={false} />
					</ListItem>
					<ListItem
						title="Sort Library"
						smartSelect
						smartSelectParams={{openIn: 'popover'}}
					>
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:sort_down" md="material:add" aurora="f7:sort_down"></Icon>
						</div>
						<select name="sortlibraryby" defaultValue={['name']}>
							<option value="name">Name</option>
							<option value="system">System</option>
							<option value="system">Recently Added</option>
							<option value="system">Recently Played</option>
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
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:floppy_disk" md="material:save" aurora="f7:floppy_disk"></Icon>
						</div>
						<select name="autosaverate" defaultValue={['name']}>
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
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:speaker_2" md="material:add" aurora="f7:speaker_2"></Icon>
						</div>
						<Toggle slot="after" defaultChecked />
					</ListItem>
					<ListItem title="Aspect Ratio">
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:tv" md="material:add" aurora="f7:tv"></Icon>
						</div>
						<Toggle slot="after" defaultChecked={!false} />
					</ListItem>
					<ListItem title="Hide Controls">
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:eye_slash" md="material:add" aurora="f7:eye_slash"></Icon>
						</div>
						<Toggle slot="after" defaultChecked={false} />
					</ListItem>
					<ListInput label="Controller Opacity" input={false}>
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon ios="f7:eyeglasses" md="material:add" aurora="f7:eyeglasses"></Icon>
						</div>
						<Range color="blue" slot="input" label={true} value={60} min={0} max={100} step={1}/>
					</ListInput>
				</List>
				
				{/* 
				
					Cloud
				
				*/}

				<BlockTitle>Cloud</BlockTitle>
				<List inset>
					<ListItem link="#" title="Google Drive" footer="Importing games from Google Drive">
						<div slot="media" className="sidebar-media sb-system-bg">
							<Icon f7="logo_google"></Icon>
						</div>
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
					<ListButton title="Reset Games" />
					<ListButton title="Reset Sources" />
					<ListButton title="Reset Skins" />
					<ListButton title="Reset All Content & Settings" />
				</List>
			</Page>
		);
	}
}