/* @flow */
import Localize from 'redux-i18n/dist/hoc/index';
import type { Props } from './Type';

const LocaleHoc = (WrappedComponent: Class<React$Component<any, Props, any>>) =>
  Localize('i18nText')(WrappedComponent);

export default LocaleHoc;
