export default class {
	static async export() {
		let json = {};
		await eclipse.storage.iterate((value, key) => {
			// Resulting key/value pair -- this callback
			// will be executed for every item in the
			// database.
			// console.log(key, value);
			if (key.indexOf('-GameFile') > -1) {} else {
				json[key] = value;
			}
		});
		return json;
	}

	static async import(json) {
		let keys = Object.keys(json);
		for (var i in keys) {
			await eclipse.storage.setItem(keys[i], json[keys[i]]);
		}
	}
}