import { Core } from '../core';

export default class GBACore extends Core {
	public id = 'github.simon-paris.gba.ninja';
	public fileTypes = ['gba'];
	public name = {
		short: 'GBA',
		long: 'Game Boy Advance'
	};
	public aspectRatio = 1.5;
	public repo = {
		name: 'gba.ninja',
		developer: 'Simon Paris',
		logo: 'https://avatars3.githubusercontent.com/u/4035267?s=460&v=4',
		link: 'https://github.com/simon-paris/gba.ninja'
	};
	public dependancies = [
		'../../static/js/cores/gba/gbaninja.js', 
	];
};