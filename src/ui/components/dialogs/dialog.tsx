import React from 'react';

type DialogButtonProps = {
	title: string;
	type?: 'default'|'cancel'|'destructive';
	isEnabled?: boolean;
	onClick: () => void;
}

type DialogProps = {
	id?: string;
	title: string;
	message: string;
	textField?: any;
	progressBar?: any;
	children: any;
};

export function DialogButton({title, type, isEnabled, onClick}: DialogButtonProps) {
	return (
		<button 
			className={`alert-btn alert-btn-${type ?? 'default'}`}
			disabled={isEnabled ?? false} 
			onClick={onClick}
		>{title}</button>
	)
}

export function Dialog(props: DialogProps) {
	const { id, title, message, textField, progressBar, children } = props;
	return (
		<div className="dialog-background" id={id}>
			<div className="dialog">
				<div className="content">
					<p className="title">{title}</p>
					<p className="message">{message}</p>
					{progressBar}
					{textField}
				</div>
				<div className="buttons">
					{children}
				</div>
			</div>
		</div>
	)
}