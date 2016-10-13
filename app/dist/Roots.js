/**
 * Created by Seven on 2016/7/25.
 * Updated by arShown on 2016/10/10.
 */
import Config from '~/Containers/install';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const {reducersObject, childRoutesArr} = Config.reduce((prev, {default: {reducers={}, router}}) => {
    if (Object.keys(reducers).length) Object.assign(prev['reducersObject'], reducers);
    let childRoutesArr = prev['childRoutesArr'];
    if (!Array.isArray(router)) {
        childRoutesArr.push(router);
    } else {
        childRoutesArr = childRoutesArr.concat(router);
    }
    return prev
}, {reducersObject: {}, childRoutesArr: [], rootSagas: {}});

export const RootReducer = combineReducers(Object.assign(reducersObject, {
    routing: routerReducer
}));
export const RootRoutes = childRoutesArr;
