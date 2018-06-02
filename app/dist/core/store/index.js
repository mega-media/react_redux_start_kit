/* redux */
import { createStore, applyMiddleware, compose } from 'redux';

/* router */
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
/* helper */
import { values } from 'ramda';

/* 系統設定 */
import { rootReducer } from '../roots';
import { ROUTE_BASE, ENABLE_DEV_TOOLS } from 'Config';

/* middleware */
import * as storeMiddleware from './middleware';

/* find storeMiddleware */
const {
  promise: promiseMiddleware,
  multipleActions: multipleActionsMiddleware,
  ...othersMiddleware
} = storeMiddleware;

/**
 * Router setting
 */
const history = createHistory({ basename: ROUTE_BASE });
const routeMiddleware = routerMiddleware(history);

let DevTools = null;

/* store creator */
const storeCreator = {
  create: (() => {
    if (ENABLE_DEV_TOOLS) {
      DevTools = require('../libraries/dev-tools');
      return () =>
        createStore(
          rootReducer,
          compose(
            applyMiddleware(
              routeMiddleware,
              multipleActionsMiddleware,
              promiseMiddleware,
              ...values(othersMiddleware)
            ),
            DevTools.instrument()
          )
        );
    } else {
      return () =>
        createStore(
          rootReducer,
          applyMiddleware(
            routeMiddleware,
            multipleActionsMiddleware,
            promiseMiddleware,
            ...values(othersMiddleware)
          )
        );
    }
  })(),
  run: () => {
    values(othersMiddleware).map(middleware => {
      middleware.__run__ && middleware.__run__();
    });
  }
};

export { storeCreator, history, DevTools };
