import React, { useState, useEffect } from 'react';
import Page from '../../components/page';
import Navbar from '../../components/navbar';
import { ListTitle, List, ListItem } from '../../components/list';
import { FeaturedHeader, FeaturedCard } from '../../components/featured';
import LazyImage from '../../components/lazy-image';

export default function Repos() {
	const [repos, setReposState] = useState(new Map());
	const [editing, setEditingState] = useState(false);
	const [featured, setFeaturedRepos] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		if (featured.length === 0) {
			const { signal } = controller;
			fetch('static/json/repos/featured.json', { signal }).then(async (res) => {
				const json = await res.json();
				const featured = json.map(
					({ name, link, icon }: any) => ({
						link,
						name,
						icon,
					})
				);
				setFeaturedRepos(featured);
			}).catch();
			window.eclipse.repos.list().then(setReposState);
		}
		return () => {
			console.log('unmount')
			controller.abort();
		}
	}, [repos, featured]);

	const addRepoPrompt = async() => {
		window.Dialogs.prompt({
			title: 'Add Repo',
			message: 'Enter the URL of the repo you want to add:',
			inputType: 'url',
			callback: async (string) => {
				try {
					new URL(string);
					await window.eclipse.repos.add(string);
					const repos = await window.eclipse.repos.list();
					setReposState(repos);
				} catch (err) {
					window.Dialogs.alert({ 
						title: 'Error',
						message: 'Unable to add repo. Make sure you passed a valid URL/repo.' 
					});
				}
			}
		});
	};

	const deleteRepo = async(evt: any) => {
		let url = evt.target.dataset?.url ?? null;
		console.log(url);
		window.Dialogs.confirm({
			title: 'Delete Repo',
			message: `Are you sure you want to delete the repo from "${url}"?`,
			okTitle: 'Delete',
			okType: 'destructive',
			callback() {
				console.log('L');
				repos.delete(url);
				setReposState(repos);
			}
		})
	}

	return (
		<Page>
			<Navbar 
				back 
				title="Repos" 
				right={<button onClick={addRepoPrompt}>
					<i className="f7-icons">plus</i>
				</button>}
			/>
			<FeaturedHeader title="Featured">
				{featured.map((item: any) => (
					<FeaturedCard
						key={window.eclipse.utils.uuid()}
						title={item.name}
						caption="Featured Repo"
						banner={item.icon}
						data-url={item.link}
						onClick={async (props) => {
							const url = props['data-url'];
							console.log(url);
							if (url) {
								await window.eclipse.repos.add(url);
								const repos = await window.eclipse.repos.list();
								setReposState(repos);
							}
						}} 
					/>
				))}
			</FeaturedHeader>
				<ListTitle 
					title="Your Repos"
					button={
						<button onClick={() => setEditingState(!editing)}>{!editing ? "Edit" : "Done"}</button>
					} 
				/>
				{[...repos.entries()].length > 0 ? (
					<List>
						{[...repos.entries()].map(([url, data]) => (
							<ListItem
								key={url}
								media={<LazyImage src={!data.repo.blocked ? data.repo.info.logo : 'static/icon/default.cover.png'} />} 
								title={!data.repo.blocked ? data.repo.info.name : 'Blocked Repo'}
								subtitle={(new URL(url)).hostname}
								link={!data.repo.blocked && !editing ? `/repos/${encodeURIComponent(url)}` : undefined}
								after={
									editing ?
										(
											<button data-url={url} onClick={deleteRepo} className="styled-btn simple danger">
												<i data-url={url} className="f7-icons">trash</i>
											</button>
										) : null
								}
							/>
						))}
					</List>
				) : (
					<div className="empty-list">
						<h3>No Repos</h3>
						<p>You haven't added any repos. Check out one of the feature repos or add one with the + button in the top right.</p>
					</div>
				)}
		</Page>
	);
}