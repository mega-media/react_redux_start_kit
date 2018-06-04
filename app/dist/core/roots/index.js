import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';
import { combineStructor, validReducer } from './combine';
import buildModules from './build';

const { router, reducer, ...others } = combineStructor.apply(
  null,
  buildModules
);

export const rootReducer = combineReducers({
  ...(!!reducer ? validReducer(reducer) : {}),
  routing: routerReducer,
  i18nState
});

export const rootRoutes = !!router
  ? router.sort((a, b) => b.path.length - a.path.length)
  : [];

export const findCombineConfig = keyName => others[keyName];
