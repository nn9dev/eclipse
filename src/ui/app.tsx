import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import About from './views/about';
import Game from './views/game';
import Library from './views/library';
import Repos from './views/repos';
import Settings from './views/settings';
import Skins from './views/skins';

export default function App() {
	return (
		<Router>
			<div className="app">
				<div className="statusbar" />
				<Route exact path="/" component={Library} />
				<Route exact path="/about" component={About} />
				<Route exact path="/repos" component={Repos} />
				<Route exact path="/skins" component={Skins} />
				<Route exact path="/game/:id" component={Game} />
				<Route exact path="/settings" component={Settings} />
			</div>
		</Router>
	);
}