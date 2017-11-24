import React, { Component } from 'react';
import { _connect1 } from '../connect';
import { equals } from 'ramda';
import { objectEqual, arrayEqual } from '~/core/helpers/equal';

/* export */
export type StoreProps<S> = {
  storeData: S
};

/* private */
type ConnectProps = {
  response: any
};

export default (
  storeKey: string,
  handler: (ownProps: Object) => (response: any) => void
) => (WrapperComponent: any) => {
  class StoreHandler extends Component<void, ConnectProps, void> {
    props: ConnectProps;

    constructor(props: ConnectProps) {
      super(props);
      const { response } = props;
      this.equalFunction =
        response instanceof Array
          ? arrayEqual
          : response instanceof Object ? objectEqual : equals;
    }

    componentWillReceiveProps(nextProps) {
      if (!this.equalFunction(this.props.response, nextProps.response))
        handler(nextProps)(nextProps.response);
    }

    render() {
      const { response, ...others } = this.props;
      return <WrapperComponent storeData={response} {...others} />;
    }
  }

  return _connect1([storeKey])(StoreHandler);
};
