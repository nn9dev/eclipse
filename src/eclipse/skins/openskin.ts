/*
	OpenSkin
	Version 3.0
	--------------
	Developed by the Zenith Dev Team <zenithdevs.com>
	Liscenced under MIT
*/

import localforage from 'localforage';

/**
 * @interface OpenSkinOptions
 * @property {LocalForage|Storage} storage - Where the skins are stored.
 * @property {any} elements - The list of elements and their respective query selectors.
 * @property {boolean} init - Init when the constructor function is ran.
 */
interface OpenSkinOptions {
	storage?: LocalForage|Storage;
	elements?: any;
	init?: boolean;
}

interface OpenSkinFetchedSkin {
	error?: Error;
	url?: string;
	skin?: any;
}

export default class OpenSkin {

	public key: string;
	public storage: LocalForage | Storage;
	public elements: any;

	constructor(key: string, { storage, elements, init }: OpenSkinOptions = {}) {
		this.key = key;
		this.storage = (storage) ? storage : localStorage;
		this.elements = (elements) ? elements : {};
		if (init === true) {
			this.init();
		}
	}

	public async init() {
		const skins = await this.storage.getItem(this.key);
		if (skins == null) {
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

	public async set({ json, text, url }: { json?: any, text?: string, url?: URL } = {}) {
		let skin: any = {};
		if (json) {
			skin = json;
		}
		if (text) {
			skin = JSON.parse(text);
		}
		if (url) {
			const response = await fetch(skin);
			skin = await response.json();
		}
	}
}
