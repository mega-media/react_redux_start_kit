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
  response: any
};

export default (...storeKey: Array<string>) => (WrapperComponent: any) => {
  class StoreClass extends Component<void, ConnectProps, void> {
    props: ConnectProps;

    shouldComponentUpdate({ response }: ConnectProps) {
      return !objectEqual({ response: this.props.response }, { response });
    }

    render() {
      const { response, ...others } = this.props;
      return <WrapperComponent storeData={response} {...others} />;
    }
  }

  return _connect1(storeKey)(StoreClass);
};
