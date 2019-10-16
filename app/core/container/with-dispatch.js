/* @flow */
import { Component, createFactory } from 'react';
import PropTypes from 'prop-types';
import { _connect2, resolveStoreKey } from './_connect';
import type { withDispatch as HocType } from './_type';

const dispatchHoc: HocType = WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  class Dispatch extends Component<any, void> {
    static contextTypes = {
      store: PropTypes.object
    };

    /**
     * 取得store內容
     * @param storeKey string
     * @returns *
     */
    getStore = (...storeKeys) => {
      switch (storeKeys.length) {
        case 0:
          return this.context.store.getState();
        case 1:
          return resolveStoreKey(this.context.store.getState())(storeKeys[0]);
        default:
          const resolveFunc = resolveStoreKey(this.context.store.getState());
          return storeKeys.map(key => resolveFunc(key));
      }
    };

    render() {
      return factory({
        ...this.props,
        storeSelector: this.getStore
      });
    }
  }

  return _connect2()(Dispatch);
};

export default dispatchHoc;
