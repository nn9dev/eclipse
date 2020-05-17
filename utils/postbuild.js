//@ts-nocheck
/*
	This program is used to move & rename the build folder.
*/

const { files, exec } = require('./helpers');
const dir = process.argv.includes('--beta') ? 'beta' : 'play';

(async () => {
	try {
		// Remove absolute links from output
		const index = (await files.read('../build/index.html')).toString();
		const fixedIndex = index.split('src="/').join('src="').split('href="/').join('href="');
		await files.write('../build/index.html', fixedIndex);
		console.log(`Fixed absolute paths in \x1b[36mbuild/index.html\x1b[0m.`);
		
		// Fix absolute URLs in CSS files
		await Promise.all(
			(await files.list('../build/static/css')).map(
				async (path) => {
					const contents = (await files.read(`../build/static/css/${path}`)).toString();
					const fixed = contents.split('url(/static').join('url(../');
					await files.write(`../build/static/css/${path}`, fixed);
					console.log(`Fixed absolute paths in \x1b[36mbuild/static/css/${path}.html\x1b[0m.`);
				}
			)
		);

		// Move build to docs/dir
		await files.rename('../build', `../${dir}`);
		await exec(`rm -rf docs/${dir} && mv -f ${dir} docs`);
		console.log(`Successfully renamed & moved the directory to \x1b[36mdocs/${dir}\x1b[0m.`);
	} catch (error) {
		console.error('An error occured while trying to run postbuild:', error);
	}
})();