// Import Cores
import nes from './nes.ts';
import snes from './snes.ts';
import gb from './gb.ts';
import gbc from './gbc.ts';
import gba from './gba.ts';
import gg from './gg.ts';
import sms from './sms.ts';
import psx from './psx.ts';

let cores: EclipseSystem[] = [
	nes,
	snes,
	gb,
	gbc,
	gba,
	gg,
	sms,
	psx,
];

export default cores;