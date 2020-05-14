import diacriticsMap from './other/diacritics-map';

export default {
	uuid(template = 'xxxxxxxx', charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'): string {
		const characters = [...(new Set(charset.trim().split('')))];
		return template.trim().split('').map(v => (v !== 'x') ? v : characters[Math.floor(Math.random() * characters.length)]).join('');
	},
	clearDiacritics(string: string): string {
		// eslint-disable-next-line 
		return string.replace(/[^\u0000-\u007E]/g, a => diacriticsMap.get(a) || a);
	}
};