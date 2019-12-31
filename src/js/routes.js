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
		path: '(.*)',
		component: NotFoundPage,
	},
];

export default routes;