import Games from './games';
import Skins from './skins';
import Repos from './repos';
import Cores from './cores';
import Utils from './utils';
import Settings from './settings';
import localForage from 'localforage';

class Eclipse {
	public version = '3.0.0';
	public games = new Games(this);
	public skins = Skins;
	public repos = new Repos(this);
	public cores = Cores;
	public settings = Settings;
	public utils = Utils;
	public storage = localForage
	
	/**
	 * Proxy the specified URL.
	 * @param {string} url 
	 * @returns {string} proxied URL.
	 */
	proxy(url: string) {
		const proxiedURL = new URL('https://api.zenithdevs.com/eclipse/download');
		proxiedURL.searchParams.set('dl', encodeURIComponent(url));
		return proxiedURL.href;
	}
}

export default new Eclipse();