import React, { useState } from 'react';
import Page from '../components/page';
import Navbar from '../components/navbar';
import Games from '../components/games';
import { Link, withRouter } from 'react-router-dom';

function Library(props: any) {
	const [searchQuery, setSearchQuery] = useState('');
	const [games] = useState([]);
	return (
		<Page>
			<Navbar 
				left={<Link to="/settings"><i className="f7-icons">gear</i></Link>} 
				title="Library" 
				right={<button onClick={() => window.Dialogs.actionSheet({ 
					title: 'Add Game', 
					message: 'Work in Progress!',
					items: [
						{ 
							title: 'Repos',
							onClick: () => {
								props.history.push('/repos');
							}
						},
						{
							title: 'Files',
							onClick: async () => {
								await window.eclipse.games.upload();
							}
						}
					]
				})}><i className="f7-icons">plus</i></button>}
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

export default withRouter(Library);