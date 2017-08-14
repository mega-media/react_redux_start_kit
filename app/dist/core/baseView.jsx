/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
/* stylesheets */
import CSSModules from 'react-css-modules';
import Bootstrap from '@/css/bootstrap.min.css';
import FontAwesome from '@/css/font-awesome.min.css';
import Custom from '@/css/custom.css';
/* type */
import type { Connector } from 'react-redux';
import type { Dispatch } from 'redux';
/* flow type declare
 D = DefaultProps
 S = State
 A = Action
 P = Props
 OP = OwnProps
 SP = StateProps
 DP = DispatchProps
 */
type Context = {
  store: Object,
  t: (...params: any) => any
};
export default class BaseView<D: any, P: any, S: any> extends React.Component<
  D,
  P,
  S
> {
  state: S;
  props: P;
  context: Context;
  static contextTypes: Context = {
    store: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };
  static defaultProps: D;

  constructor(props: P, context: Context) {
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
  redirectTo = (path: string, canComeBack: boolean = true): void => {
    if (canComeBack) this.dispatch(push(path));
    else {
      //不允許返回
      this.dispatch(replace(path));
    }
  };

  /**
   * 返回上一頁
   */
  goBack = (): void => {
    this.dispatch(goBack());
  };
  //==============================================================
  // 資料處理
  // ==============================================================
  /**
   * 取得回傳內容
   * @returns {any}
   */
  getResponse = (props?: ?P, key?: string): any => {
    const { response } = props ? props : this.props;
    if (typeof key !== 'undefined' && response)
      return (
        response[key.includes('.') ? key.replace(/[.]/g, '_') : key] || null
      );
    else return typeof response === 'undefined' ? null : response;
  };

  /**
   * @param methods
   */
  dispatch = (
    methods: Object | Promise<any> | Array<Object | Promise<any>>
  ): void => {
    if (!('dispatch' in this.props))
      throw new Error('View 必須透過 connectToView 綁定');
    if (typeof methods === 'function')
      throw new Error('Methods must be plain objects.');
    if (methods instanceof Array) {
      methods.forEach(method => {
        if (typeof method === 'function')
          throw new Error('Method must be plain objects.');
      });
    }
    const { dispatch } = this.props;
    dispatch(methods);
  };

  /**
   * 取得store內容
   * @param storeKey string
   * @returns *
   */
  getState = (storeKey?: string): any => {
    const states: Object = this.context.store.getState();
    return storeKey ? states[storeKey] || null : states;
  };

  /**
   * 語系文字
   * @param alias   [語系代號]
   * @param params  [代號參數]
   * @returns string
   */
  i18nText = (alias: string, params?: Object = {}): string => {
    return this.context.t(alias, params);
  };

  /**
   * 使用語系
   * @returns string
   */
  i18nLang = (): string => {
    if (!('i18nLang' in this.props))
      throw new Error('View 必須透過 connectToView 綁定');
    return this.props.i18nLang;
  };

  render(): any {
    return null;
  }
}

/**
 * 綁定要監聽的store key，當此store內容改變時，會觸發View做處理
 * @param storeKey <null|string|array>
 * @param wrapperComponent
 * @returns {(view:P) => P}
 */

export function connect<P>(
  storeKey: ?(string | Array<string>)
): (view: P) => P {
  const resolveStoreKey: any = (store: Object, storeKey: string) => {
    if (!store) return null;
    if (storeKey.includes('.')) {
      const strSplitArr = storeKey.split('.');
      const firstSplit = strSplitArr.shift();
      return typeof store[firstSplit] === 'undefined'
        ? null
        : resolveStoreKey(store[firstSplit], strSplitArr.join('.'));
    } else
      return typeof store[storeKey] === 'undefined' ? null : store[storeKey];
  };

  const connector: any = reduxConnect(
    state => {
      let response = null;
      if (typeof storeKey === 'string')
        response = resolveStoreKey(state, storeKey);
      else if (Array.isArray(storeKey) || storeKey instanceof Array) {
        response = storeKey.reduce((returnObj, key) => {
          returnObj[
            key.includes('.') ? key.replace(/[.]/g, '_') : key
          ] = resolveStoreKey(state, key);
          return returnObj;
        }, {});
      }
      return { response, i18nLang: state.i18nState.lang };
    },
    (dispatch: Dispatch<{ type: string }>) => ({ dispatch }),
    (stateProps, dispatchProps, ownProps) =>
      Object.assign({}, stateProps, dispatchProps, ownProps),
    {
      pure: true,
      withRef: false
    }
  );
  return connector;
}

/**
 * CSSModules 裝飾用法
 */
export const applyStyles = (...styles: Array<Object>) => {
  let stylesObj: Object = Object.assign({}, Bootstrap, FontAwesome, Custom);
  styles.forEach(style => Object.assign(stylesObj, style));
  return CSSModules(stylesObj, {
    allowMultiple: true
  });
};

/**
 * CSSModules 作為一般方法呼叫
 */
export function applyStylesByFunction<
  D,
  P,
  S,
  C: Class<React$Component<D, P, S>>
>(wrapperComponent: C, ...styles: Array<Object>) {
  let stylesObj: Object = Object.assign({}, Bootstrap, FontAwesome, Custom);
  styles.forEach(style => Object.assign(stylesObj, style));
  return CSSModules(wrapperComponent, stylesObj, {
    allowMultiple: true
  });
}
