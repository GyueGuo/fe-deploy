import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import routes from './routes';

function renderRoutes(conf) {
  return (conf && conf.length) ? routes.map((item) => (
    <Route
      key={item.path}
      path={item.path}
      component={item.component}
      exact={item.exact}
    >
      { renderRoutes(item.children) }
    </Route>
  )) : null;
}
function App() {
  return (
    <Router history={createBrowserHistory()}>{ renderRoutes(routes) }</Router>
  );
}

ReactDom.render(<App />, document.querySelector('#app'));
