import React from 'react';
import { Popup, Page, Navbar, Block, List, ListButton, Button } from 'framework7-react';
import { Dropbox } from 'dropbox';

export default class extends React.Component {
	authToken() {
		this.$f7.dialog.prompt('Please enter your Dropbox Auth Token', val => {
			console.log(val);
			const dbx = new Dropbox({ accessToken: val, fetch });
			localStorage.setItem('dropbox_token', val);
			global.eclipse.cloud.dropbox.dbx = dbx;
			dbx.filesListFolder({ path: '' })
				.then(console.log)
				.catch(console.error);
			this.setState({});
		});
	}

	render() {
		return (
			<Popup>
				<Page>
					<Navbar title="Dropbox" />
					<Block inset style={{ textAlign: 'center' }}>
						<img src="static/img/dropbox.jpg" alt="Dropbox" width="92" height="92" />
						<h1>Dropbox</h1>
					</Block>
					<List inset>
						<ListButton
							color="blue"
							onClick={global.eclipse.cloud.dropbox.auth.bind(eclipse.cloud.dropbox)}
						>
							Get Auth Token
						</ListButton>
						<ListButton color="blue" onClick={this.authToken.bind(this)}>
							Add Auth Token
						</ListButton>
					</List>
					{global.eclipse.cloud.dropbox.dbx.accessToken ? (
						<List inset>
							<ListButton
								color="blue"
								onClick={global.eclipse.cloud.dropbox.setData.bind(
									global.eclipse.cloud.dropbox
								)}
							>
								Set Data
							</ListButton>
							<ListButton
								color="blue"
								onClick={async () => {
									await global.eclipse.cloud.dropbox.loadData();
									global.location.reload();
								}}
							>
								Load Data
							</ListButton>
						</List>
					) : null}
					<Button popupClose>Close</Button>
				</Page>
			</Popup>
		);
	}
}
