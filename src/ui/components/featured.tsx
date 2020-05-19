import React, { useEffect } from 'react';
import LazyImage from './lazy-image';
import { Link } from 'react-router-dom';

/*

	Types

*/

type FeaturedHeaderProps = {
	title: string;
	aspectRatio?: number;
	children: any;
}

type FeaturedCardProps = {
	title: string;
	caption: string;
	banner: string;
	link?: string;
	onClick?: (arg0?: any) => void;
}

/* 

	Components

*/

export function FeaturedHeader(props: FeaturedHeaderProps) {
	const id = '_' + window.eclipse.utils.uuid();
	useEffect(() => {
		(document.querySelector(`#${id}`) as any|undefined)?.style
			.setProperty('--eclipse-featured-banner-ar', `${100/(props.aspectRatio ?? 1.777777778)}%`);
	})
	return (
		<div className="featured-header" id={id}>
			<h3>{props.title}</h3>
			<div className="featured-header-items">
				{props.children}
				<div className="gutter"></div>
			</div>
		</div>
	)
}

export function FeaturedCard(props: FeaturedCardProps) {
	const content = (
		<>
			{/* Aspect Ratio defaults to 16:9 */}
			<LazyImage 
				src={props.banner}
				className="banner"
				backgroundImage 
			/>
			<p className="title">{props.title}</p>
			<p className="caption">{props.caption}</p>
		</>
	)
	return props.link ? (
		<Link to={props.link} className="featured-card">
			{content}
		</Link>
	) : (
		<div onClick={() => (props.onClick) ? props.onClick(props) : () => {}} className="featured-card">
			{content}
		</div>
	)
}