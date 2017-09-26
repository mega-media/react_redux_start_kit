import { call, all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';
import { combineStructor } from '~/core/config';
import containers from './build/containers';

const { reducer, router, saga } = combineStructor.apply(
  null,
  containers.map(config => config.default)
);

export const RootReducer = combineReducers(
  Object.assign(reducer, {
    routing: routerReducer,
    i18nState
  })
);

export const RootRoutes = router.sort((a, b) => b.path.length - a.path.length);

export const RootSagas = Object.keys(saga).reduce((obj, key) => {
  obj[key] = response =>
    function*() {
      yield all(saga[key].map(sagaFunc => call(sagaFunc, response)));
    };
  return obj;
}, {});
