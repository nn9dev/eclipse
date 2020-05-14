//@ts-nocheck
import React from 'react';
import Page from '../components/page';
import Navbar from '../components/navbar';
import LazyImage from '../components/lazy-image';
import { List, ListItem, ListTitle } from '../components/list';

const openSourceLibs = [
	{
		name: 'React',
		developer: 'Facebook',
		logo: 'https://reactjs.org/icons/icon-48x48.png',
		link: 'https://reactjs.org',
	},
	{
		name: 'React Router',
		developer: 'React Training',
		logo: 'https://avatars3.githubusercontent.com/u/11823761?s=200&v=4',
		link: 'https://github.com/ReactTraining/react-router',
	},
];

const specialThanks: { name: string, twitter: string }[] = [
	{
		name: 'Coronux',
		twitter: 'coronux'
	},
	{
		name: 'S0n1c',
		twitter: 'S0n1c_Dev'
	}
]


export default function About() {
	const libs = [
		...openSourceLibs,
		...[...window.eclipse.cores.entries()].map(([_, value]) => value.repo),
	].filter(v => !!v)
	return (
		<Page>
			<Navbar back title="About" />
			
			{/* General */}

			<ListTitle title="General" />
			<List>
				<ListItem
					media={<LazyImage src="static/icons/icon.square.png" />}
					title="Eclipse"
					after={<p>v{window.eclipse.version}</p>}
				/>
				<ListItem
					link='https://eclipseemu.me/tos.html'
					external
					title="Terms of Service"
				/>
			</List>

			{/* Developers */}

			<ListTitle title="Developers" />
			<List>
				<ListItem
					link='https://magnetar.dev'
					external
					media={<LazyImage src="https://api.zenithdevs.com/eclipse/twitter/magnetardev" />}
					title="Magnetar"
					subtitle="Lead developer"
				/>
				<ListItem
					link='https://shuga.co'
					external
					media={<LazyImage src="https://api.zenithdevs.com/eclipse/twitter/heyitsshuga" />}
					title="Shuga"
					subtitle="Developer"
				/>
			</List>

			{/* Used Libraries */}

			<ListTitle title="Open-Source Libraries" />
			<List>
				{libs.map(lib => (
					<ListItem
						link={lib.link}
						external
						media={<LazyImage src={lib.logo} />}
						title={lib.name}
						subtitle={lib.developer}
					/>
				))}
			</List>

			{/* Sepcial Thanks */}

			<ListTitle title="Special Thanks" />
			<List>
				{specialThanks.map(person => (
					<ListItem
						link={`https://twitter.com/${person?.twitter}`}
						external
						media={<LazyImage src={`https://api.zenithdevs.com/eclipse/twitter/${person.twitter}`} />}
						title={person.name}
						subtitle={`@${person.twitter}`}
					/>
				))}
			</List>
		</Page>
	);
}