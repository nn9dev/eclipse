// import { SqlJs } from 'sql.js/module';
import 'regenerator-runtime/runtime';

export default class {

	constructor(url = './static/openvgdb.sqlite') {
		this.url = url;
	}

	async init() {
		let initSQL = await import('sql.js');
		const SQL = await initSQL.default();
		const response = await fetch(this.url);
		let buffer = await response.arrayBuffer();
		let uint8 = new Uint8Array(buffer);
		return new SQL.Database(uint8);
	}

	async run({db, query}) {
		try {		
			let blah = `SELECT * FROM RELEASES WHERE ${query};`;
			console.log(blah);
			let res = db.exec(blah);
			// let res = db.exec(`SELECT * FROM RELEASES`);
			console.log(blah, res);
			const games = res[0].values.map(
				(game) => 
					Object.assign({}, ...res[0].columns.map(
						(col, i) => ({
							[col]: game[i],
						})
					)
				)
			);
			return games;
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}