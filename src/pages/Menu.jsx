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
				<Navbar title="Eclipse" large={!this.$theme.md} largeTransparent={!this.$theme.md}></Navbar>

				{/* General Section */}

				<BlockTitle>General</BlockTitle>
				<List inset={this.$f7.theme == 'aurora'} noHairlinesBetweenAurora>
					<ListItem link="/" title="Library" view=".view-main" panelClose>
						<div slot="media" className="sidebar-media sb-media-first">
							<Icon ios="f7:square_grid_2x2_fill" md="material:view_module" aurora="f7:square_grid_2x2_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/game-hub/" title="Game Hub" view=".view-main" panelClose>
						<div slot="media" className="sidebar-media sb-media-second">
							<Icon ios="f7:square_stack_3d_up_fill" md="material:view_carousel" aurora="f7:square_stack_3d_up_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/skins/" title="Skins" view=".view-main" panelClose>
						<div slot="media" className="sidebar-media sb-media-third">
							<Icon ios="f7:wand_rays" md="material:color_lens" aurora="f7:wand_rays"></Icon>
						</div>
					</ListItem>
					<ListItem link="/controls/" title="Controls" view=".view-main" panelClose>
						<div slot="media" className="sidebar-media sb-media-fourth">
							<Icon ios="f7:gamecontroller_fill" md="material:gamepad" aurora="f7:gamecontroller_fill"></Icon>
						</div>
					</ListItem>
					<ListItem link="/settings/" title="Settings" view=".view-main" panelClose>
						<div slot="media" className="sidebar-media sb-media-fifth">
							<Icon ios="f7:gear" md="material:settings" aurora="f7:gear"></Icon>
						</div>
					</ListItem>
				</List>

				{/* Systems */}

				<BlockTitle>Systems</BlockTitle>
				<List inset={this.$f7.theme == 'aurora'} noHairlinesBetweenAurora>
					{eclipse.systems.map(res => (
						<ListItem key={res.id} link={`/system/${res.name.short.toLowerCase()}`} title={res.name.short} view=".view-main" panelClose>
							<div slot="media" className="sidebar-media sb-system-bg">
								<Icon ios="f7:list_bullet" md="material:list" aurora="f7:list_bullet"></Icon>
							</div>
						</ListItem>
					))}
				</List>
			</Page>
		)
	}
};