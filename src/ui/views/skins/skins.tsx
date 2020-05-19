import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import Navbar from '../../components/navbar';
import { ListTitle, List, ListItem } from '../../components/list';
import { FeaturedHeader, FeaturedCard } from '../../components/featured';
import LazyImage from '../../components/lazy-image';

export default function Skins() {
	const [skins, setSkinsState] = useState([]);
	const [editing, setEditingState] = useState(false);
	const [featured, setFeaturedSkins] = useState([]);

	useEffect(() => {
		if (featured.length === 0) {
			fetch('static/json/skins.json').then(async (res) => {
				const json = await res.json();
				const featured = json.map(
					({ name, id, banner }: any) => ({
						id,
						name,
						banner,
					})
				);
				setFeaturedSkins(featured);
			});
		}
		// if (loaded)
	}, [skins, featured]);

	const addSkinPrompt = async() => {
		window.Dialogs.prompt({
			title: 'Add Skin',
			message: 'Enter the URL of the SkinKit skin you want to add:',
			inputType: 'url',
			callback: (string) => {
				try {
					const url = new URL(string);
					window.Dialogs.alert({
						title: 'Add Skin',
						message: url.href,
					})
				} catch (err) {
					window.Dialogs.alert({ 
						title: 'Error',
						message: 'Unable to add skin. Make sure you passed a valid URL/skin.' 
					});
				}
			}
		});
	};

	const deleteSkin = async(evt: any) => {
		let index = parseInt(evt.target.dataset?.index ?? '0');
		console.log(index);
		window.Dialogs.confirm({
			title: 'Delete Skin',
			message: `Are you sure you want to delete "${index}"?`,
			okTitle: 'Delete',
			okType: 'destructive',
			callback() {
				console.log('L');
				skins.splice(index, 1);
				setSkinsState(skins);
			}
		})
	}

	return (
		<Page>
			<Navbar 
				back 
				title="Skins" 
				right={<button onClick={addSkinPrompt}>
					<i className="f7-icons">plus</i>
				</button>}
			/>
			<FeaturedHeader title="Collections">
				{featured.map((item: any) => (
					<FeaturedCard
						key={item.id}
						title={item.name}
						caption="Skin Collection"
						banner={item.banner}
						link={`/skins/${item.id}`} 
					/>
				))}
			</FeaturedHeader>
				<ListTitle 
					title="Your Skins"
					button={
						<button onClick={() => setEditingState(!editing)}>{!editing ? "Edit" : "Done"}</button>
					} 
				/>
			<List>
				<ListItem 
					media={<LazyImage src="static/icons/icon.square.png" />} 
					title="Default"
					subtitle="Designed by Eclipse"
					after={
						!editing ?
						(<button disabled className="styled-btn">Set</button>) :
						(<button disabled className="styled-btn simple danger">
							<i className="f7-icons">trash</i>
						</button>)
					}
				/>
				<ListItem 
					media={<LazyImage src="static/img/skin/igba.png" />} 
					title="iGBA Classic"
					subtitle="Designed by Eclipse"
					after={
						!editing ?
							(<button className="styled-btn">Set</button>) :
							(<button data-index="ok" onClick={deleteSkin} className="styled-btn simple danger">
								<i className="f7-icons">trash</i>
							</button>)
					} 
				/>
			</List>
		</Page>
	);
}