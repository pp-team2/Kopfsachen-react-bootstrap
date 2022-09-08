import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './components/routes'
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.render(
  <Routes/>
 ,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register("service-worker.js")
}
