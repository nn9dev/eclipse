import { Dropbox } from 'dropbox';

export default class {
	constructor(clientID) {
		const accessToken = global.localStorage.getItem('dropbox_token');
		const dbx = new Dropbox({
			clientId: clientID,
			fetch: global.fetch,
			accessToken
		});
		this.dbx = dbx;
	}

	auth() {
		const url = this.dbx.getAuthenticationUrl(
			'https://zenithdevs.github.io/eclipse/auth/dropbox/'
		);
		global.window.open(url);
	}

	async loadData() {
		const data = await this.getData();
		global.eclipse.backups.import(data);
	}

	getData() {
		return new Promise((resolve, reject) => {
			const response = this.dbx
				.filesDownload({
					path: '/eclipse.json'
				})
				.then(() => {
					const blob = response.fileBlob;
					const reader = new global.FileReader();
					reader.onload = () => resolve(JSON.parse(reader.result));
					reader.onerror = err => reject(err);
					reader.readAsText(blob);
				})
				.catch(reject);
		});
	}

	async setData() {
		const original = await this.dbx.filesGetMetadata({
			path: '/eclipse.json'
		});
		const contents = await global.eclipse.backups.export();
		contents.created_on = new Date();
		const jsonString = JSON.stringify(contents);
		const file = new Blob([`${jsonString}`]);
		const sizeLimit = 150 * 1024 * 1024;
		const uploadSettings = {
			contents: jsonString,
			path: '/eclipse.json',
			mode: {
				'.tag': 'update',
				update: original.rev
			}
		};
		if (file.size < sizeLimit) {
			// File is smaller than 150 Mb - use filesUpload API
			await this.dbx.filesUpload(uploadSettings);
		} else {
			// Upload via their filesUploadSession API thing
			const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size
			const workItems = [];

			let offset = 0;
			while (offset < file.size) {
				const chunkSize = Math.min(maxBlob, file.size - offset);
				workItems.push(file.slice(offset, offset + chunkSize));
				offset += chunkSize;
			}

			const task = workItems.reduce((acc, blob, idx, items) => {
				if (idx === 0) {
					// Starting multipart upload of file
					return acc.then(() => {
						return this.dbx
							.filesUploadSessionStart({
								close: false,
								contents: blob
							})
							.then(response => response.session_id);
					});
				}
				if (idx < items.length - 1) {
					// Append part to the upload session
					return acc.then(sessionId => {
						const cursor = {
							session_id: sessionId,
							offset: idx * maxBlob
						};
						return this.dbx
							.filesUploadSessionAppendV2({
								cursor,
								close: false,
								contents: blob
							})
							.then(() => sessionId);
					});
				}
				// Last chunk of data, close session
				return acc.then(sessionId => {
					const cursor = {
						session_id: sessionId,
						offset: file.size - blob.size
					};
					const commit = uploadSettings;
					return this.dbx.filesUploadSessionFinish({
						cursor,
						commit,
						contents: blob
					});
				});
			}, Promise.resolve());
			task.then(console.log).catch(console.error);
		}
		return false;
	}
}
