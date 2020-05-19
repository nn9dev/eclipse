import diacriticsMap from './other/diacritics-map';

export default {
	/**
	 * Generates a unique string by replacing 'x's in the template string with a random character in the charset.
	 * @param template A string with 'x' where a random character should appear
	 * @param charset A string of characters
	 */
	uuid(template: string = 'xxxxxxxxxx', charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'): string {
		const characters = [...(new Set(charset.trim().split('')))];
		return template.trim().split('').map(v => (v !== 'x') ? v : characters[Math.floor(Math.random() * characters.length)]).join('');
	},

	/**
	 * Remove diacritics from a string by turning it into its non-accented version (i.e. é -> e)
	 * @param string A string with diacritics
	 */
	clearDiacritics(string: string): string {
		// eslint-disable-next-line 
		return string.replace(/[^\u0000-\u007E]/g, a => diacriticsMap.get(a) || a);
	},
	
	/**
	 * Create an array of unique items
	 * @param array An array to get the unique values of
	 * @param key A key to search by (optional)
	 */
	unique(array: any[], key?: string): any[] {
		return array.filter(
			(item, i, arr) => arr.findIndex(
				el => key ? el[key] === item[key] : el === item
			) === i
		);
	},
};