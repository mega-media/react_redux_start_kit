import { connect as reduxConnect } from 'react-redux';
import { pipe, split, path, __, toPairs, keys, head, join } from 'ramda';

export const resolveStoreKey = (store: Object) => (
  storeKey: string | Object
) => {
  if (!store) return null;

  if (storeKey.includes('.')) {
    const res = pipe(split('.'), path((__: any), store))(storeKey);
    return res === 'undefined' ? null : res;
  } else return typeof store[storeKey] === 'undefined' ? null : store[storeKey];
};

/**
 * 綁定要監聽的store key，當此store內容改變時，會觸發component做處理
 * @param storeKey Array<string>
 * @param wrapperComponent
 * @returns {(component:P) => P}
 */
export const _connect1 = (storeKey?: Array<string>) =>
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
      return { CONNECT_RES: response };
    },
    null,
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...ownProps
    }),
    {
      pure: true,
      withRef: false
    }
  );

/**
 * 賦予元件 dispatch 操作
 * @param storeKey <null|string|array>
 * @param wrapperComponent
 * @returns {(component:P) => P}
 */
export const _connect2 = (storeKey?: Array<string>) =>
  reduxConnect(
    null,
    dispatch => ({ dispatch }),
    (stateProps, dispatchProps, ownProps) => ({
      ...dispatchProps,
      ...ownProps
    }),
    {
      pure: true,
      withRef: false
    }
  );

/**
 * 多國語系
 * @param storeKey <null|string|array>
 * @param wrapperComponent
 * @returns {(component:P) => P}
 */
export const _connect3 = (storeKey?: Array<string>) =>
  reduxConnect(
    state => ({
      i18nLang: state.i18nState.lang
    }),
    null,
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...ownProps
    }),
    {
      pure: true,
      withRef: false
    }
  );
