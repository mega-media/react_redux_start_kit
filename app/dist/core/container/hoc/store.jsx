/* @flow */
import React, { PureComponent } from 'react';
import { connect } from '../connect';
import type { ConnectProps } from '../connect';

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

export default (...storeKey: Array<string>) => <S>(
  WrapperComponent: Class<WrapperComponentProps<S>>
) => {
  class StoreClass extends PureComponent<void, ConnectProps, void> {
    props: ConnectProps;

    render() {
      const { dispatchEvent, response, i18nLang, ...others } = this.props;
      return <WrapperComponent storeData={response} {...others} />;
    }
  }

  return connect(storeKey)(StoreClass);
};
