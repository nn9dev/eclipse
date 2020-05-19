import React from 'react';

type PageProps = { children: any };

export default function Page({ children }: PageProps) {
	let navbars = [];
	const hasNav = (children && children.constructor.name !== 'Object') ? 
		(() => {
			navbars = children.filter((v: any) => {
				try {
					return (v.props.back || v.props.left || v.props.right || v.props.search) && v.props.title;
				} catch {
					return false;
				}
			});
			return navbars.length > 0
		})() : false;
	const hasSearchbar = navbars.filter((v: any) => v.props.search).length > 0;
	return (
		<main className={`${hasNav ? 'has-navbar' : ''} ${hasSearchbar ? 'has-searchbar' : ''}`.trim()}>
			{children}
		</main>
	);
}