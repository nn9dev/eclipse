//@ts-nocheck
import React from 'react';

export default function Toggle(props) {
	return (
		<input 
			type="checkbox" 
			className="toggle"
			name={props.name} 
			onChange={props.onChange}
			defaultChecked={props.defaultChecked}
		/>
	);
}