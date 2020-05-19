import React from 'react';
import LazyImage from './lazy-image';
import { Link } from 'react-router-dom';

type GamesProps = {
	query: string;
	games: any[];
	sort: string;
}

export default function Games({ query,  games, sort }: GamesProps) {
	const sortMethod: { 
		[K: string]: (a: any, b: any) => boolean
	} = {
		name: (a: any, b: any) => a.name > b.name,
		date: (a: any, b: any) => a.lastPlayed > b.lastPlayed,
		system: (a: any, b: any) => a.system > b.system,
	};
	const cleanWords = (str: string) => new Set(window.eclipse.utils.clearDiacritics(str).trim().toLowerCase().split(' ').filter(Boolean))
	const searchQuery = cleanWords(query);
	return (
		<section className="games">
			{
				games
					.filter(
						(query === '' || query === null) ? () => true : 
						(item) => [...searchQuery].filter(word => cleanWords(item.query).has(word)).length > 0
					)
					// @ts-ignore
					.sort(sortMethod[sort])
					.map(
						(game: any) => (
							<Link to={`/game/${game.id}`} key={game.id} className="game">
								<LazyImage src={game.boxart} backgroundImage className="boxart" />
								<p className="title">{game.name}</p>
								<p className="system">{game.system}</p>
							</Link>
						)
					)
			}
		</section>
	);
}