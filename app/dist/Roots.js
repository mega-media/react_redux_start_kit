/**
 * Created by Seven on 2016/7/25.
 * Updated by arShown on 2016/10/10.
 */
import Config from '~/Containers/install';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { combineStructor } from '~/Core/BaseConfig';
const { reducers, router } = combineStructor.apply(
  null,
  Config.map(config => config.default)
);
export const RootReducer = combineReducers(
  Object.assign(reducers, {
    routing: routerReducer
  })
);
export const RootRoutes = router;
