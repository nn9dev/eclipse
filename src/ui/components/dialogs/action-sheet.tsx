import React from 'react';

type ActionSheetProps = {
	id: string;
	title?: string;
	message?: string;
	dismiss: (id: string) => void;
	items: {
		title: string;
		type?: 'default'|'destructive'|'cancel';
		onClick: () => void;
	}[];
}

export default function ActionSheet({ id, title, message, dismiss, items }: ActionSheetProps) {
	return (
		<div className="dialog-background actions" id={id}>
			<div className="action-sheet">
				<div className="action-group">
					<div className="content">
						<p className="title">{title}</p>
						<p className="message">{message}</p>
					</div>
					<div className="buttons">
						{items.map(item => (
							<button 
								key={window.eclipse.utils.uuid()}
								className={`action-group-button action-group-button-${item.type ?? 'default'}`}
								onClick={() =>{ 
									dismiss(id);
									item.onClick();
								}}
							>{item.title}</button>
						))}
					</div>
				</div>
				<div className="action-group">
					<div className="buttons">
						<button 
							className="action-group-button action-group-button-cancel" 
							onClick={() => dismiss(id)
						}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	)
}