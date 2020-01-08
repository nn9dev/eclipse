declare module '*';

declare interface EclipseOptions {
	version?: string;
	systems?: EclipseSystem[];
	defaultSettings?: any;
}

// declare interface EclipseSettings extends Promise<any> {
// 	audio: boolean; 			// Audio?
// 	doAutosave: boolean;		// Autosave?
// 	autosaveRate: number;		// The frequency of autosaves
// 	desktopMode: boolean;		// Hide controls in the game view & enable the menu bar?
// 	fillScreen: boolean; 		// Disregard aspect ratio?
// 	showFPS: boolean; 			// Show FPS?
// }

declare interface EclipseSystem {
	id: string;
	name: {
		short: string;
		long: string;
	};
	fileTypes: string[];
	dependancies?: {
		url: string;
		type: 'wasm'|'js'|'esm';
	}[];
	developer?: {
		name: string;
		icon: string;
		link: string;
	};
	methods?: {
		init?(game: EclipseGame): Promise<void>;
		loadROM?(data: string, game: EclipseGame): Promise<void>;
		loadCheats?(cheats: string[]): Promise<void>;
		play?(game: EclipseGame): Promise<void>;
		pause?(game: EclipseGame): Promise<void>;
		reset?(game: EclipseGame): Promise<void>;
		audio?(enabled: boolean, game: EclipseGame): Promise<void>;
		fastForward?(enabled: boolean, game: EclipseGame): Promise<void>;
		storeSave?(game: EclipseGame): Promise<void>; 
		saveState?(game: EclipseGame): Promise<void>;
		loadState?(game: EclipseGame): Promise<void>;
		prepareForExit?(game: EclipseGame): Promise<void>;
		exit?(): Promise<void>;
	};
}

declare interface EclipseGame {
	id: string;
	name: string;
	boxart: string;
	system: string;
	file?: string;
	url?: string;
	cheats?: string[];
	save?: string[];
	saveStates?: string[];
}