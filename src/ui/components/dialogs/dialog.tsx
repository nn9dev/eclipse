import React from 'react';

enum DialogActionStyle {
	default = 'default',
	cancel = 'cancel',
	destructive = 'destructive',
};

type DialogProps = {
	title: string;
	message: string;
	textField?: HTMLInputElement;
	progressBar?: HTMLProgressElement;
	buttons?: {
		title: string;
		style: DialogActionStyle;
		isEnabled?: boolean;
		onClick: () => void;
	}[];
};

export default function Dialog(props: DialogProps) {
	const { title, message, textField, progressBar, buttons } = props;
	return (
		<div className="dialog">
			<p>{title}</p>
			<p>{message}</p>
			{progressBar}
			{textField}
			<div className="buttons">
				{
					(buttons ?? []).map((btn) => (
						<button 
							className={`alert-btn alert-btn-${btn.style}`.trim()}
							disabled={btn.isEnabled} 
							onClick={btn.onClick}
						>{btn.title}</button>
					))
				}
			</div>
		</div>
	)
}