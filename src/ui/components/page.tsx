//@ts-nocheck
import React from 'react';

export default function Page(props) {
	let navbars = [];
	const hasNav = (props.children && props.children.constructor.name !== 'Object') ? 
		(() => {
			navbars = props.children.filter(v => {
				try {
					return v.type.displayName === 'withRouter(Navbar)' || v.type.displayName === 'withRouter()'
				} catch {
					return false;
				}
			});
			return navbars.length > 0
		})() : false;
	const hasSearchbar = navbars.filter((v) => v.props.search).length > 0;
	console.log({ children: props.children, hasNav, hasSearchbar });
	return (
		<main className={`${hasNav ? 'has-navbar' : ''} ${hasSearchbar ? 'has-searchbar' : ''}`.trim()}>
			{props.children}
		</main>
	);
}