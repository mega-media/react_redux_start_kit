/* @flow */
import type { TodoData } from '../todo/type';
/**
 * view's props type
 */
export type Props = {
  todo: TodoData,
  removeHandler: () => void,
  updateHandler: (columns: {
    title?: string,
    completed?: boolean
  }) => void
};

export type State = {
  modify: boolean
};
