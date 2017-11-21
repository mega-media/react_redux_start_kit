/* @flow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, resolveStoreKey } from '../connect';
/* type */
import type { ConnectProps } from '../connect';
/* export */
export type DispatchProps = {
  dispatch: (methods: ActionAPI) => void,
  storeSelector: (storeKey?: string) => any
};

/* private */
type Context = {
  store: Object
};
type Actions = $Subtype<{ type: $Subtype<string> }>;
type PromiseAction = Promise<Actions>;
type ActionAPI = Actions | PromiseAction | Array<Actions | PromiseAction>;
type WrapperComponentProps = React$Component<any, $Subtype<DispatchProps>, any>;

export default (WrapperComponent: Class<WrapperComponentProps>) => {
  class DispatchClass extends PureComponent<void, ConnectProps, void> {
    props: ConnectProps;
    static contextTypes: Context = {
      store: PropTypes.object.isRequired
    };

    /**
     * @param methods
     */
    dispatch = (methods: ActionAPI) => {
      this.props.dispatchEvent(methods);
    };

    /**
     * 取得store內容
     * @param storeKey string
     * @returns *
     */
    getStore = (...storeKeys: Array<string>) => {
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
      const { dispatchEvent, response, i18nLang, ...others } = this.props;
      return (
        <WrapperComponent
          dispatch={this.dispatch}
          storeSelector={this.getStore}
          {...others}
        />
      );
    }
  }

  return connect()(DispatchClass);
};
