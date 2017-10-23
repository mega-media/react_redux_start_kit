/* @flow */
import type { DispatchProps } from '../../../core/container/hoc/dispatch';

export type Props = DispatchProps;

export type State = {
  uid: number,
  name: string,
  gender: 'female' | 'male',
  married: boolean
};
