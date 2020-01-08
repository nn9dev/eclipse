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
}