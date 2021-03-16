import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Index from './views/index';
import Login from './views/login';
import Register from './views/register';
import Payment from './views/payment';
import RecordList from './views/record-list';
import RecordDetail from './views/record-detail';
import Agreement from './views/agreement';
import Video from './views/video';
import PayFrames from './views/pay-frames';

import './app.less';

function App() {
  useEffect(() => {
    const $root = document.documentElement;
    // eslint-disable-next-line no-mixed-operators
    $root.style.fontSize = `${document.documentElement.getBoundingClientRect().width / 750 * 100}px`;
  }, []);
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route
          path="/"
          component={Index}
          exact
        />
        <Route
          path="/pay"
          component={Payment}
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
          path="/agreement"
          component={Agreement}
          exact
        />
        <Route
          path="/video"
          component={Video}
          exact
        />
        <Route
          path="*"
          redirect="/"
        />
        <Route
          path="/pay-frames"
          component={PayFrames}
          exact
        />
      </Switch>
    </Router>
  );
}

ReactDom.render(<App />, document.querySelector('#app'));
