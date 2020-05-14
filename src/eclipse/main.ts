//@ts-nocheck
import games from './games';
import skins from './skins';
import repos from './repos';
import cores from './cores';
import utils from './utils';
import settings from './settings';

const Eclipse = {
	version: '3.0.0',
	games,
	skins,
	repos,
	cores,
	settings,
	utils,
	
	/**
	 * Proxy the specified URL.
	 * @param {string} url 
	 * @returns {string} proxied URL.
	 */
	proxy(url) {
		const proxiedURL = new URL('https://api.zenithdevs.com/eclipse/download');
		proxiedURL.searchParams.set('dl', encodeURIComponent(url));
		return proxiedURL.href;
	}
}

export default Eclipse;