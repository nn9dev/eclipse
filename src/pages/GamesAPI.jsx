import React, { Component } from 'react';
import { Page, Navbar, Block, Link } from 'framework7-react';

export default class DynamicRoutePage extends Component {
	render() {
		return (
			<Page>
				<Navbar title="Dynamic Route" backLink="Back" />
				<p>{JSON.stringify(this.props)}</p>
			</Page>
		);
	}
}