import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import Index from './views/index';
import Login from './views/login';
import Register from './views/register';
import Pay from './views/pay';
import RecordList from './views/record-list';
import RecordDetail from './views/record-detail';

function App() {
  useEffect(() => {
    const $root = document.documentElement;
    // eslint-disable-next-line no-mixed-operators
    $root.style.fontSize = `${document.documentElement.getBoundingClientRect().width / 750 * 100}px`;
  }, []);
  return (
    <Router history={createBrowserHistory()}>
      <Route
        path="/"
        component={Index}
        exact
      />
      <Route
        path="/pay"
        component={Pay}
        exact
      />
      <Route
        path="/record-list"
        component={RecordList}
        exact
      />
      <Route
        path="/record-detail"
        component={RecordDetail}
        exact
      />
      <Route
        path="/login"
        component={Login}
        exact
      />
      <Route
        path="/register"
        component={Register}
        exact
      />
      <Route
        path="*"
        redirect="/"
      />
    </Router>
  );
}

ReactDom.render(<App />, document.querySelector('#app'));
