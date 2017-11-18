import { call, all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';
import { combineStructor } from './combine';
import containers from '~/build/containers';

const { reducer, router, subscribe } = combineStructor.apply(
  null,
  containers.map(config => config.default)
);

export const RootReducer = combineReducers({
  ...reducer,
  routing: routerReducer,
  i18nState
});

export const RootRoutes = router.sort((a, b) => b.path.length - a.path.length);

export const RootSagas = Object.keys(subscribe).reduce((obj, key) => {
  obj[key] = response =>
    function*() {
      yield all(subscribe[key].map(sagaFunc => call(sagaFunc, response)));
    };
  return obj;
}, {});
