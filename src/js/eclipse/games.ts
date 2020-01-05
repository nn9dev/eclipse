export default class {

	private storage: any;

	constructor({ storage }: any) {
		this.storage = storage;
	}

	async init() {
		let games = await this.storage.getItem('games');
		if (!games) {
			await this.storage.setItem('games', []);
		}
	}

	async list(): Promise<EclipseGame[]> {
		let games = await this.storage.getItem('games');
		return games;
	}

	async get({ id, system }: any): Promise<EclipseGame[]> {
		let list = await this.list();
		return list.filter(item => (item.id == id || item.system == system));
	}

	async add(game: EclipseGame) {
		let games = await this.list();
		games.push(game);
		await this.storage.setItem('games', games);
	}
}