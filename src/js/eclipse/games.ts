import { Utils } from 'framework7';
import { binaryStringToBlob } from 'blob-util';

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
			let blob = binaryStringToBlob(file);
			await this.storage.setItem(`${res.id}-GameFile`, blob);
		}
		console.log(res);
		let games = await this.list();
		games.push(res);
		await this.storage.setItem('games', games);
	}

	async update(game: EclipseGame) {
		let games = await this.list();
		let ids = games.map(g => g.id);
		let index = ids.indexOf(game.id);
		games[index] = game;
		await this.storage.setItem('games', games);
	}

	async remove(id: string) {
		let games = await this.list();
		let ids = games.map(game => game.id);
		let index = ids.indexOf(id);
		if (index > -1) {
			let game = games.splice(index, 1);
			if (!!game[0].file) {
				await this.storage.removeItem(game[0].file);
			}
		}
		await this.storage.setItem('games', games);
	}
}