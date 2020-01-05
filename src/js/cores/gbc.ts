import GB from './gb.ts';

let core: EclipseSystem = {...GB};

core.id = 'gh.taisel.GameBoy-Online.gbc';

core.name = {
	long: 'Game Boy Color',
	short: 'GBC',
}

core.fileTypes = ['gbc'];

export default core;