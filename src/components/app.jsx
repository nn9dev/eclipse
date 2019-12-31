import React from 'react';
import { Device } from 'framework7';
import {
	App,
	Appbar,
	Panel,
	Views,
	View,
	Button,
	Searchbar,
	Popup,
	Page,
	Navbar,
	Toolbar,
	NavRight,
	Link,
	Block,
	BlockTitle,
	LoginScreen,
	LoginScreenTitle,
	List,
	ListItem,
	ListInput,
	ListButton,
	BlockFooter
} from 'framework7-react';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';

export default class extends React.Component {

	constructor() {
		super();

		let url = new URL(location.href);
		let theme = url.searchParams.get('theme');
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		let detectedTheme = (Device.ios) ? 'iOS' : (Device.android || Device.androidChrome) ? 'md' : 'aurora';
		
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
					swipe: 'left',
					leftBreakpoint: 980,
				},
				routes: routes,
				serviceWorker: (this.$device.cordova || url.host === `localhost:${url.port}`) ? {} : {
					path: '/service-worker.js',
				},
				input: {
					scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
					scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
				},
				statusbar: {
					iosOverlaysWebView: true,
					androidOverlaysWebView: false,
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
							<div className="right"></div>
						</Appbar>
					) : null
				}
				<Panel left resizable={true} visibleBreakpoint={960}>
					<View className="safe-areas" url="/menu/" />
				</Panel>
				<View main className="safe-areas" url="/" />
			</App>
		);
	}

	componentDidMount() {
		this.$f7ready((f7) => {
			// Init cordova APIs (see cordova-app.js)
			if (f7.device.cordova) {
				cordovaApp.init(f7);
			}
			// Call F7 APIs here
		});
	}
}