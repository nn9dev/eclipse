import React from 'react';
import { Dialog, DialogButton } from "./dialog";

export default function Prompt(props: {
	id?: string;
	title: string;
	message: string;
	inputType?: string;
	cancelCallback: () => void;
	callback: (str: string) => void;
}) {
	let value: string = '';
	return (
		<Dialog 
			id={props.id}
			title={props.title} 
			message={props.message} 
			textField={
				<input 
					placeholder="Placeholder"
					type={props.inputType ?? "text"} 
					onChange={(evt: any) => { value = (evt.target as HTMLInputElement).value}} 
				/>
			}
		>
			<DialogButton title="Cancel" type="cancel" onClick={props.cancelCallback} />
			<DialogButton title="OK" type="default" onClick={() => props.callback(value)} />
		</Dialog>
	)
}