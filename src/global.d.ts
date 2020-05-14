declare module '*';

import Eclipse from './eclipse/main';

interface Game {
	id: string;
	name: string;
	boxart: string;
	system: string;
	file?: Blob;
	url?: string;
	cheats?: string[];
	save?: string[];
	saveStates?: string[];
}

declare global {
    interface Window { 
		eclipse: typeof Eclipse; 
	}
}

declare const eclipse: typeof Eclipse;