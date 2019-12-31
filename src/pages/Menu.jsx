import React from 'react';
import {
	Popup,
	Page,
	Navbar,
	NavLeft,
	NavRight,
	Searchbar,
	List,
	ListItem,
	Icon,
	BlockTitle,
} from 'framework7-react';

export default class extends React.Component {
	render() {
		return (
			<Page name="settings">
				<Navbar title="Eclipse" large largeTransparent></Navbar>

				{/* General Section */}

				<BlockTitle>General</BlockTitle>
				<List inset={this.$f7.theme == 'aurora'} noHairlinesBetweenAurora>
					<ListItem link="/" title="Library" view=".view-main" panelClose>
						<div slot="media" className="bg-color-gray sidebar-media">
							<Icon ios="f7:square_grid_2x2_fill" md="material:add" aurora="f7:square_grid_2x2_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/game-hub/" title="Game Hub" view=".view-main" panelClose>
						<div slot="media" className="bg-color-gray sidebar-media">
							<Icon ios="f7:square_stack_3d_up_fill" md="material:add" aurora="f7:square_stack_3d_up_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/skins/" title="Skins" view=".view-main" panelClose>
						<div slot="media" className="bg-color-gray sidebar-media">
							<Icon ios="f7:wand_rays" md="material:add" aurora="f7:wand_rays"></Icon>
						</div>
					</ListItem>
					<ListItem link="/controls/" title="Controls" view=".view-main" panelClose>
						<div slot="media" className="bg-color-gray sidebar-media">
							<Icon ios="f7:gamecontroller_fill" md="material:add" aurora="f7:gamecontroller_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/" title="Settings" view=".view-main" panelClose>
						<div slot="media" className="bg-color-gray sidebar-media">
							<Icon ios="f7:gear" md="material:settings" aurora="f7:gear"></Icon>
						</div>
					</ListItem>
				</List>

				{/* Systems */}

				<BlockTitle>Systems</BlockTitle>
				<List inset={this.$f7.theme == 'aurora'} noHairlinesBetweenAurora>
					{eclipse.systems.map(res => (
						<ListItem key={res.id} link="#" title={res.name.long} view=".view-main" panelClose>
							<div slot="media" className="bg-color-gray sidebar-media">
								<Icon ios="f7:list" md="material:add" aurora="f7:list"></Icon>
							</div>
						</ListItem>
					))}
				</List>
			</Page>
		)
	}
};