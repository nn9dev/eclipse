//@ts-nocheck
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

function Game(props) {
	const id = props.match.params.id;
	useEffect(() => {
		// const game = window.eclipse.games.get(id);
		console.log('Component did mount.');
	}, []);

	return (
		<div className="emulator">
			<div className="screen-container">
				<p className="temp-message">Loading game with id "{id}"</p>
				<canvas className="screen"></canvas>
			</div>
			<div className="controls touch-only" data-ck-control-region>
				<div className="emu-name">Eclipse</div>
				<div className="shoulder">
					<div data-ck-control="l_shoulder">L</div>
					<div data-ck-control="r_shoulder">R</div>
				</div>
				<div className="middle">
					<div className="dpad">
						<div data-ck-control="down, left"></div>
						<div data-ck-control="left"></div>
						<div data-ck-control="up, left"></div>
						<div data-ck-control="up"></div>
						<div data-ck-control="up, right"></div>
						<div data-ck-control="right"></div>
						<div data-ck-control="down, right"></div>
						<div data-ck-control="down"></div>
						<div className="center"></div>
					</div>
					<div className="facebuttons">
						<div data-ck-control="b, y"></div>
						<div data-ck-control="y">Y</div>
						<div data-ck-control="x, y"></div>
						<div data-ck-control="x">X</div>
						<div data-ck-control="x, a"></div>
						<div data-ck-control="a">A</div>
						<div data-ck-control="a, b"></div>
						<div data-ck-control="b">B</div>
					</div>
				</div>
				<div className="startselect">
					<div data-ck-control="start">Start</div>
					<div data-ck-control="select">Select</div>
				</div>
				<button 
					className="menu-button"
					onClick={(evt) => {
						const bool = window.confirm('Are you sure you want to quit? Any unsaved data will be lost.');
						if (bool) {
							props.history.goBack(evt);
						}
					}}
				>Menu</button>
			</div>
		</div>
	);
}

export default withRouter(Game);