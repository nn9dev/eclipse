const routes = [
	{
		path: '/',
		asyncComponent: () => import('../pages/Library')
	},
	{
		path: '/menu/',
		asyncComponent: () => import('../pages/Menu')
	},
	{
		path: '/settings/',
		asyncComponent: () => import('../pages/Settings/Settings.jsx'),
		routes: []
	},
	{
		path: '/game-hub/',
		async(routeTo, routeFrom, resolve, reject) {
			const component = () => import('../pages/GameHub/GameHub.jsx');
			global.eclipse.sources
				.fetch()
				.then(async repos => {
					const res = await global.fetch('static/json/repos/featured.json');
					const featured = await res.json();
					const vc = await component();
					resolve(
						{
							component: vc.default
						},
						{
							props: {
								featured,
								repos
							}
						}
					);
				})
				.catch(err => reject(err));
		}
	},
	{
		path: '/game/:id/',
		routes: [
			{
				path: 'play/',
				async(routeTo, routeFrom, resolve, reject) {
					const { id } = routeTo.params;
					const component = () => import('../pages/Game/Play.jsx');
					console.log(routeTo, routeFrom);
					global.eclipse.games.get({ id }).then(async games => {
						const vc = await component();
						const game = games[0];
						console.log(game);
						if (game.file != null) {
							// Handle file
							const file = await global.eclipse.storage.getItem(game.file);
							if (file != null) {
								resolve({
									popup: {
										component: vc.default
									}
								});
							} else {
								global.f7.dialog.alert(
									'This game expects a file, but none is present. Please upload the ROM to fix this issue.'
								);
								reject();
							}
						} else if (game.url != null) {
							// Handle URL
							const fetchDialog = global.f7.dialog.progress(game.name);
							fetchDialog.setText(`Fetching ${game.name} for play.`);
							try {
								const gameURL = new URL(game.url);
								const url = new URL(`https://api.zenithdevs.com/eclipse/download/`);
								url.searchParams.append('dl', encodeURIComponent(gameURL.href));
								const res = await fetch(url);
								if (res.headers.get('content-type').includes('application/json')) {
									fetchDialog.close();
									const error = await res.json();
									global.f7.dialog.alert(
										`${error.message}`,
										`Error ${error.code}`
									);
									reject();
								} else {
									const blob = await res.blob();
									console.log(blob);
									fetchDialog.close();
									resolve({
										popup: {
											component: vc.default
										}
									});
								}
							} catch (err) {
								fetchDialog.close();
								global.f7.dialog.alert(
									'An error occured while trying to fetch the ROM. Please make sure the linked file exists and is linked properly.'
								);
								console.error(err);
								reject();
							}
						} else {
							global.f7.dialog.alert(
								"This game doesn't have a URL or file tied to it. Please add either one to fix this issue."
							);
							reject();
						}
					});
				}
			}
		]
	},
	{
		path: '/cloud/',
		routes: [
			{
				path: 'dropbox/',
				asyncComponent: () => import('../pages/Cloud/Dropbox')
			}
		]
	},
	{
		path: '(.*)',
		asyncComponent: () => import('../pages/404')
	}
];

export default routes;
