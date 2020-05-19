import Eclipse from './eclipse/main';
import Dialogs from './ui/components/dialogs/index';

declare module '*';

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
		Dialogs: typeof Dialogs; 
	}
}

declare const eclipse: typeof Eclipse;