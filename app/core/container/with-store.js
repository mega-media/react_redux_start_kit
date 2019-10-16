/* @flow */
import { Component, createFactory } from 'react';
import { _connect1 } from './_connect';
import type { withStore as HocType } from './_type';

export const storeHoc: HocType = (...storeKey) => WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  class Store extends Component<any, void> {
    render() {
      const { response, ...others } = this.props;
      return factory({
        ...response,
        ...others
      });
    }
  }

  return _connect1(storeKey)(Store);
};

export default storeHoc;
