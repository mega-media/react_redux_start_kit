/* @flow */
import CSSModules from 'react-css-modules';
import { styleCombine } from './_css-module';
import type { withStyle as HocType } from './_type';

/**
 * CSSModules 裝飾用法
 */
export const styleDecorator = (...styles: Array<Object>) =>
  CSSModules(styleCombine(...styles), { allowMultiple: true });

export default styleDecorator;
