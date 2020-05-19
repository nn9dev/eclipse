import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import Navbar from '../../components/navbar';
import LazyImage from '../../components/lazy-image';
import { List, ListItem, ListTitle } from '../../components/list';


export default function SkinsCollection(props: any) {
	const id = props.match.params.id;
	const [collection, setCollection]: [any, any] = useState(null);

	useEffect(() => {
		if (!collection) {
			fetch('static/json/skins.json').then(async (res) => {
				const collections = await res.json();
				const collection = collections.filter((res: any) => res.id === id)[0];
				console.log(collection);
				setCollection(collection);
			})
		}
	}, [collection, id]);

	return (
		<Page>
			<Navbar back title={collection?.name ?? ""} />
			{collection ? (
				<div>
					<LazyImage 
						src={collection.banner}
						backgroundImage
						className="header-banner" 
					/>
					<ListTitle title="Description" />
					<p>{collection.description}</p>

					<ListTitle title="Skins" />
					<List>
						{collection.skins.map((skin: any) => (
							<ListItem
								key={skin.link}
								media={<LazyImage src={skin.icon} />}
								title={skin.name}
								after={
									<button className="styled-btn">Add</button>
								}
							/>
						))}
					</List>
				</div>
			) : (<></>)}
		</Page>
	);
}