/* @flow */
import type { DispatchProps } from '~/core/container/hoc/dispatch';
import type { StoreProps } from '~/core/container/hoc/store';

/**
 * constant type
 */
export type SAVE = 'SAGA_SAVE';

/**
 * api response
 */
export type ResponseType = Array<{
  id: number,
  name: string,
  username: string,
  email: string
}>;

/**
 * action
 */
export type SaveAction = {
  type: SAVE,
  payload: {
    items: Array<Item>
  }
};

export type Actions = SaveAction;

/**
 * store
 */
export type Item = {
  id: number,
  name: string
};

export type Store = {
  items: Array<Item>
};

/**
 * component
 */
export type Props = DispatchProps & StoreProps<Store>;
