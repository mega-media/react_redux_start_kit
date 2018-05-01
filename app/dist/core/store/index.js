/* @flow */
/* redux */
import { createStore, applyMiddleware, compose } from 'redux';

/* router */
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

/* 系統設定 */
import { RootReducer, RootRoutes } from '../roots';
import { promiseMiddleware, multiDispatchMiddleware } from './middleware';
import { BASE_PATH } from 'Config';

/* saga */
import createSagaMiddleware from 'redux-saga';
import sagaFlow from '../saga';

/* saga */
const sagaMiddleware = createSagaMiddleware();

/**
 * Router setting
 */
const history = createHistory({ basename: BASE_PATH });
const routeMiddleware = routerMiddleware(history);
let store = {};
let DevTools = null;
if (process.env.NODE_ENV === 'development') {
  DevTools = require('../libraries/devTools');
  store = createStore(
    RootReducer,
    (compose(
      applyMiddleware(
        routeMiddleware,
        multiDispatchMiddleware,
        promiseMiddleware,
        sagaMiddleware
      ),
      DevTools.instrument()
    ): any)
  );
} else {
  store = createStore(
    RootReducer,
    applyMiddleware(
      routeMiddleware,
      multiDispatchMiddleware,
      promiseMiddleware,
      sagaMiddleware
    )
  );
}
/* 執行 saga 監聽 */
sagaMiddleware.run(sagaFlow);

export { store, history, DevTools };
