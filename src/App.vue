<template>
	<div id="app">
		<nav class="navbar">
			<div class="top">
				<div class="left">
					<img src="https://api.zenithdevs.com/eclipse/twitter/tryeclipse" />
					<span>Eclipse</span>
				</div>
				<div class="searchbar">
					<input type="search" name="search" placeholder="Search Games" id="">
				</div>
				<div class="right">
					<router-link to="/settings/" class="settings-button">
						<ion-icon name="settings"></ion-icon>
					</router-link>
					<a href="#" class="add-button">
						<ion-icon name="add-circle"></ion-icon>
					</a>
				</div>
			</div>
			<div class="bottom">
				<router-link to="/">Library</router-link>
				<router-link to="/repos/">Repos</router-link>
				<router-link to="/skins/">Skins</router-link>
				<router-link to="/controls/">Controls</router-link>
			</div>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
	} from 'vue-property-decorator';

	@Component({
		components: {},
	})
	export default class App extends Vue {}
</script>