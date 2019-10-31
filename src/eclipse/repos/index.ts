interface EclipseReposFetchedResult {
	error?: Error;
	url?: string;
	source?: any;
}

export default class EclipseReposManager {

	public key: string;
	public storage: LocalForage;
	public defaults: string[];

	constructor(key: string, storage: LocalForage, defaults: string[]) {
		this.key = key;
		this.storage = storage;
		this.defaults = (defaults) ? defaults : [];
	}

	public async init() {
		const sources = await this.storage.getItem(this.key);
		if (sources == null) {
			await this.storage.setItem(this.key, '[]');
		}
	}

	public async add(url: URL) {
		const skins: string[]|EclipseReposFetchedResult[] = await this.list();
		skins.push(url.href);
		this.storage.setItem(this.key, JSON.stringify(skins));
		return url;
	}

	public async remove(item: URL|number) {
		const skins: string[]|EclipseReposFetchedResult[] = await this.list();
		const index = (typeof item === 'number') ? item : skins.indexOf(item.href);
		skins.splice(index, 1);
		this.storage.setItem(this.key, JSON.stringify(skins));
		return item;
	}

	public async reset() {
		this.storage.setItem(this.key, JSON.stringify(this.defaults));
	}

	public async get(url: URL) {
		const response = await fetch(url.href);
		const json = await response.json();
		return json;
	}

	public async list(get: boolean = false) {
		let skins: any[]|any = await this.storage.getItem(this.key);
		if (skins == null) { skins = []; }
		if (get === false) {
			return skins;
		} else {
			return Promise.all(
				skins.map(
					(url: string) => fetch(url)
					.then((res: Response) => res.json())
					.then((skin: any) => ({
						error: null,
						url,
						skin,
					})).catch((err: Error) => ({
						error: err,
						url,
						skin: null,
					})),
				),
			);
		}
	}
}
