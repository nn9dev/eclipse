import React from 'react';
import Dialog from "./dialog";

export default function Alert(props: {
	title: string;
	messages: string;
}) {
	return (
		<Dialog
			title={props.title}
			message={props.messages}
		/>
	)
}