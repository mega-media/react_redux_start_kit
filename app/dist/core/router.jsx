import React, { createFactory } from 'react';
/* redux */
import { Provider } from 'react-redux';
/* 多國語系 */
import I18n from 'redux-i18n';
import Locales from '~/locales';
/* router */
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
/* 系統設定 */
import { RootRoutes } from './roots';
import { store, history, DevTools } from './store';
/* helper */
import { merge } from 'ramda';

/**
 * i18nInit  [預設語系，預設為 zh_tw]
 * i18nFallback [未翻譯文字語言，預設為 en]
 * masterComponent [外框架]
 * routerIndex [預設頁面路徑]
 * routerNotFound [not found 路徑，沒有填寫就是預設路徑]
 * routerMiddleware [路由要處理的 middleware]
 */
export default (setting = {}) => {
  const {
    i18nInit,
    i18nFallback,
    masterComponent: Master,
    routerIndex,
    routerNotFound,
    routerMiddleware
  } = merge(
    {
      i18nInit: 'zh_tw',
      i18nFallback: 'en',
      masterComponent: null,
      routerIndex: '/',
      routerNotFound: null,
      routerMiddleware: null
    },
    setting
  );

  /* 預設的路由處理 */
  const routerDefaultMiddleware = () => render => render();

  /* 路由邏輯 */
  const routerLogic = Wrapper => {
    const middleware =
      routerMiddleware === null ? routerDefaultMiddleware : routerMiddleware;
    const renderHandler = routerProps => () =>
      createFactory(Wrapper)(routerProps);
    const redirectHandler = prevPath => path => (
      <Redirect to={{ pathname: path, state: { from: prevPath } }} />
    );

    return (store, routerParams) => routerProps =>
      middleware(store, routerParams)(
        renderHandler(routerProps),
        redirectHandler(routerParams.path)
      );
  };

  const routes = (
    <Switch>
      {RootRoutes.map(({ path, component: Wrapper, ...others }, index) => (
        <Route
          key={`root-route-${index}`}
          path={path}
          render={routerLogic(Wrapper)(store.getState(), { path, ...others })}
        />
      ))}
      <Redirect exact path="/" to={routerIndex} />
      <Redirect path="*" to={routerNotFound || routerIndex} />
    </Switch>
  );

  return (
    <Provider store={store}>
      <div>
        <I18n
          translations={Locales}
          initialLang={i18nInit}
          fallbackLang={i18nFallback}>
          <ConnectedRouter history={history}>
            {Master ? <Master history={history} children={routes} /> : routes}
          </ConnectedRouter>
        </I18n>
        {DevTools ? <DevTools /> : null}
      </div>
    </Provider>
  );
};
