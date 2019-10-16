import { connect as reduxConnect } from 'react-redux';
import {
  pipe,
  split,
  path,
  __,
  toPairs,
  keys,
  head,
  join,
  reduce,
  assoc,
  is,
  all
} from 'ramda';

export const resolveStoreKey = (store: Object) => (
  storeKey: string | Object
) => {
  if (!store) return null;

  if (storeKey.includes('.')) {
    const res = pipe(
      split('.'),
      path((__: any), store)
    )(storeKey);
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
      let response = {};
      if (storeKey) {
        switch (storeKey.length) {
          case 0:
            //withStore()
            console.warn('withStore 沒有綁定的鍵值');
            response = {};
            break;
          case 1:
            const [inputKeyOrKeys] = storeKey;
            switch (typeof inputKeyOrKeys) {
              case 'string':
                //withStore("")
                response = {
                  [inputKeyOrKeys]: resolveStoreKey(state)(inputKeyOrKeys)
                };
                break;
              case 'object':
                if (inputKeyOrKeys instanceof Array) {
                  //withStore([])
                  response = reduce(
                    (obj, key) => assoc(key, resolveStoreKey(state)(key), obj),
                    {},
                    inputKeyOrKeys
                  );
                } else {
                  //withStore({})
                  response = reduce(
                    (returnObj, key) =>
                      assoc(
                        inputKeyOrKeys[key],
                        resolveStoreKey(state)(key),
                        returnObj
                      ),
                    {},
                    keys(inputKeyOrKeys)
                  );
                }
                break;
            }
            break;
          default:
            // 只允許全字串，當中塞其他格式就彈錯
            if (!all(is(String), storeKey)) {
              throw 'withStore 傳入多筆參數，僅支援字串格式，請檢查程式中使用方式';
              break;
            }
            //withStore("","")
            response = reduce(
              (returnObj, key) =>
                assoc(key, resolveStoreKey(state)(key), returnObj),
              {},
              storeKey
            );
            break;
        }
      }
      return response;
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
