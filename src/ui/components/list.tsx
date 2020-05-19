import React from 'react';
import { Link } from 'react-router-dom';

export function List({ children }: { children: any }) {
	return (
		<ul className="list">
			{children}
		</ul>
	);
}

export function ListItem(props: {
	media?: any;
	title: string;
	subtitle?: string;
	after?: any;
	link?: string;
	external?: boolean;
	onClick?: (event: any) => void;
}) {
	const content = (
		<>
			{props.media ? <div className="item-media">{props.media}</div> : null}
			<div className="item-inner">
				<div className="item-title">
					<p className="title">{props.title}</p>
					<p className="subtitle">{props.subtitle}</p>
				</div>
				<div className="item-after">
					{props.after}
					{props.link ? <i className="f7-icons chevron">chevron_right</i> : null}
				</div>
			</div>
		</>
	);

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

export function ListTitle({ title, button }: { title: string, button?: JSX.Element }) {
	return (
		<div className="list-title-container">
			<h3 className="list-title">{title}</h3>
			{button}
		</div>
	);
}

export function ListFooter({ children }: { children: string }) {
	return (
		<p className="list-footer">{children}</p>
	);
}

export function RadioList() {

}