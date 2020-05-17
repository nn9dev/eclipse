//@ts-nocheck
const fs = require('fs');
const { exec } = require("child_process");

module.exports = {
	files: {
		/**
		 * A promisified version of Node's fs.rename function.
		 */
		rename: (path, newPath) => new Promise(
			(resolve, reject) => {
				fs.rename(`${__dirname}/${path}`, `${__dirname}/${newPath}`, (err) => {
					if (err) reject(err);
					resolve();
				});
			}
		),
		/**
		 * A promisified version of Node's fs.readFile function.
		 */
		read: (path) => new Promise(
			(resolve, reject) => {
				fs.readFile(`${__dirname}/${path}`, (err, data) => {
					if (err) reject(err);
					resolve(data);
				});
			}
		),
		/**
		 * A promisified version of Node's fs.writeFile function.
		 */
		write: (path, contents) => new Promise(
			(resolve, reject) => {
				fs.writeFile(`${__dirname}/${path}`, contents, (err) => {
					if (err) reject(err);
					resolve();
				})
			}
		),

		/**
		 * A promisified version of Node's fs.readdir function.
		 */
		list: (path) => new Promise(
			(resolve, reject) => {
				fs.readdir(`${__dirname}/${path}`, (err, files) => {
					if (err) reject(err);
					resolve(files);
				});
			}
		)
	},

	/**
	 * A promisified version of Node's exec function.
	 */
	exec: async (command) => new Promise(
		(resolve, reject) => {
			exec(command, (err, stdout, stderr) => {
				if (err) reject(err);
				resolve(stdout);
			});
		}
	),
}