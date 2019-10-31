<template>
	<div class="game">
		<div class="boxart" :style="{ backgroundImage: `url(${boxart})`}">
			<div class="items">
				<a href="/game/UIHwd/play/" class="play" data-router-link="">
					<ion-icon name="ios-play"></ion-icon>
				</a>
				<a href="#" class="menu">
					<ion-icon name="ios-more"></ion-icon>
				</a>
			</div>
		</div>
		<span class="name">{{ name }}</span>
		<span class="system">{{ system }}</span>
	</div>
</template>

<script>
	// @ is an alias to /src

	export default {
		name: 'home',
		components: {},
		props: ['boxart', 'name', 'system', 'gid'],
	}
</script>