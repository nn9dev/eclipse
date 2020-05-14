//@ts-nocheck
import React from 'react';
import Page from '../components/page';
import Navbar from '../components/navbar';
import { ListTitle } from '../components/list';

export default function Skins() {
	return (
		<Page>
			<Navbar 
				back 
				title="Skins" 
				right={<button><i className="f7-icons">plus</i></button>}
			/>
			
			<ListTitle title="Your Skins" />
			<input type="radio" id="male" name="gender" value="male" />
			<label for="male">Male</label><br />
			<input type="radio" id="female" name="gender" value="female" />
			<label for="female">Female</label><br />
			<input type="radio" id="other" name="gender" value="other" />
			<label for="other">Other</label>
		</Page>
	);
}