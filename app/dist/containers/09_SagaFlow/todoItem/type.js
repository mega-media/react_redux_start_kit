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
/**
 * view's state type
 * modify [啟用編輯狀態]
 */
export type State = {
  modify: boolean
};
