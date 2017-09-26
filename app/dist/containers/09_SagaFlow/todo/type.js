/* @flow */
import type { DispatchProps } from '../../../core/container/hoc/dispatch';
import type { StoreProps } from '../../../core/container/hoc/store';
/**
 * constant type
 */
export type SAVE = 'TODO_SAVE';

/**
 * action type
 */
export type Action = { type: SAVE, payload: Array<TodoData> };

/**
 * todo item
 */
export type TodoData = {
  id: number,
  userId: number,
  title: string,
  completed: boolean
};

/**
 * store type
 */
export type Store = Array<TodoData>;

/**
 * component
 */
export type State = {
  todos: Array<TodoData>,
  visible: 'all' | 'active' | 'completed'
};

export type Props = DispatchProps & StoreProps<Store>;
