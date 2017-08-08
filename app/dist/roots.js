import install from '~/containers/install';
import { call, all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';
import { combineStructor } from '~/core/baseConfig';

const { reducers, router, sagas } = combineStructor.apply(
  null,
  install.map(config => config.default)
);

export const RootReducer = combineReducers(
  Object.assign(reducers, {
    routing: routerReducer,
    i18nState
  })
);

export const RootRoutes = router;

export const RootSagas = Object.keys(sagas).reduce((obj, key) => {
  obj[key] = response =>
    function*() {
      yield all(sagas[key].map(sagaFunc => call(sagaFunc, response)));
    };
  return obj;
}, {});
