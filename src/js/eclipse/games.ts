import { Utils } from 'framework7';

export default class {

	private storage: any;

	constructor({ storage }: any) {
		this.storage = storage;
	}

	async list(): Promise<EclipseGame[]> {
		let games = await this.storage.getItem('games') ?? [];
		return games;
	}

	async get({ id, system }: any): Promise<EclipseGame[]> {
		let list = await this.list();
		return list.filter(item => (item.id == id || item.system == system));
	}

	async add(game: EclipseGame) {
		let { boxart, file, url, name, system } = game;
		let res: any = {
			id: Utils.id('xxxxxxxx', '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
			name,
			boxart: (!!boxart) ? boxart.replace('img.gamefaqs.net', 'gamefaqs1.cbsistatic.com').replace('http://', 'https://') : boxart,
			system,
			url,
		}
		if (!!file) {
			res.file = `${res.id}-GameFile`;
			await this.storage.setItem(`${res.id}-GameFile`, file);
		}
		console.log(res);
		let games = await this.list();
		games.push(res);
		await this.storage.setItem('games', games);
	}
}