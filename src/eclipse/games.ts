import initSQL from 'sql.js';
import { SqlJs } from 'sql.js/module';

export default class Games {

	private db?: SqlJs.Database;
	private readonly regions = new Map([
		['Europe', ['en-AU', 'en-BZ', 'en-CA', 'en-CB', 'en-GB', 'en-IE', 'en-JM', 'en-NZ', 'en-PH', 'en-TT', 'en-ZA', 'en-ZW']],
		['Japan', ['ja', 'ja-JP']],
	]);

	// constructor() {}

	get preferredRegion(): string {
		// We base it off of languge.
		const language = navigator.language;

		// Iterate over regions map
		for (let [region, langs] of this.regions) {
			if (langs.includes(language)) {
				return region;
			}
		}
		
		// We fallback to USA.
		return 'USA';
	}

	async upload() {
		// Get files
		const files: File[] = await new Promise((resolve, reject) => {
			const el = document.createElement('input');
			el.type = 'file';
			el.onchange = (evt: Event) => resolve([...(evt.target as HTMLInputElement).files]);
			el.onerror = (err) => reject(err);
			el.click();
		});

		// Get games from files
		const games = await Promise.all(
			files.map(	
				async (file: File) => {
					const blob = await this.fileblob(file);
					return await this.fromDB(blob);
				}
			)
		)
		console.log(games);
	}

	private fileblob(file: File): Promise<Blob> {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = async () => {
				const res = new Response(reader.result);
				const blob = await res.blob();
				resolve(blob);
			};
			reader.readAsArrayBuffer(file);
		});
	}

	private async sha1(file: Blob): Promise<string> {
		// Convert blob to arrayBuffer
		const fileRes = new Response(file);
		const buffer = await fileRes.arrayBuffer();
		
		// Get & return SHA-1 hash as string
		const hash = await window.crypto.subtle.digest('SHA-1', buffer);
		return Array.from(new Uint8Array(hash)).map(
			b => b.toString(16).padStart(2, '0')
		).join('');
	}

	async fromDB(file: Blob) {
		// Load DB, if it doesn't already exist.
		if (!this.db) {
			const SQL = await initSQL();
			const res = await fetch('./GamesDB.sqlite');
			const data = new Uint8Array(await res.arrayBuffer());
			this.db = new SQL.Database(data);
		}

		// Get SHA-1 Hash as String
		const sha1 = await this.sha1(file);

		// Get the game(s) info
		const res = this.db.exec(`SELECT name, boxart, system, region FROM Games WHERE sha1="${sha1.toUpperCase()}"`);
		const { columns, values } = res[0] ?? { columns: [], values: [] };

		// Convert from { columns: [...], values: [...] } to an object
		// with the columns as keys and values as, well, values.
		const games = values.map(
			(arr: any[]) => Object.fromEntries(
				arr.map((value, i) => [columns[i], value])
			)
		);
		return games.filter((game: any) => game.region === this.preferredRegion)[0] ?? games[0];
	}
};