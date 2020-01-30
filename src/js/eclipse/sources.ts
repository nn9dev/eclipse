export default class {

	private storage: any;

	constructor({ storage }: any) {
		this.storage = storage;
	}

	async add(url: string) {
		let res = await this.list();
		res.push(url);
		res = [...new Set(res)];
		await this.storage.setItem('repos', res);
	}

	async list() {
		let repos = await this.storage.getItem('repos') ?? [];
		return repos;
	}

	async remove(url: string) {
		let res = await this.list();
		let index = res.indexOf(url);
		if (index > -1) {
			res.splice(index, 1);
		}
		await this.storage.setItem('repos', res);
	}

	async fetch() {
		let repos = await this.list();
		let res = await Promise.all(repos.map(async (url: string) => {
			let res = await fetch(url);
			let json = await res.json();
			if (!json.info) {
				json = this.migrate(json);
			}
			json.info.url = url;
			return json
		}))
		return res;
	}

	migrate(old: any) {
		let repo = {
			info: {
				name: old.reponame,
				logo: old.repologo,
				description: old.repodesc,
				maintainer: old.repoauthor,
			},
			categories: old.categories.map((category: any) => ({
				name: category.categoryname,
				games: category.games.map((game: any) => game),
			})),
		};
		return repo;
	}
}