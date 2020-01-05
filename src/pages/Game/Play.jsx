import React, { Component } from 'react';
import { Popup, Page, Navbar, Block, Link, Button } from 'framework7-react';

export default class DynamicRoutePage extends Component {
	render() {
		return (
			<Popup className="emulation-popup" tabletFullscreen>
				<Page pageContent={false}>
					<div className="screen">
						<canvas id="screen"></canvas>
					</div>
					{this.$theme.aurora ? 
						// Load emulation menu
						(<div className="emulation-menu-bar">
							<div className="emu-menu">
								<Button onClick={this.closeHandler.bind(this)}>Quit</Button>
							</div>
						</div>) :
						// Load Controls
						(
							<div className="controls">
								<p className="system">GBA</p>
								<div className="top-controls">
									<Button className="control shoulder left-shoulder">L</Button>
									<Button className="control shoulder right-shoulder">R</Button>
								</div>
								<div className="dpad">
									<div className="direction up-direction"></div>
									<div className="direction left-direction"></div>
									<div className="direction center-direction"></div>
									<div className="direction right-direction"></div>
									<div className="direction down-direction"></div>
								</div>
								<div className="bottom-controls">
									<Button className="control menu-button" onClick={this.emulationMenu.bind(this)} round>MENU</Button>
									<div className="start-select">
										<Button className="control" round>START</Button>
										<Button className="control" round>SELECT</Button>
									</div>
								</div>
							</div>
						)
					}
				</Page>
			</Popup>
		);
	}

	componentDidMount() {
		window.addEventListener('beforeunload', this.unloadHandler);
		document.querySelector('canvas#screen').addEventListener('mousemove', this.handleMouseMove);
		document.querySelector('canvas#screen').style.cursor = 'default';
	}
	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.unloadHandler);
		document.querySelector('canvas#screen').removeEventListener('mousemove', this.handleMouseMove);
	}

	emulationMenu() {
		let app = this.$f7;
		let menu = app.actions.create({
			buttons: [
				[
					{
						text: 'Game',
						label: true,
					},
					{
						text: 'Enable Audio',
						color: 'blue',
						onClick: () => {
						}
					},
					{
						text: 'Fast Forward',
						color: 'blue',
						onClick: () => {
						}
					},
					{
						text: 'Enable Cheats',
						color: 'blue',
						onClick: () => {
						}
					},
					{
						text: 'Quit',
						color: 'red',
						onClick: () => this.closeHandler()
					},
				].filter(v => !!v),
				[
					{
						text: 'Cancel',
						color: 'red',
					},
				]
			],
		});
	
		// Open
		menu.open();
	}

	closeHandler() {
		this.$f7.dialog.confirm("Are you sure you want to quit? Any unsaved data will be lost.", () => {
			this.$f7.popup.close();
		});
	}


	handleMouseMove() {
		var timer;
		var fadeInBuffer = false;
		if (!fadeInBuffer && timer) {
			clearTimeout(timer);
			timer = 0;
			document.querySelector('canvas#screen').style.cursor = '';
			document.querySelector('div.emu-menu').style.opacity = '';
			document.querySelector('div.emu-menu').style.pointerEvents = '';
			document.querySelector('div.emulation-menu-bar').style.pointerEvents = '';
		} else {
			document.querySelector('canvas#screen').style.cursor = 'default';
			document.querySelector('div.emu-menu').style.opacity = '1';
			document.querySelector('div.emu-menu').style.pointerEvents = 'initial';
			document.querySelector('div.emulation-menu-bar').style.pointerEvents = 'initial';
			fadeInBuffer = false;
		}

		timer = setTimeout(function() {
			document.querySelector('canvas#screen').style.cursor = 'none';
			document.querySelector('div.emu-menu').style.opacity = '0';
			document.querySelector('div.emu-menu').style.pointerEvents = 'none';
			document.querySelector('div.emulation-menu-bar').style.pointerEvents = 'none';
			fadeInBuffer = true;
		}, 5000);
	};

	unloadHandler(evt) {

	}
}