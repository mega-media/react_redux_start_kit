import styleSheets from './_assets';
import { reduce, merge, concat } from 'ramda';

export const styleCombine = (...styles: Array<Object>) =>
  reduce(merge, {}, concat(styleSheets, styles));
