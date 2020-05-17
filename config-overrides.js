//@ts-nocheck
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(
		new CopyPlugin({
			patterns: [
				{ from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: '' },
			]
		})
	);
    return config;
}