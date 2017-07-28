import React from 'react';
/* redux */
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
/* 多國語系 */
import I18n from 'redux-i18n';
import Locale from './Locale';
/* router */
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
/* 系統設定 */
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
/**
 * I18n opts
 * translations [語系檔]
 * initialLang  [預設語系]
 * fallbackLang [未翻譯文字語言]
 */
const RouterFormat = (
  <Provider store={store}>
    <I18n translations={Locale} initialLang="zh_tw" fallbackLang="en">
      <div>
        <Router history={history} routes={routes} />
        {DevTools ? <DevTools /> : null}
      </div>
    </I18n>
  </Provider>
);
export default RouterFormat;
