import React from 'react';
import { Device } from 'framework7';
import {
	App,
	Appbar,
	Panel,
	View,
} from 'framework7-react';

import routes from '../js/routes';

export default class extends React.Component {

	constructor() {
		super();

		let url = new URL(location.href);
		let theme = url.searchParams.get('theme');
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		let detectedTheme = (Device.ios) ? 'ios' : (Device.android || Device.androidChrome) ? 'md' : 'aurora';
		
		this.state = {
			// Framework7 Parameters
			f7params: {
				id: 'com.zenithdevs.eclipseemu',
				name: 'Eclipse',
				version: window.appVersion,
				get theme() {
					return (!!theme) ? theme : detectedTheme;
				},
				autoDarkTheme: true,
				data: () => {
					return {
						user: {
							firstName: 'John',
							lastName: 'Doe',
						},
					};
				},
				panel: {
					// swipe: 'left',
					leftBreakpoint: 980,
				},
				routes: routes,
				serviceWorker: (url.host === `localhost:${url.port}`) ? {} : {
					path: '/service-worker.js',
				},
				input: {
					scrollIntoViewOnFocus: false,
					scrollIntoViewCentered: false,
				},
			},
			username: '',
			password: '',
		}
	}

	render() {
		return (
			<App params={this.state.f7params} colorTheme="red"> 
			  	{ 
				  	(Device.electron) ? (
						<Appbar className="if-aurora">
							<div className="left"></div>
							<div className="center">
								<p>Eclipse</p>
							</div>
						</Appbar>
					) : null
				}
				<div className="statusbar"></div>
				<Panel left resizable={this.state.f7params.theme === 'aurora'} visibleBreakpoint={960}>
					<View className="safe-areas" url="/menu/" />
				</Panel>
				<View main className="safe-areas" url="/" />
			</App>
		);
	}

	componentDidMount() {
		this.$f7ready((f7) => {
			// Call F7 APIs here
			console.log(this.$f7.statusbar);
			this.$f7.statusbar.show();
			globalThis.f7 = f7;
		});
	}
}