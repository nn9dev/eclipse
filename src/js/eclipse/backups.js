export default class {
	static async export() {
		const json = {};
		await global.eclipse.storage.iterate((value, key) => {
			if (key.indexOf('-GameFile') <= -1) {
				json[key] = value;
			}
		});
		return json;
	}

	static async import(json) {
		Object.keys(json).forEach(async key => {
			await global.eclipse.storage.setItem(key, json[key]);
		});
	}
}
