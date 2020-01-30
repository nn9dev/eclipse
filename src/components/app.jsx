import React from 'react';
import { Device } from 'framework7';
import { App, Panel, View } from 'framework7-react';

import routes from '../js/routes';

export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			// Framework7 Parameters
			f7params: {
				id: 'com.zenithdevs.eclipseemu',
				name: 'Eclipse',
				version: global.appVersion,
				autoDarkTheme: true,
				routes,
				get theme() {
					const currentURL = new URL(global.location.href);
					const detected = Device.desktop ? 'aurora' : 'auto';
					const query = currentURL.searchParams.get('theme');
					return ['ios', 'md', 'aurora'].indexOf(query) > -1 ? query : detected;
				},
				touch: {
					fastClicks: true,
					tapHold: true
				},
				panel: {
					leftBreakpoint: 980
				},
				get serviceWorker() {
					if (global.location.origin !== `localhost`) {
						return {
							path: '/service-worker.js'
						};
					}
					return null;
				}
			}
		};
	}

	componentDidMount() {
		this.$f7ready(f7 => {
			// Call F7 APIs here
			console.log(this.$f7.statusbar);
			this.$f7.statusbar.show();
			global.f7 = f7;
		});
		global.window.onpagehide = () => {
			console.log('howdy?');
			if (global.eclipse.cloud.dropbox.dbx.accessToken) {
				global.eclipse.cloud.dropbox.setData().then(() => {
					global.f7.toast
						.create({
							text: 'Saved to Dropbox.',
							closeTimeout: 1000
						})
						.open();
				});
			}
		};
	}

	render() {
		const { f7params } = this.state;
		return (
			<App params={f7params} colorTheme="red">
				<div className="statusbar" />
				<Panel left resizable={f7params.theme === 'aurora'} visibleBreakpoint={960}>
					<View className="safe-areas" url="/menu/" />
				</Panel>
				<View main className="safe-areas" url="/" />
			</App>
		);
	}
}
