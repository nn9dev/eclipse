import React, { Component } from 'react';
import { Popup, Page, Navbar, Block, Link, Button } from 'framework7-react';

export default class DynamicRoutePage extends Component {

	constructor(props) {
		super(props);

		// Setup Emulation Menu
		this.state = {menu: this.$f7.actions.create({
			buttons: [
				[
					{
						text: 'Game',
						label: true,
					},
					{
						text: 'Enable Audio',
						color: 'blue',
						// icon: '<i class="f7-icons if-not-md">home</i><i class="material-icons md-only">home</i>',
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
						color: 'blue',
						bold: true,
					}
				]
			],
		})}
		console.log(this.state.menu)
	}

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
								{this.state.menu.groups[0].filter(v => !v.label).reverse().map((item) => {
								return <Button color={item.color} onClick={item.onClick}>{item.text}</Button>
								})}
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
		
		// Set Event Listeners
		window.addEventListener('beforeunload', this.unloadHandler);
		document.querySelector('canvas#screen').addEventListener('mousemove', this.handleMouseMove);
		document.querySelector('canvas#screen').style.cursor = 'default';
	}

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.unloadHandler);
		document.querySelector('canvas#screen').removeEventListener('mousemove', this.handleMouseMove);
	}

	emulationMenu() {
		// Open
		this.state.menu.open();
	}

	closeHandler() {
		this.$f7.dialog.confirm("Are you sure you want to quit? Any unsaved data will be lost.", () => {
			this.$f7.popup.close();
		});
	}


	handleMouseMove(evt) {

		// Clear Timeout		
		clearTimeout(this.mouseHoverTimer);

		document.querySelector('canvas#screen').style.cursor = '';
		document.querySelector('div.emu-menu').style.opacity = '';
		document.querySelector('div.emu-menu').style.pointerEvents = '';
		document.querySelector('div.emulation-menu-bar').style.pointerEvents = '';
		
		// Set Timeout		
		this.mouseHoverTimer = setTimeout(() => {
			document.querySelector('canvas#screen').style.cursor = 'none';
			document.querySelector('div.emu-menu').style.opacity = '0';
			document.querySelector('div.emu-menu').style.pointerEvents = 'none';
			document.querySelector('div.emulation-menu-bar').style.pointerEvents = 'none';
		}, 3000);
	};

	unloadHandler(evt) {

	}
}