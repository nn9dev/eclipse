/* eslint-disable */
//@ts-nocheck
/*
	Generate GamesDB
	This script takes OpenVGDB, formats it in a much cleaner way, and purges unused data.
*/
const fs = require('fs');
const initSqlJs = require('sql.js');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');

const OPENVGDB_URL = 'https://github.com/OpenVGDB/OpenVGDB/releases/latest/download/openvgdb.zip';
const OUT_PATH = __dirname + '/../public/GamesDB.sqlite';
const ECLIPSE_SYSTEMS = [
	'GBA',
	'GB',
	'GBC',
	'NES',
	'SNES',
	'PSX',
	'SMS',
	'GG'
];

/**
 * Gets the OpenVGDB database
 * @returns {SQL.Database} The database
 */
async function getOpenVGDB(SQL) {
	const res = await fetch(OPENVGDB_URL);
	const buff = Buffer.from(await res.arrayBuffer());

	const zip = new AdmZip(buff);
	const items = zip.getEntries();

	if (items.length === 0) {
		throw 'unable to get OpenVGDB file.';
	}

	const openvgdb = items[0];
	const data = openvgdb.getData();
	let ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
	return new SQL.Database(new Uint8Array(ab));
}

(async () => {
	try {
		const SQL = await initSqlJs();
		
		// Fetch DB
		const OpenVGDB = await getOpenVGDB(SQL);	

		// Make a table with columns
		// { releaseTitleName, releaseCoverFront, TEMPsystemShortName, TEMPregionLocalizedName, romHashSHA1 }
		const query = `create table Games as select RELEASES.releaseTitleName, RELEASES.TEMPsystemShortName, RELEASES.releaseCoverFront, RELEASES.TEMPregionLocalizedName, ROMs.romHashSHA1 from RELEASES LEFT JOIN ROMs ON RELEASES.romID = ROMs.romID WHERE ${ECLIPSE_SYSTEMS.map(sys => `RELEASES.TEMPsystemShortName="${sys}"`).join(' OR ')}; 
		${['RELEASES', 'ROMs', 'REGIONS', 'SYSTEMS'].map(table => `DROP TABLE IF EXISTS ${table};`).join(' ')}
		${[
			['releaseTitleName', 'name'],
			['TEMPsystemShortName', 'system'],
			['releaseCoverFront', 'boxart'],
			['TEMPregionLocalizedName', 'region'],
			['romHashSHA1', 'sha1']
		].map(([col, newCol]) => `ALTER TABLE Games RENAME COLUMN ${col} to ${newCol};`).join(' ')}
		vacuum;`;
		OpenVGDB.run(query);

		// Get data as Uint8Array
		const output = OpenVGDB.export();

		// Write output to OUT_PATH
		fs.writeFile(OUT_PATH, output, (err) => {
			if (err) console.error('An error occurred while generating GamesDB:', err);
			console.log(`${OUT_PATH.split('/').pop()} successulfy created. 🎉`);
		});
	} catch (error) {
		console.error('An error occurred while generating GamesDB:', error);
	}
})();