import { Dropbox } from 'dropbox';
import localforage from 'localforage';

export default class {


	constructor(clientID) {
		let accessToken = localStorage.getItem('dropbox_token');
		var dbx = new Dropbox({ clientId: clientID, fetch, accessToken });
		this.dbx = dbx;
	}

	auth() {
		let url = this.dbx.getAuthenticationUrl('https://zenithdevs.github.io/eclipse/auth/dropbox/');
		window.open(url);
	}

	getData() {
		return new Promise(async(resolve, reject) => {
			let response = await this.dbx.filesDownload({path: '/eclipse.json'});
			var blob = response.fileBlob;
			var reader = new FileReader();
			reader.onload = () => resolve(JSON.parse(reader.result));
			reader.onerror = (err) => reject(err);
			reader.readAsText(blob);
		});
	}

	async setData() {
		let contents = await eclipse.backups.export();
		contents.created_on = new Date();
		await this.dbx.filesUpload({
			contents: JSON.stringify(contents),
			path: '/eclipse.json',
			mode: {
				".tag": "overwrite"
			},
		});
	}
}