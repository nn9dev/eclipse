<template>
	<div class="home">
		<div class="content">

			<!-- Header -->
			<div class="header">
				<div class="container">
					<h1>Keep Playing</h1>
					<div class="grid">
						<GameCard v-for="i in 5" :key="i" name="Game Name"
							boxart="http://s.emuparadise.org/GBA/boxart/1237.jpg" system="System" />
					</div>
				</div>
			</div>

			<!-- Your Games -->
			<div class="container">
				<h1>Your Games</h1>
				<div class="grid">
					<GameCard v-for="i in 50" :key="i" name="Game Name"
						boxart="http://s.emuparadise.org/GBA/boxart/1237.jpg" system="System" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import GameCard from '@/components/GameCard';

	export default {
		name: 'home',
		components: {
			GameCard,
		}
	}
</script>