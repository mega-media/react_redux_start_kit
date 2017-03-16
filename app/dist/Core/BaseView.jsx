/**
 * Created by arShown on 2016/6/22.
 * Updeate on 2017/3/16
 * @flow
 */
import React from "react";
import {connect} from 'react-redux';
import {push, replace, goBack} from 'react-router-redux';
import CSSModules from 'react-css-modules';

import Bootstrap from '@/css/bootstrap.min.css';
import FontAwesome from '@/css/font-awesome.min.css';
import Custom from '@/css/custom.css';

/* flow type declare
 D = DefaultProps
 S = State
 A = Action
 P = Props
 OP = OwnProps
 SP = StateProps
 DP = DispatchProps
 */
import type {Dispatch} from 'redux';

type Context = {
    store:  Object,
}

export default class BaseView<D:any,P:any,S:any> extends React.Component<D,P,S> {
    state:S;
    props:P;
    context:Context;

    static contextTypes:Context = {
        store: React.PropTypes.object,
        socket: React.PropTypes.object
    };

    static defaultProps:D;

    constructor(props:Object, context:Context) {
        super(props, context);
    }

    //==============================================================
    // router
    //==============================================================

    /**
     * 導向目標頁面
     * @param path <string>
     * @param canComeBack <boolean> 允許返回
     */
    redirectTo(path:string, canComeBack:boolean = true):void {
        if (canComeBack)
            this.dispatch(push(path));
        else {
            //不允許返回
            this.dispatch(replace(path));
        }
    }

    /**
     * 返回上一頁
     */
    goBack():void {
        this.dispatch(goBack());
    }

    /**
     * 取得路徑
     * @returns string
     */
    getPathname():string {
        return this.props.location.pathname;
    }

    //==============================================================
    // 資料處理
    // ==============================================================

    /**
     * 取得回傳內容
     * @returns {any}
     */
    getResponse(props?:?P, key?:string):any {
        const {response} = props ? props : this.props;
        if (typeof key !== 'undefined' && response)
            return response[key.includes('.') ? key.replace(/[.]/g, '_') : key] || null;
        else
            return typeof response === "undefined" ? null : response;
    }

    /**
     * @param methods
     */
    dispatch(methods:Object|Promise<any>|Array<Object|Promise<any>>):void {
        if (!("dispatch" in this.props))
            throw new Error("View 必須透過 connectToView 綁定");

        if (typeof methods === "function")
            throw new Error("Methods must be plain objects.");

        if (methods instanceof Array) {
            methods.forEach((method)=> {
                if (typeof method === "function")
                    throw new Error("Method must be plain objects.");
            })
        }

        const {dispatch} = this.props;
        dispatch(methods);
    }

    /**
     * 取得store內容
     * @param storeKey string
     * @returns *
     */
    getState(storeKey?:string):any {
        const states:Object = this.context.store.getState();
        return storeKey ? states[storeKey] || null : states;
    }

    render():any {
        return null;
    }
}

/**
 * 綁定要監聽的store key，當此store內容改變時，會觸發View做處理
 * @param storeKey <string|array>
 * @returns {(view:P) => P}
 */
export function connectToView<P:Object>(storeKey?:string|Array<string>):(view:P) => P {
    const resolveStoreKey:any = (store:Object, storeKey:string) => {
        if (!store)
            return null;
        if (storeKey.includes('.')) {
            const strSplitArr = storeKey.split('.');
            const firstSplit = strSplitArr.shift();
            return (typeof store[firstSplit] === "undefined") ? null : resolveStoreKey(store[firstSplit], strSplitArr.join('.'));
        } else
            return (typeof store[storeKey] === "undefined") ? null : store[storeKey];
    };

    const connector:((view:P) => P) = connect(state => {
            if (typeof storeKey === "string")
                return {response: resolveStoreKey(state, storeKey)};

            if (Array.isArray(storeKey) || storeKey instanceof Array) {
                return storeKey.reduce((returnObj, key)=> {
                    returnObj[key.includes('.') ? key.replace(/[.]/g, '_') : key] = resolveStoreKey(state, key);
                    return returnObj;
                }, {});
            }

            return {response: null}
        },
        (dispatch:Dispatch<{type:string}>) => ({dispatch}),
        (stateProps, dispatchProps, ownProps) => {
            if (Array.isArray(storeKey) || storeKey instanceof Array)
                return Object.assign({}, {
                    response: stateProps
                }, dispatchProps, ownProps);
            else
                return Object.assign({}, stateProps, dispatchProps, ownProps);
        },
        {
            pure: true,
            withRef: false
        });
    return connector;
}

/**
 * CSSModules
 */
export function ApplyStyles(...styles:Array<Object>):CSSModules {
    let stylesObj:Object = Object.assign({}, Bootstrap, FontAwesome, Custom);
    styles.forEach(style => Object.assign(stylesObj, style));
    return CSSModules(stylesObj, {allowMultiple: true, errorWhenNotFound: false});
}