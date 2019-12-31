import React from 'react';
import { Page, Navbar, Block, PageContent } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="404" backLink="Back" large largeTransparent />
	<PageContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px',  height: 'calc(100% - calc(var(--f7-navbar-height) + var(--f7-navbar-large-title-height)))' }}>
		<Block strong inset style={{textAlign: "center", backgroundColor: 'transparent'}}>
			<h1>Whoops!</h1>
			<p>Whatever page you were going to doesn't exist...</p>
		</Block>
	</PageContent>
  </Page>
);
