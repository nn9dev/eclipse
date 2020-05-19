import React from 'react';

type ToggleProps = {
	name: string;
	defaultChecked: boolean;
	onChange: (arg0: any) => void;
} 

export default function Toggle({ name, onChange, defaultChecked}: ToggleProps) {
	return (
		<input 
			type="checkbox" 
			className="toggle"
			name={name} 
			onChange={onChange}
			defaultChecked={defaultChecked}
		/>
	);
}