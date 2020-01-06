import React from 'react';
import { Page, Navbar, BlockTitle, Link, List, ListItem, Block, Searchbar, NavRight, NavTitle, NavTitleLarge, SwipeoutActions, SwipeoutButton } from 'framework7-react';

export default class extends React.Component {

	constructor(props) {
		super();
		console.log(props);
		this.state = {
			repos: props.repos,
			featured: props.featured,
		}
	}

	render() {
		return (
			<Page>
				<Navbar sliding={false} large={!this.$theme.md} largeTransparent={!this.$theme.md} backLink="Back">
					<NavTitle sliding>Game Hub</NavTitle>
					<NavRight>
						<Link searchbarEnable=".search-game-hub" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" />
						<Link 
							className="add-game-button" 
							iconIos="f7:plus" 
							iconAurora="f7:plus" 
							iconMd="material:add" 
							onClick={this.addButton.bind(this)}
						/>
					</NavRight>
					{(!this.$theme.md) ? <NavTitleLarge>Game Hub</NavTitleLarge> : null}
					<Searchbar
						className="search-game-hub"
						expandable
						searchContainer=".games-list"
						searchIn=".item-title"
						disableButton={!this.$theme.aurora}
					></Searchbar>
				</Navbar>
				<BlockTitle>Featured</BlockTitle>
				<div className="featured-items-slider">
					{this.state.featured.map(res => (
						<a href="#" key={res.link} onClick={this.addRepo.bind(this, res.link)} className="item" style={{ backgroundImage: `url(${res.icon})` }}>
							<h2>{res.name}</h2>
						</a>
					))}
				</div>
				<BlockTitle>Sources</BlockTitle>
				{(this.state.repos.length > 0) ?
					(<List inset>
							{this.state.repos.map(repo => (
								<ListItem swipeout link={`/game-hub/source/${encodeURIComponent(repo.info.url)}/`} key={repo.info.url} title={repo.info.name} footer={repo.info.maintainer}>
									<img slot="media" src={repo.info.logo} />
									<SwipeoutActions right>
										<SwipeoutButton bgColor="red" onClick={this.removeRepo.bind(this, repo.info.url)}>Delete</SwipeoutButton>
									</SwipeoutActions>
								</ListItem>
							))}
					</List>) :
					<Block inset strong>
						<p className="">You haven't added any sources yet. Check out some of the ones above, or tap + in the top right corner to add one.</p>
					</Block>
				}
			</Page>
		);
	}

	addButton() {
		this.$f7.dialog.prompt('Enter the URL for a source to add:', (val) => this.addRepo);
	}

	async addRepo(val) {
		try {
			this.$f7.preloader.show();
			let url = new URL(val);
			await eclipse.sources.add(url.href);
			await this.relistRepos();
			this.$f7.preloader.hide();
		} catch (error) {
			this.$f7.preloader.hide();
			console.error(error);
			this.$f7.dialog.alert(`The URL you entered was invalid.`);
		}
	}

	removeRepo(url) {
		this.$f7.dialog.confirm('Are you sure you want to delete this repo?', async () => {
			this.$f7.preloader.show();
			await eclipse.sources.remove(url);
			this.relistRepos();
			this.$f7.preloader.hide();
		})
	}

	async relistRepos() {
		let res = await eclipse.sources.fetch();
		this.setState({
			featured: this.state.featured,
			repos: res 
		});
	}
}
