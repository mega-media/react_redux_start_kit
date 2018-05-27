/* redux */
import { createStore, applyMiddleware, compose } from 'redux';

/* router */
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

/* 系統設定 */
import { RootReducer, RootRoutes } from '../roots';
import { BASE_PATH, ENABLE_DEV_TOOLS } from 'Config';

/* middleware */
import {
  promiseMiddleware,
  multipleActionsMiddleware,
  sagaMiddleware
} from './middleware';

/* saga */
import createSagaMiddleware from 'redux-saga';

const sagaCreator = createSagaMiddleware();

/**
 * Router setting
 */
const history = createHistory({ basename: BASE_PATH });
const routeMiddleware = routerMiddleware(history);
let store = {};
let DevTools = null;
if (ENABLE_DEV_TOOLS) {
  DevTools = require('../libraries/devTools');
  store = createStore(
    RootReducer,
    compose(
      applyMiddleware(
        routeMiddleware,
        multipleActionsMiddleware,
        promiseMiddleware,
        sagaCreator
      ),
      DevTools.instrument()
    )
  );
} else {
  store = createStore(
    RootReducer,
    applyMiddleware(
      routeMiddleware,
      multipleActionsMiddleware,
      promiseMiddleware,
      sagaCreator
    )
  );
}
/* 執行 saga 監聽 */
sagaCreator.run(sagaMiddleware);

export { store, history, DevTools };
