import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import IdRoute from './Routes/IdRoute'
import IndexRoute from './Routes/IndexRoute'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
function index({match}){
  return <p>Index!</p>
}
function test_({match}){
  return  <p>test_!</p>
}
function App() {
  JavascriptTimeAgo.locale(en)
	return (
		<div className="App">
			<BrowserRouter>
				<Route exact={true} path="/" component={IndexRoute}/>
				<Route path="/:id" component={IdRoute} />
			</BrowserRouter>
		</div>
	);
}

export default App;
