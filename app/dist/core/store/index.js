/* redux */
import { createStore, applyMiddleware, compose } from 'redux';

/* router */
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
/* helper */
import { values } from 'ramda';

/* saga */
import createSagaMiddleware from 'redux-saga';

/* 系統設定 */
import { RootReducer, RootRoutes } from '../roots';
import { BASE_PATH, ENABLE_DEV_TOOLS } from 'Config';

/* middleware */
import * as storeMiddleware from './middleware';

const sagaMiddleware = createSagaMiddleware();

/* find storeMiddleware */
const {
  saga: sagaWatcherMiddleware,
  promise: promiseMiddleware,
  multipleActions: multipleActionsMiddleware,
  ...othersMiddleware
} = storeMiddleware;

/**
 * Router setting
 */
const history = createHistory({ basename: BASE_PATH });
const routeMiddleware = routerMiddleware(history);

let DevTools = null;

/* store creator */
const sagaCreator = {
  create: (() => {
    if (ENABLE_DEV_TOOLS) {
      DevTools = require('../libraries/dev-tools');
      return () =>
        createStore(
          RootReducer,
          compose(
            applyMiddleware(
              routeMiddleware,
              multipleActionsMiddleware,
              promiseMiddleware,
              sagaMiddleware,
              ...values(othersMiddleware)
            ),
            DevTools.instrument()
          )
        );
    } else {
      return () =>
        createStore(
          RootReducer,
          applyMiddleware(
            routeMiddleware,
            multipleActionsMiddleware,
            promiseMiddleware,
            sagaMiddleware,
            ...values(othersMiddleware)
          )
        );
    }
  })(),
  run: () => {
    sagaMiddleware.run(sagaWatcherMiddleware);
  }
};

export { sagaCreator, history, DevTools };
