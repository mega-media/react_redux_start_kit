/* @flow */
import CSSModules from 'react-css-modules';
import Bootstrap from '@/css/bootstrap.min.css';
import FontAwesome from '@/css/font-awesome.min.css';
import Shared from '@/css/shared.css';

/**
 * CSSModules 裝飾用法
 */
export const applyStyles = (...styles: Array<Object>) => {
  let stylesObj: Object = {
    ...Bootstrap,
    ...FontAwesome,
    ...Shared,
    ...styles.reduce((obj, style) => ({ ...obj, ...style }), {})
  };
  return CSSModules(stylesObj, {
    allowMultiple: true
  });
};

/**
 * CSSModules 作為一般方法呼叫
 */
export const applyStylesInline = (...styles: Array<Object>) => <
  D,
  P,
  S,
  C: Class<React$Component<D, P, S>>
>(
  wrapperComponent: C
) => {
  let stylesObj: Object = {
    ...Bootstrap,
    ...FontAwesome,
    ...Shared,
    ...styles.reduce((obj, style) => ({ ...obj, ...style }), {})
  };
  return CSSModules(wrapperComponent, stylesObj, {
    allowMultiple: true
  });
};
