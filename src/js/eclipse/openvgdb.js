// import { SqlJs } from 'sql.js/module';
import 'regenerator-runtime/runtime';

export default class {
	constructor(url = './static/openvgdb.sqlite') {
		this.url = url;
	}

	// Initialize the DB
	async init() {
		const initSQL = await import('sql.js');
		const SQL = await initSQL.default();
		const response = await global.fetch(this.url);
		const buffer = await response.arrayBuffer();
		const uint8 = new Uint8Array(buffer);
		this.db = new SQL.Database(uint8);
		return this.db;
	}

	// Run a SQL query
	async run(query) {
		try {
			const q = `SELECT * FROM RELEASES WHERE ${query};`;
			const res = this.db.exec(q);
			const games = res[0].values.map(game =>
				Object.assign(
					{},
					...res[0].columns.map((col, i) => ({
						[col]: game[i]
					}))
				)
			);
			return games;
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async gameFromFileName(name) {
		// Get file extension & system
		const ext = name.split('.').pop();
		const system = global.eclipse.system({ fileType: ext });

		// Clean file name & split into parts
		const parts = name
			.replace(`.${ext}`, '') // Remove file extension
			.replace(/_/g, ' ') // Convert "_" into spaces
			.replace(/-/g, ' ') // Convert "-" into spaces
			.replace('%20', ' ') // Convert encoded spaces into spaces
			.replace(/\[.*?\]/g, '') // Remove anything in []
			.replace(/\(.*?\)/g, '') // Remove anything in ()
			.toLowerCase()
			.split(' ');

		// Convert into SQL query & run
		const query = `system IS ${parts
			.map(part => `name LIKE '%${part}%' AND system IS '${system.name.short}'`)
			.join('\nOR ')}`;
		const sqlResponses = await global.eclipse.openvgdb.run(query);

		// Reduce More
		const games = sqlResponses.filter(item => {
			const regex = new RegExp(`(?=.*${parts.join(')(?=.*')})`, 'i');
			return regex.test(this.$f7.utils.removeDiacritics(item.name));
		});

		// Return
		if (games.length > 0) {
			return games[0];
		}

		return {
			boxart: '',
			name: name.replace(`.${ext}`, ''),
			system: system.name.short
		};
	}

	getFileContents(file) {
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line no-undef
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsBinaryString(file);
		});
	}

	async gameFromFile(file) {
		const game = await this.gameFromName(file.name);
		const data = await this.getFileContents();
		return {
			file: data,
			game
		};
	}

	async gameFromURL(url) {
		const game = await this.gameFromName(url.name);
		return {
			url,
			game
		};
	}
}
