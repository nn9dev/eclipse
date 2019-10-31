interface EclipseSourcesFetchedResult {
	
}

export default class EclipseSourcesManager {

	public key: string;
	public storage: LocalForage;

	constructor(key: string, storage: LocalForage) {
		this.key = key;
		this.storage = storage;
	}

	public async init() {
		const sources = await this.storage.getItem(this.key);
		if (sources == null) {
			await this.storage.setItem(this.key, '[]');
		}
	}

	public async add(url: URL) {
		const skins: string[]|OpenSkinFetchedSkin[] = await this.list();
		skins.push(url.href);
		this.storage.setItem(this.key, JSON.stringify(skins));
		return url;
	}

	public async remove(item: URL|number) {
		const skins: string[]|OpenSkinFetchedSkin[] = await this.list();
		const index = (typeof item === 'number') ? item : skins.indexOf(item.href);
		skins.splice(index, 1);
		this.storage.setItem(this.key, JSON.stringify(skins));
		return item;
	}

	public async reset() {
		this.storage.setItem(this.key, JSON.stringify(this.defaults));
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
