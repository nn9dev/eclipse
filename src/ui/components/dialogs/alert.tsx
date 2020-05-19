import React from 'react';
import { Dialog, DialogButton } from "./dialog";

export default function Alert(props: {
	id?: string;
	title: string;
	message: string;
	callback: () => void;
}) {
	return (
		<Dialog id={props.id ?? window.eclipse.utils.uuid()} title={props.title} message={props.message}>
			<DialogButton title="OK" type="default" onClick={props.callback} />
		</Dialog>
	)
}