import {
	Dropbox
} from 'dropbox';
import localforage from 'localforage';

export default class {


	constructor(clientID) {
		let accessToken = localStorage.getItem('dropbox_token');
		var dbx = new Dropbox({
			clientId: clientID,
			fetch,
			accessToken
		});
		this.dbx = dbx;
	}

	auth() {
		let url = this.dbx.getAuthenticationUrl('https://zenithdevs.github.io/eclipse/auth/dropbox/');
		window.open(url);
	}

	async loadData() {
		let data = await this.getData();
		eclipse.backups.import(data)
	}

	getData() {
		return new Promise(async (resolve, reject) => {
			let response = await this.dbx.filesDownload({
				path: '/eclipse.json'
			});
			var blob = response.fileBlob;
			var reader = new FileReader();
			reader.onload = () => resolve(JSON.parse(reader.result));
			reader.onerror = (err) => reject(err);
			reader.readAsText(blob);
		});
	}

	async setData() {
		let original = await this.dbx.filesGetMetadata({
			path: '/eclipse.json'
		});
		let contents = await eclipse.backups.export();
		contents.created_on = new Date();
		let jsonString = JSON.stringify(contents);
		let file = new Blob([`${jsonString}`]);
		let sizeLimit = 150 * 1024 * 1024;
		let uploadSettings = {
			contents: jsonString,
			path: '/eclipse.json',
			mode: {
				'.tag': 'update',
				update: original.rev
			},
		}
		if (file.size < sizeLimit) {

			// File is smaller than 150 Mb - use filesUpload API
			await this.dbx.filesUpload(uploadSettings);
		} else {

			// Upload via their filesUploadSession API thing
			const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size
			var workItems = [];

			var offset = 0;
			while (offset < file.size) {
				var chunkSize = Math.min(maxBlob, file.size - offset);
				workItems.push(file.slice(offset, offset + chunkSize));
				offset += chunkSize;
			}

			const task = workItems.reduce((acc, blob, idx, items) => {
				if (idx == 0) {
					// Starting multipart upload of file
					return acc.then(function () {
						return dbx.filesUploadSessionStart({
								close: false,
								contents: blob
							})
							.then(response => response.session_id)
					});
				} else if (idx < items.length - 1) {
					// Append part to the upload session
					return acc.then(function (sessionId) {
						var cursor = {
							session_id: sessionId,
							offset: idx * maxBlob
						};
						return dbx.filesUploadSessionAppendV2({
							cursor: cursor,
							close: false,
							contents: blob
						}).then(() => sessionId);
					});
				} else {
					// Last chunk of data, close session
					return acc.then(function (sessionId) {
						var cursor = {
							session_id: sessionId,
							offset: file.size - blob.size
						};
						var commit = uploadSettings;
						return dbx.filesUploadSessionFinish({
							cursor,
							commit,
							contents: blob
						});
					});
				}
			}, Promise.resolve());

			task.then(function (result) {
				var results = document.getElementById('results');
				results.appendChild(document.createTextNode('File uploaded!'));
			}).catch(function (error) {
				console.error(error);
			});
		}
		return false;
	}
}