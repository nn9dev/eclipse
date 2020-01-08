import React from 'react';
import { Popup, Page, Navbar, Block, List, ListButton, Button } from 'framework7-react';
import { Dropbox } from 'dropbox';
export default class extends React.Component {
	render() {
		return (
			<Popup>
				<Page>
					<Navbar title="Dropbox" />
					<Block inset style={{ textAlign: "center" }}>
						<img src="static/img/dropbox.jpg" width="92" height="92" />
						<h1>Dropbox</h1>
					</Block>
					<List inset>
						<ListButton color="blue" onClick={eclipse.cloud.dropbox.auth.bind(eclipse.cloud.dropbox)}>Get Auth Token</ListButton>
						<ListButton color="blue" onClick={this.authToken.bind(this)}>Add Auth Token</ListButton>
					</List>
					<List inset>
						<ListButton color="blue" onClick={eclipse.cloud.dropbox.setData.bind(eclipse.cloud.dropbox)}>Set Data</ListButton>
						<ListButton color="blue" onClick={async() => {
							let data = await eclipse.cloud.dropbox.getData.bind(eclipse.cloud.dropbox);
							console.log(data);
							alert(`Fetched data: ${JSON.stringify(data)}`);
						}}>Get Data</ListButton>
					</List>
					<Button popupClose>Close</Button>
				</Page>
			</Popup>
		);
	}

	authToken() {
		this.$f7.dialog.prompt('Please enter your Dropbox Auth Token', (val) => {
			console.log(val);
			var dbx = new Dropbox({ accessToken: val, fetch });
			localStorage.setItem('dropbox_token', val);
			dbx.filesListFolder({path: ''}).then(function(response) {
				console.log(response);
			}).catch(function(error) {
				console.log(error);
			});
		});
	}
}
