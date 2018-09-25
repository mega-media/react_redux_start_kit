/* @flow */
import CSSModules from 'react-css-modules';
import { styleCombine } from './_css-module';
import type { withStyle as HocType } from './_type';

export const styleHoc: HocType = (...styles) => WrapperComponent =>
  CSSModules(WrapperComponent, styleCombine(...styles), {
    allowMultiple: true
  });

export default styleHoc;
