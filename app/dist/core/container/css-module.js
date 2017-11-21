/* @flow */
import CSSModules from 'react-css-modules';
import Bootstrap from '@/css/bootstrap.min.css';
import FontAwesome from '@/css/font-awesome.min.css';
import Shared from '@/css/shared.css';

export const styleCombine = (...styles: Array<Object>) => ({
  ...Bootstrap,
  ...FontAwesome,
  ...Shared,
  ...styles.reduce((obj, style) => ({ ...obj, ...style }), {})
});

/**
 * CSSModules 裝飾用法
 */
export const applyStyles = (...styles: Array<Object>) =>
  CSSModules(styleCombine(...styles), { allowMultiple: true });
