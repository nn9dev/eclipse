//@ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

export function List(props) {
	return (
		<ul className="list">
			{props.children}
		</ul>
	);
}

export function ListItem(props) {
	const content = [
		props.media ? <div key={window.eclipse.utils.uuid()} className="item-media">{props.media}</div> : null,
		<div key={window.eclipse.utils.uuid()} className="item-inner">
			<div className="item-title">
				<p className="title">{props.title}</p>
				<p className="subtitle">{props.subtitle}</p>
			</div>
			<div className="item-after">
				{props.after}
				{props.link ? <i className="f7-icons chevron">chevron_right</i> : null}
			</div>
		</div>
	];

	const className = `list-item ${props.subtitle ? 'has-subtitle' : ''}`.trim();

	return props.link ? (
		props.external ? (
			<a href={props.link} key={window.eclipse.utils.uuid()} onClick={props.onClick} target="_blank" rel="noopener noreferrer" className={className}>
				{content}
			</a>
		) : (
			<Link to={props.link} key={window.eclipse.utils.uuid()} onClick={props.onClick} className={className}>
				{content}
			</Link>
		)
	) : (
		<li className={className} key={window.eclipse.utils.uuid()} onClick={props.onClick}>
			{content}
		</li>
	);
}

export function ListTitle(props) {
	return (
		<h3 className="list-title">{props.title}</h3>
	);
}

export function ListFooter(props) {
	return (
		<p className="list-footer">{props.children}</p>
	);
}

export function RadioList() {
	
}