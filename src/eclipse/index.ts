// Managers
import EclipseGameManager from './games/manager';
import OpenSkin from './skins/openskin';
import EclipseReposManager from './repos/index';

// OpenSkin Elements
import skinElements from './skins/elements';

// localforage (for easier IndexedDB usage)
import localforage from 'localforage';

// Config localForage
localforage.config({
	name: 'eclipse',
});

// Eclipse Class
export default class Eclipse {
	// constructor() {}

	// Storage Instance
	private readonly storage: LocalForage = localforage;

	// Managers
	private readonly games: EclipseGameManager = new EclipseGameManager();
	private readonly skins: OpenSkin = new OpenSkin('skins', { storage: this.storage, elements: skinElements });
	private readonly controls: any;
	private readonly repos: EclipseReposManager = new EclipseReposManager('repos', this.storage, []);
}
