import React from 'react';
import { withRouter } from 'react-router';

type NavbarProps = {
	history: any;
	title: string;
	back?: boolean;
	left?: any;
	right?: any;
	search?: (arg0: any) => void;
};

function Navbar(props: NavbarProps) {
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

// @ts-ignore
export default withRouter(Navbar);