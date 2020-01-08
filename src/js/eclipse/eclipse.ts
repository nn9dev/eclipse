import localforage from 'localforage';
import OpenVGDB from './openvgdb.js';
import EclipseGamesManager from './games.ts';
import EclipseSourcesManager from './sources.ts';
import EclipseCloud from './cloud/cloud.ts';
import EclipseBackups from './backups.js';
export default class {

	// Properties
	public version: string;
	public systems: EclipseSystem[];
	public defaultSettings: any;

	// Storage Handler
	public storage: any;

	// Managers
	public games: any; // Manages games
	public skins: any; // Manages skins
	public sources: any; // Manages sources
	public controls: any; // Manages controls
	public cloud: any = EclipseCloud;
	public backups: any = EclipseBackups
	public migrator: any; // Manages migration from older versions
	public openvgdb: any = new OpenVGDB();

	constructor({
		version,
		systems,
		defaultSettings
	}: EclipseOptions = {}) {
		this.version = version ?? '1.0.0';
		this.systems = systems ?? [];
		this.defaultSettings = defaultSettings ?? {
			libraryListView: false,
			sortLibraryBy: 'name',
			audio: true,
			autosaveRate: '60000',
			desktopMode: false,
			fillScreen: false,
			showFPS: false,
			controllerOpacity: 60,
		};

		// Setup Storage
		localforage.config({
			name: 'Eclipse',
		});
		this.storage = localforage;
		this.games = new EclipseGamesManager({
			storage: this.storage
		});
		this.sources = new EclipseSourcesManager({
			storage: this.storage
		});

		// Run setup, and if necessary update old backup.
		localforage.ready().then(() => {
			this.setup().then(async ({
				needsUpdating,
				originalVersion
			}: any) => {
				if (needsUpdating) {
					// await this.migrator.from(originalVersion);
					console.log('');
				}
				console.log('Setup Eclipse');
			});
		});
	}

	// Setup function, returns false if it doesn't need updating.
	async setup() {
		let ogSetup = localStorage.getItem('setup');
		let setup = await this.storage.getItem('setup');
		if (!ogSetup && !setup) {
			console.log('howdy')
			this.setSettings(this.defaultSettings);
			await this.storage.setItem('setup', this.version);
		} else if (!!ogSetup && setup != this.version) {
			return {
				needsUpdating: true,
				originalVersion: setup,
			};
		}
		return {};
	}

	// Get System for ID
	system({
		id,
		short,
		long,
		fileType
	}: any) {
		return this.systems.filter(system => (system.id == id || system.name.short == short || system.name.long == long || system.fileTypes.indexOf(fileType) > -1))[0];
	}

	// Get Settings
	async settings() {
		let settings = await this.storage.getItem('settings') ?? this.defaultSettings;
		return settings;
	}

	// Set Settings
	async setSettings(settings: any) {
		let old = await this.settings();
		Object.keys(settings).forEach(key => {
			old[key] = settings[key];
		});
		this.storage.setItem('settings', old);
	}
}