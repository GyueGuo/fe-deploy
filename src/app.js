import React, {
  useEffect, useReducer, useRef,
} from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createHashHistory } from 'history';

import Index from './views/index';
import PayError from './views/pay-error';
import Payment from './views/payment';
import RecordList from './views/record-list';
import RecordDetail from './views/record-detail';
import Agreement from './views/agreement';
import Video from './views/video';

import reducer from './store/reducer';
import initStore from './store/store';
import Context from './store/context';

import './app.less';

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initStore,
  );

  const routes = useRef((
    <Router history={createHashHistory()}>
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
          path="/error"
          component={PayError}
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
      </Switch>
    </Router>
  ));
  useEffect(() => {
    const $root = document.documentElement;
    // eslint-disable-next-line no-mixed-operators
    $root.style.fontSize = `${document.documentElement.getBoundingClientRect().width / 750 * 100}px`;
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>
      { routes.current }
    </Context.Provider>
  );
}

ReactDom.render(<App />, document.querySelector('#app'));
