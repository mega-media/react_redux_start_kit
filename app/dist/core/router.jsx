import React from 'react';
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
 * i18n_init  [預設語系，預設為 zh_tw]
 * i18n_fallback [未翻譯文字語言，預設為 en]
 * master_component [外框架]
 * router_index [預設頁面]
 * router_notFound [not found]
 */
export default (setting = {}) => {
  const {
    i18n_init,
    i18n_fallback,
    master_component: Master,
    router_index,
    router_notFound
  } = merge(
    {
      i18n_init: 'zh_tw',
      i18n_fallback: 'en',
      master_component: null,
      router_index: '/',
      router_notFound: null
    },
    setting
  );

  const routes = (
    <Switch>
      {RootRoutes.map((attr, index) => (
        <Route key={`root-route-${index}`} {...attr} />
      ))}
      <Redirect exact path="/" to={router_index} />
      <Redirect path="*" to={router_notFound || router_index} />
    </Switch>
  );

  return (
    <Provider store={store}>
      <div>
        <I18n
          translations={Locales}
          initialLang={i18n_init}
          fallbackLang={i18n_fallback}>
          <ConnectedRouter history={history}>
            {Master ? <Master history={history} children={routes} /> : routes}
          </ConnectedRouter>
        </I18n>
        {DevTools ? <DevTools /> : null}
      </div>
    </Provider>
  );
};
