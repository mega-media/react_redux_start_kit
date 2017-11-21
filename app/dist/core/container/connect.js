/* @flow */
import { connect as reduxConnect } from 'react-redux';
import { pipe, split, path, __ } from 'ramda';
/* type */
import type { Connector } from 'react-redux';
import type { Dispatch } from 'redux';

export type ConnectProps = {
  response: any,
  i18nLang: string,
  dispatchEvent: Dispatch<any>
};

export const resolveStoreKey = (store: Object) => (storeKey: string) => {
  if (!store) return null;
  if (storeKey.includes('.')) {
    const res = pipe(split('.'), path((__: any), store))(storeKey);
    return res === 'undefined' ? null : res;
  } else return typeof store[storeKey] === 'undefined' ? null : store[storeKey];
};

/**
 * 綁定要監聽的store key，當此store內容改變時，會觸發View做處理
 * @param storeKey <null|string|array>
 * @param wrapperComponent
 * @returns {(view:P) => P}
 */
export const connect = (storeKey?: Array<string>) =>
  reduxConnect(
    state => {
      let response = null;
      if (storeKey) {
        switch (storeKey.length) {
          case 0:
            response = null;
            break;
          case 1:
            response = resolveStoreKey(state)(storeKey[0]);
            break;
          default:
            const resolveFunc = resolveStoreKey(state);
            response = storeKey.reduce((returnObj, key) => {
              returnObj[key] = resolveFunc(key);
              return returnObj;
            }, {});
            break;
        }
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
