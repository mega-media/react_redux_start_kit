/**
 * Created by arShown on 2016/6/22.
 */
//@flow
import React from "react";
import {connect} from 'react-redux';
import CSSModules from 'react-css-modules';

import Bootstrap from '@/css/bootstrap.min.css';
import FontAwesome from '@/css/font-awesome.min.css';

type Context = {
    router:Object,
    store:Object,
}

export default class BaseView extends React.Component {
    state:any;
    props:Object;
    context:Context;

    static contextTypes:Context = {
        router: React.PropTypes.object,
        store: React.PropTypes.object
    };

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
        if (canComeBack) {
            this.context.router.push(path);
        } else {
            //不允許返回
            this.context.router.replace(path);
        }
    }

    /**
     * 返回上一頁
     */
    goBack():void {
        this.context.router.goBack();
    }

    /**
     * 取得路徑
     * @returns string
     */
    getPathname():string {
        return this.props.route.path;
    }

    /**
     * 取得路徑麵包屑
     * @returns Array
     */
    getBreadcrumbs():Array<string> {
        let routes:Array<Object> = this.props.routes;
        var routesArr:Array<string> = [];
        routes.reduce((routesArr, obj)=> {
            routesArr.push(obj.path);
            return routesArr;
        }, routesArr);
        return routesArr;
    }

    //==============================================================
    // 資料處理
    // ==============================================================

    /**
     * 取得回傳內容
     * @returns {any}
     */
    getResponse():any {
        return this.props.response;
    }

    /**
     * @param methods
     */
    dispatch(methods:Object|Promise<any>):void {
        if (!("dispatch" in this.props))
            throw new Error("View 必須透過 connectToView 綁定");

        if (typeof methods === "function")
            throw new Error("Methods must be plain objects.");

        const {dispatch} = this.props;
        dispatch(methods);
    }

    /**
     * 取得store內容
     * @param storeKey string
     * @returns object|array
     */
    getState(storeKey:string):Object {
        const states:Object = this.context.store.getState();
        return states[storeKey];
    }
}

/**
 * 綁定要監聽的store key，當此store內容改變時，會觸發View做處理
 * @param storeKey <string|array>
 * @returns {Object}
 */
export function connectToView(storeKey?:string|Array<string>):any {
    return connect(state => {
        if (typeof storeKey === "string" && storeKey in state)
            return {response: state[storeKey]};

        if (Array.isArray(storeKey) || storeKey instanceof Array)
            return {
                response: storeKey.reduce((returnObj, key)=> {
                    returnObj[key] = key in state ? state[key] : {};
                    return returnObj;
                }, {})
            };

        return {response: {}}
    }, dispatch => {
        return {dispatch}
    }, (stateProps, dispatchProps, ownProps) => {
        return Object.assign({}, ownProps, stateProps, dispatchProps);
    }, {
        pure: true,
        withRef: false
    });
}

export function ApplyStyles(...styles:Array<Object>):CSSModules {
    let stylesObj:Object = Object.assign({}, Bootstrap, FontAwesome);
    styles.forEach(style => Object.assign(stylesObj, style));
    return CSSModules(stylesObj, {allowMultiple: true, errorWhenNotFound: false});
}
