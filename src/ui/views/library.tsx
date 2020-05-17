import React, { useState } from 'react';
import Page from '../components/page';
import Navbar from '../components/navbar';
import Games from '../components/games';
import { Link } from 'react-router-dom';

export default function Library() {
	const [searchQuery, setSearchQuery] = useState('');
	const [games] = useState([]);

	return (
		<Page>
			<Navbar 
				left={<Link to="/settings"><i className="f7-icons">gear</i></Link>} 
				title="Library" 
				right={<button onClick={() => window.eclipse.games.upload()}><i className="f7-icons">plus</i></button>}
				search={(evt: InputEvent) => {
					setSearchQuery((evt?.target as HTMLInputElement).value);
				}}
			/>

			{/* Games List */}

			{games.length > 0 ? 
				(
					<Games
						query={searchQuery}
						sort="name"
						games={games}
					/>
				) : 
				(
					<div className="full-message">
						<h1>Empty Library</h1>
						<p>You can add games by pressing the + button in the top right.</p>
					</div>
				)
			}
		</Page>
	);
}