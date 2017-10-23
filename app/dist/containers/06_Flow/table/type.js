/**
 * @flow
 */
import type { DispatchProps } from '../../../core/container/hoc/dispatch';
import type { StoreProps } from '../../../core/container/hoc/store';
import type { Store } from '../type';

export type Props = DispatchProps &
  StoreProps<Store> & {
    title: string
  };
