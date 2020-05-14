//@ts-nocheck
import React from 'react';
import { withRouter } from 'react-router';

function Navbar(props) {
	return (
		<nav>
			<div className="nav-inner">
				<div className="left">
					{props.back ? <button onClick={props.history.goBack}><i className="f7-icons">chevron_left</i></button> : null}
					{props.left}
				</div>
				<h1 className="title">{props.title}</h1>
				<div className="right">{props.right}</div>
			</div>
			{props.search ? 
				<div className="searchbar">
					<i className="f7-icons">search</i>
					<input type="text" placeholder="Search" onChange={props.search} />
				</div> : 
				null
			}
		</nav>
	);
}

export default withRouter(Navbar);