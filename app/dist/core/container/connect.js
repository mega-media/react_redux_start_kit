/* @flow */
import { connect as reduxConnect } from 'react-redux';
/* type */
import type { Connector } from 'react-redux';
import type { Dispatch } from 'redux';

export type ConnectProps = {
  response: any,
  i18nLang: string,
  dispatchEvent: Dispatch<any>
};

export const resolveStoreKey: any = (store: Object, storeKey: string) => {
  if (!store) return null;
  if (storeKey.includes('.')) {
    const strSplitArr = storeKey.split('.');
    const firstSplit = strSplitArr.shift();
    return typeof store[firstSplit] === 'undefined'
      ? null
      : resolveStoreKey(store[firstSplit], strSplitArr.join('.'));
  } else return typeof store[storeKey] === 'undefined' ? null : store[storeKey];
};

/**
 * 綁定要監聽的store key，當此store內容改變時，會觸發View做處理
 * @param storeKey <null|string|array>
 * @param wrapperComponent
 * @returns {(view:P) => P}
 */
export const connect = (storeKey: ?(string | Array<string>)) =>
  reduxConnect(
    state => {
      let response = null;
      if (typeof storeKey === 'string')
        response = resolveStoreKey(state, storeKey);
      else if (Array.isArray(storeKey) || storeKey instanceof Array) {
        response = storeKey.reduce((returnObj, key) => {
          returnObj[key] = resolveStoreKey(state, key);
          return returnObj;
        }, {});
      }
      return { response, i18nLang: state.i18nState.lang };
    },
    (dispatch: Dispatch<any>) => ({ dispatchEvent: dispatch }),
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...dispatchProps,
      ...ownProps
    }),
    {
      pure: true,
      withRef: false
    }
  );
