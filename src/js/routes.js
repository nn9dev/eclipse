import LibraryPage from '../pages/Library.jsx';
import MenuPage from '../pages/Menu.jsx';
// import FormPage from '../pages/Menu.jsx/index.js';


// import DynamicRoutePage from '../pages/dynamic-route.jsx';
// import RequestAndLoad from '../pages/request-and-load.jsx';
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
		path: '/game/:id/',
		routes: [
			{
				path: 'play/',
				async(routeTo, routeFrom, resolve, reject) {
					const reactComponent = () => import('../pages/Game/Play.jsx');
					reactComponent().then((rc) => {
						resolve({ 
							popup: {
								component: rc.default
							} 
						})
					});
				},
			}
		],
	},
	{
		path: '(.*)',
		component: NotFoundPage,
	},
];

export default routes;