import ReactDOM from 'react-dom';
import alert from './alert';
import confirm from './confirm';
import prompt from './prompt';
import actionSheet from './action-sheet';

function display(dialog: any) {
	ReactDOM.render(
		dialog,
		document.querySelector('div.dialog-zone')
	);
	document.body.classList.add('disable-scroll');
}

function dismiss(id: string) {
	const el = document.querySelector('div.dialog-zone');
	if (el) ReactDOM.unmountComponentAtNode(el);
	document.body.classList.remove('disable-scroll');
}

type DialogButtonType = 'destructive'|'default'|'cancel';

export default {
	/**
	 * Show an alert
	 */
	alert({ title, message, callback }: {
		title: string; 
		message: string; 
		callback?: () => void;
	}) {
		const id = window.eclipse.utils.uuid();
		display(
			alert({
				id,
				title,
				message,
				callback: () => {
					dismiss(id);
					if (callback) callback();
				}
			})
		);
	},

	/**
	 * 
	 */
	confirm({ title, message, cancel, callback, okTitle, okType }: {
		title: string; 
		message: string; 
		okTitle: string;
		okType: DialogButtonType;
		cancel?: () => void;
		callback?: () => void;
	}) {
		const id = window.eclipse.utils.uuid();
		display(
			confirm({
				id,
				title,
				message,
				okTitle,
				okType,
				cancelCallback() {
					dismiss(id);
					if (cancel) cancel();
				},
				callback() {
					dismiss(id);
					if (callback) callback();
				}
			})
		);
	},

	prompt({ title, message, inputType, cancel, callback }: {
		title: string;
		message: string;
		inputType: string;
		cancel?: () => void;
		callback: (str: string) => void;
	}) {
		const id = window.eclipse.utils.uuid();
		display(
			prompt({
				id,
				title,
				message,
				inputType,
				cancelCallback() {
					dismiss(id);
					if (cancel) cancel();
				},
				callback(str: string) {
					dismiss(id);
					callback(str);
				}
			})
		);
	},

	actionSheet(props: {
		title?: string;
		message?: string;
		items: {
			title: string;
			type?: 'default'|'destructive'|'cancel';
			onClick: () => void;
		}[];
	}) {
		const id = window.eclipse.utils.uuid();
		display(
			actionSheet({
				id,
				...props,
				dismiss
			})
		);
	}
}