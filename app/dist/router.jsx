/* @flow */
import React from 'react';
/* redux */
import { Provider } from 'react-redux';

/* 多國語系 */
import I18n from 'redux-i18n';
import Locales from './locales';

/* router */
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

/* 系統設定 */
import { RootRoutes } from '~/core/roots';
import { store, history, DevTools } from '~/core/store';

// Intro
import IntroView from '~/containers/00_Intro/view';

/**
 * I18n opts
 * translations [語系檔]
 * initialLang  [預設語系]
 * fallbackLang [未翻譯文字語言]
 */
const RouterFormat = (
  <Provider store={store}>
    <div>
      <I18n translations={Locales} initialLang="zh_tw" fallbackLang="en">
        <ConnectedRouter history={history}>
          <IntroView history={history}>
            <Switch>
              {RootRoutes.map(({ path, component }) =>
                <Route path={path} key={path} component={component} />
              )}
              <Redirect path="*" to="/welcome" />
            </Switch>
          </IntroView>
        </ConnectedRouter>
      </I18n>
      {DevTools ? <DevTools /> : null}
    </div>
  </Provider>
);

export default RouterFormat;
