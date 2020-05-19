import React from 'react';
import ReactDOM from 'react-dom';
import './ui/styles/index.css';
import App from './ui/app';
import Dialogs from './ui/components/dialogs';
import * as serviceWorker from './serviceWorker';
import Eclipse from './eclipse/main';
import 'framework7-icons';

window.eclipse = Eclipse;
window.Dialogs = Dialogs;

console.log(window.eclipse);

ReactDOM.render(
	<React.StrictMode>
		<App standalone={
			// @ts-ignore
			!!navigator.standalone
		}/>
	</React.StrictMode>,
	document.getElementById('root')
);

//@ts-ignore
if (navigator.standalone) {
	var script = document.createElement('script'); 
	script.src = "//cdn.jsdelivr.net/npm/eruda"; 
	document.body.appendChild(script); 
	//@ts-ignore
	script.onload = () => window.eruda?.init();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
