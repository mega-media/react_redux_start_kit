/* @flow */
import CSSModules from 'react-css-modules';
import { styleCombine } from '../css-module';

export default (...styles: Array<Object>) => (WrapperComponent: any) =>
  CSSModules(WrapperComponent, styleCombine(...styles), {
    allowMultiple: true
  });
