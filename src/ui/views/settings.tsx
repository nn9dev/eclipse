//@ts-nocheck
import React from 'react';
import Page from '../components/page';
import Navbar from '../components/navbar';
import { List, ListItem, ListTitle, ListFooter } from '../components/list';
import Toggle from '../components/toggle';
import LazyImage from '../components/lazy-image';

export default function Settings() {
	return (
		<Page>
			<Navbar back title="Settings" />

			{/* General */}

			<ListTitle title="General" />
			<List>
				<ListItem
					link='/about'
					media={<i className="f7-icons">info_circle_fill</i>}
					title="About"
				/>
				<ListItem
					link='https://eclipseemu.me/faq.html'
					external
					media={<i className="f7-icons">question_circle_fill</i>}
					title="Help"
				/>
				<ListItem
					link='https://github.com/iGBAEmu/EclipseIssues'
					external
					media={<i className="f7-icons">logo_github</i>}
					title="Issue Tracker"
				/>
				<ListItem
					link='/skins'
					media={<i className="f7-icons">layers_fill</i>}
					title="Skins"
				/>
			</List>

			{/* Emulation */}

			<ListTitle title="Emulation" />
			<List>
				<ListItem 
					title="Audio" 
					media={<i className="f7-icons">speaker_2_fill</i>}
					after={<Toggle name="audio" defaultChecked onChange={console.log} />}
				/>
				<ListItem 
					title="Touch Controls" 
					media={<i className="f7-icons">eye_fill</i>}
					after={<Toggle name="fillScreen" defaultChecked onChange={console.log} />}
				/>
				<ListItem 
					title="Fill Screen" 
					media={<i className="f7-icons">tv_fill</i>}
					after={<Toggle name="fillScreen" defaultChecked onChange={console.log} />}
				/>
			</List>

			{/* Backup */}

			<ListTitle title="Backup" />
			<List>
				<ListItem 
					link="#"
					title="Export Backup" 
					media={<i className="f7-icons">arrow_down_doc_fill</i>}
					onClick={() => {
						alert('Hello');
					}}
				/>
				<ListItem 
					link="#"
					title="Import Backup" 
					media={<i className="f7-icons">arrow_up_doc_fill</i>}
					onClick={() => {
						alert('Hello');
					}}
				/>
			</List>
			<ListFooter>Backups contain all your Eclipse data (minus ROMs and tokens).</ListFooter>

			{/* Social */}

			<ListTitle title="Social" />
			<List>
				<ListItem
					link='https://twitter.com/tryeclipse'
					external
					media={<LazyImage src="https://api.zenithdevs.com/eclipse/twitter/twitter" />}
					title="Twitter"
					subtitle="The official Twitter account"
				/>
				<ListItem
					link='https://reddit.com/r/eclipseemu'
					external
					media={<LazyImage src="https://api.zenithdevs.com/eclipse/twitter/reddit" />}
					title="Reddit"
					subtitle="The official subreddit"
				/>
				<ListItem
					link='https://discord.gg/QcX8FQR'
					external
					media={<LazyImage src="https://api.zenithdevs.com/eclipse/twitter/discord" />}
					title="Discord"
					subtitle="The official Discord server"
				/>
				<ListItem
					link='https://github.com/zenithdevs/eclipse'
					external
					media={<LazyImage src="https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/4b/75/74/4b757442-8ff0-1bcb-dfde-8d39fba370c4/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/246x0w.png" />}
					title="GitHub"
					subtitle="The official git repo"
				/>
			</List>
		</Page>
	);
}