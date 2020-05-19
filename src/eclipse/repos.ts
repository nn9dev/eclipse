export default class Repos {

	private eclipse: any;
	private store: Map<string, any> = new Map();

	constructor(eclipse: any) {
		this.eclipse = eclipse;	
	}

	async list() {
		const urls: string[] = await this.eclipse.storage.getItem('repos') ?? [];
		if (this.store.size !== urls.length) {
			const repos: Map<string, {blocked: boolean; repo: any}> = new Map(
				await Promise.all(
					urls.map(async (url: string): Promise<[string, {blocked: boolean; repo: any}]> => {
						try {
							const res = await fetch(this.eclipse.proxy(url));
							const repo = await res.json();
							return [url, { blocked: false, repo: this.update(repo), }];
						} catch (error) {
							return [url, { blocked: false, repo: null }]
						}
					})
				)
			);
			return repos;
		}
		return this.store;
	}

	async add(url: string) {
		try {
			// Check if URL is accurate
			new URL(url);

			// Get Repo
			const res = await fetch(url);
			const json = await res.json();

			// Validate
			// TODO: Make this more accurate lmao
			const isRepo = json?.info?.name || json.reponame;
			if (isRepo) {
				const urls: string[] = await this.eclipse.storage.getItem('repos') ?? [];
				this.eclipse.storage.setItem('repos', [...(new Set([...urls, url]))])
			}
		} catch (error) {
			throw error;
		}
	}

	update(repodata: any) {
		return (repodata.reponame) ?
			({
				info: {
					logo: repodata?.repologo,
					banner: '',
					name: repodata?.reponame,
					maintainer: repodata?.repoauthor,
					description: repodata?.repodesc,
				},
				categories: repodata?.categories.map((category: any) => {
					return {
						name: category?.categoryname,
						games: category?.games
					}
				})
			})
		: repodata;
	}
};