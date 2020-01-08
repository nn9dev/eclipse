import LibraryPage from '../pages/Library.jsx';
import MenuPage from '../pages/Menu.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [{
		path: '/',
		component: LibraryPage,
	},
	{
		path: '/menu/',
		component: MenuPage,
	},
	{
		path: '/settings/',
		async(routeTo, routeFrom, resolve, reject) {
			const component = () => import('../pages/Settings/Settings.jsx');
			component().then((vc) => {
				resolve({ 
					component: vc.default
				})
			});
		},
		routes: []
	},
	{
		path: '/game-hub/',
		async(routeTo, routeFrom, resolve, reject) {
			const component = () => import('../pages/GameHub/GameHub.jsx');
			eclipse.sources.fetch().then(async repos => {
				let res = await fetch('static/json/repos/featured.json');
				let featured = await res.json();
				let vc = await component()
				resolve({ 
					component: vc.default,
				}, {
					props: {
						featured,
						repos,
					},
				})
			});
		},
	},
	{
		path: '/game/:id/',
		routes: [
			{
				path: 'play/',
				async(routeTo, routeFrom, resolve, reject) {
					const component = () => import('../pages/Game/Play.jsx');
					component().then((vc) => {
						resolve({ 
							popup: {
								component: vc.default
							} 
						})
					});
				},
			}
		],
	},
	{
		path: '/cloud/',
		routes: [
			{
				path: 'dropbox/',
				async(routeTo, routeFrom, resolve, reject) {
					const component = () => import('../pages/Cloud/Dropbox.jsx');
					component().then((vc) => {
						resolve({ 
							popup: {
								component: vc.default
							}
						})
					});
				},
			}
		]
	},
	{
		path: '(.*)',
		component: NotFoundPage,
	},
];

export default routes;