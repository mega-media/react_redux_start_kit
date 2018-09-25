import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';
/* build result */
import router from './_router';
import reducer from './_reducer';
import others from './_config';
import locales from './_locale';
import master from './_master';

export const rootReducer = combineReducers({
  ...reducer,
  routing: routerReducer,
  i18nState
});

export const rootRoutes = router.sort((a, b) => b.path.length - a.path.length);

export const rootLocales = locales;

export const rootMaster = master;

export const findCombineConfig = keyName => others[keyName];
