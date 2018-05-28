/* @flow */
import { Component, createFactory } from 'react';
import { _connect1 } from './_connect';
import { objectEqual } from '~/core/helpers/equal';
import type { withStore as HocType } from './_type';

export const pureStoreHoc: HocType = (...storeKey) => WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  class PureStore extends Component<any, void> {
    shouldComponentUpdate(nextProps) {
      return !objectEqual(nextProps, this.props);
    }

    render() {
      const { CONNECT_RES, ...others } = this.props;
      return factory({
        storeData: CONNECT_RES,
        ...others
      });
    }
  }

  return _connect1(storeKey)(PureStore);
};

export default pureStoreHoc;
