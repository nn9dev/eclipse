import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import Navbar from '../../components/navbar';
import LazyImage from '../../components/lazy-image';
import { List, ListItem, ListTitle } from '../../components/list';

export default function Repo(props: any) {
	const url = props.match.params.url;
	const [data, setData]: [any, any] = useState(null);
	useEffect(() => {
		if (!data) {
			window.eclipse.repos.list().then(
				repos => setData(repos.get(decodeURIComponent(url)))
			)
		}
		console.log(data);
	}, [data, url]);

	return (
		<Page>
			<Navbar back title={data?.repo?.info?.name ?? ""} />
			{data?.repo ? (
				<div>
					{data.repo.info.banner ? <LazyImage 
						src={data.repo.info.banner}
						backgroundImage
						className="header-banner" 
					/> : null}
					<ListTitle title="Description" />
					<p>{data.repo.info.description}</p>

					{data.repo.categories.map(
						(category: any) => (
							<>
								<ListTitle title={category.name} />
								<List>
									{category.games.map((game: any) => (
										<ListItem
											key={game.link}
											media={<LazyImage backgroundImage className="game-boxart" src={game.boxart} />}
											title={game.name}
											subtitle={game.system}
											after={
												<button className="styled-btn">Add</button>
											}
										/>
									))}
								</List>
							</>
						)
					)}
				</div>
			) : (<></>)}
		</Page>
	);
}