/* @flow */
import React, { Component } from 'react';
import { _connect1 } from '../connect';
import { objectEqual } from '~/core/helpers/equal';

/* export */
export type StoreProps<S> = {
  storeData: S
};

/* private */
type WrapperComponentProps<S> = React$Component<
  any,
  $Subtype<StoreProps<S>>,
  any
>;
type ConnectProps = {
  CONNECT_RES: any
};

export default (...storeKey: Array<string>) => (WrapperComponent: any) => {
  class StoreClass extends Component<void, ConnectProps, void> {
    props: ConnectProps;

    shouldComponentUpdate(nextProps: ConnectProps) {
      return !objectEqual(nextProps, this.props);
    }

    render() {
      const { CONNECT_RES, ...others } = this.props;
      return <WrapperComponent storeData={CONNECT_RES} {...others} />;
    }
  }

  return _connect1(storeKey)(StoreClass);
};
