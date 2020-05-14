//@ts-nocheck
import React from 'react';
import LazyImage from './lazy-image';
import { Link } from 'react-router-dom';

export default function Games(props) {
	const sortMethod = {
		name: (a, b) => a.name > b.name,
		date: (a, b) => a.lastPlayed > b.lastPlayed,
		system: (a, b) => a.system > b.system,
	};
	const searchQuery = new Set(window.eclipse.utils.clearDiacritics(props.query).trim().toLowerCase().split(' ').filter(Boolean));
	return (
		<section className="games">
			{props.games.filter(
				(props.query === '' || props.query === null) ? () => true : 
				(item) => {
					const nameParts = new Set(window.eclipse.utils.clearDiacritics(item.name).trim().toLowerCase().split(' ').filter(Boolean));
					console.log(searchQuery, nameParts);
					return [...searchQuery].filter(word => nameParts.has(word)).length > 0;
				}
			).sort(sortMethod[props.sort]).map(game => (
				<Link to={`/game/${game.id}`} key={game.id} className="game">
					<LazyImage src={game.boxart} backgroundImage className="boxart" />
					<p className="title">{game.name}</p>
					<p className="system">{game.system}</p>
				</Link>
			))}
		</section>
	);
}