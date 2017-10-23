/* @flow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../connect';
import type { ConnectProps } from '../connect';
/* export */
export type I18nProps = {
  i18nText: (alias: string, params?: Object) => string,
  i18nLang: string
};

/* private */
type Context = {
  t: (...params: any) => any
};
type WrapperComponentProps = React$Component<any, $Subtype<I18nProps>, any>;

export default (WrapperComponent: Class<WrapperComponentProps>) => {
  class I18nClass extends PureComponent<void, ConnectProps, void> {
    props: ConnectProps;
    static contextTypes: Context = {
      t: PropTypes.func.isRequired
    };

    /**
     * 語系文字
     * @param alias   [語系代號]
     * @param params  [代號參數]
     * @returns string
     */
    i18nText = (alias: string, params?: Object = {}): string => {
      return this.context.t(alias, params);
    };

    render() {
      const { dispatchEvent, response, i18nLang, ...others } = this.props;
      return (
        <WrapperComponent
          i18nText={this.i18nText}
          i18nLang={i18nLang}
          {...others}
        />
      );
    }
  }

  return connect()(I18nClass);
};
