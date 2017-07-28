import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { RootReducer, RootRoutes } from './Roots';
import { promiseMiddleware, multiDispatchMiddleware } from './Middleware';
// Intro
import IntroView from '~/Containers/00_Intro/View';
/* 系統設置 */
const Constants = require('Config');
/** Route 設定 **/
const appHistory = useRouterHistory(createHistory)({
  basename: Constants.BASE_PATH,
  queryKey: false
});
const routingMiddleware = routerMiddleware(appHistory);
let store = {};
let DevTools = null;
if (process.env.NODE_ENV === 'development') {
  DevTools = require('./Libraries/devTools');
  store = createStore(
    RootReducer,
    compose(
      applyMiddleware(
        routingMiddleware,
        multiDispatchMiddleware,
        promiseMiddleware
      ),
      DevTools.instrument()
    )
  );
} else {
  store = createStore(
    RootReducer,
    applyMiddleware(
      routingMiddleware,
      multiDispatchMiddleware,
      promiseMiddleware
    )
  );
}
const history = syncHistoryWithStore(appHistory, store, state => state.routing);
const routes = {
  path: '/',
  component: IntroView,
  indexRoute: { onEnter: (nextState, replace) => replace('welcome') },
  childRoutes: RootRoutes
};
const RouterFormat = (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
    </div>
  </Provider>
);
export default RouterFormat;
