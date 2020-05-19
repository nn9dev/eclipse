import React from 'react';
import { Dialog, DialogButton } from "./dialog";

export default function Confirm(props: {
	id?: string;
	title: string;
	message: string;
	okTitle?: string;
	okType?: 'cancel'|'destructive'|'default';
	cancelCallback: () => void;
	callback: () => void;
}) {
	return (
		<Dialog id={props.id} title={props.title} message={props.message}>
			<DialogButton title="Cancel" type="cancel" onClick={props.cancelCallback} />
			<DialogButton title={props.okTitle ?? "OK"} type={props.okType ?? "default"} onClick={props.callback} />
		</Dialog>
	)
}