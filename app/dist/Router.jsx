/**
 * Created by arShown on 2016/6/20.
 * Updated on 2016/10/10.
 */
import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import {RootReducer, RootRoutes} from './Roots';
import {promiseMiddleware, multiDispatchMiddleware} from './Middleware';

// Intro
import IntroView from '~/Containers/00_Intro/View';


/* 系統設置 */
const Constants = require('Config');
// Socket io ========
let store = {};
let DevTools = null;
if (__DEV__) {
    DevTools = require('./Utils/devTools');
    store = createStore(
        RootReducer,
        compose(
            applyMiddleware(multiDispatchMiddleware, promiseMiddleware),
            DevTools.instrument(),
        )
    );
} else {
    store = createStore(
        RootReducer,
        applyMiddleware(multiDispatchMiddleware, promiseMiddleware)
    );
}

const appHistory = useRouterHistory(createHistory)({
    basename: Constants.BASE_PATH,
    queryKey: false
});

const history = syncHistoryWithStore(
    appHistory,
    store,
    (state) => state.router
);

const routes = {
    path: '/',
    component: IntroView,
    indexRoute: {onEnter: (nextState, replace) => replace('welcome')},
    childRoutes: RootRoutes
};

const RouterFormat =
    (
        <Provider store={store}>
            <div>
                <Router history={history} routes={routes}/>
                {(()=> {
                    if (__DEV__) {
                        return <DevTools />
                    }
                })()}
            </div>
        </Provider>
    );

export default RouterFormat;
