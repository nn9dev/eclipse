import EclipseGameManager from './games/manager';
import OpenSkin from './skins/openskin';
import skinElements from './skins/elements';

export default class Eclipse {
	// constructor() {}

	private readonly games: EclipseGameManager = new EclipseGameManager(this.storage);
	private readonly skins: OpenSkin = new OpenSkin('skins', { storage: this.storage, elements: skinElements });
	private readonly storage: any;
	private readonly controls: any;
	private readonly sources: any;
}
