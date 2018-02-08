/* @flow */
import React, { Component } from 'react';
import { setLanguage } from 'redux-i18n';
import PropTypes from 'prop-types';
import { _connect3 } from '../connect';
import type { ActionAPI } from './dispatch';

/* export */
export type I18nProps = {
  i18nText: (alias: string, params?: Object) => string,
  i18nLang: string
};

/* private */
type Context = {
  t: (...params: any) => any
};
type ConnectProps = {
  i18nLang: string
};

export default (WrapperComponent: any) => {
  class I18nClass extends Component<void, ConnectProps, void> {
    props: ConnectProps;
    static contextTypes: Context = {
      t: PropTypes.func.isRequired
    };

    /**
     * 改變語系
     * @param dispatch
     */
    setLang = (dispatch: ActionAPI => void) => (lang: string) => {
      dispatch(setLanguage(lang));
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
      const { i18nLang, ...others } = this.props;
      return (
        <WrapperComponent
          i18nText={this.i18nText}
          i18nLang={i18nLang}
          {...others}
        />
      );
    }
  }

  return _connect3()(I18nClass);
};
