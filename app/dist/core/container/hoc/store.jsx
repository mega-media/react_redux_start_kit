/* @flow */
import React, { Component } from 'react';
import { _connect1 } from '../connect';

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
  response: any
};

export default (...storeKey: Array<string>) => (WrapperComponent: any) => {
  class StoreClass extends Component<void, ConnectProps, void> {
    props: ConnectProps;

    render() {
      const { response, ...others } = this.props;
      return <WrapperComponent storeData={response} {...others} />;
    }
  }

  return _connect1(storeKey)(StoreClass);
};
