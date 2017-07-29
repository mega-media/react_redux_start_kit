import Config from '~/Containers/install';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';
import { combineStructor } from '~/Core/BaseConfig';
const { reducers, router } = combineStructor.apply(
  null,
  Config.map(config => config.default)
);
export const RootReducer = combineReducers(
  Object.assign(reducers, {
    routing: routerReducer,
    i18nState
  })
);
export const RootRoutes = router;
