import SMS from './sms.ts';

let core: EclipseSystem = {...SMS};

core.id = 'gh.gmarty.jsSMS.gg';

core.name = {
	long: 'Sega Game Gear',
	short: 'GG',
}

core.fileTypes = ['gg'];

export default core;