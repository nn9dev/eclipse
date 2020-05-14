/*
	This program is used to move & rename the build folder.
*/

const fs = require('fs');
const { exec } = require("child_process");

const dir = process.argv.includes('--beta') ? 'beta' : 'play';

fs.rename(`${__dirname}/../build`, `${__dirname}/../${dir}`, (err) => {
	if (err) throw err;
	exec(`rm -rf docs/${dir}`, () => {
		exec(`mv -f ${dir} docs`, () => {
			console.log(`Successfully renamed & moved the directory to \x1b[36mdocs/${dir}\x1b[0m.`);
		});
	});
});