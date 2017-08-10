/* @flow */
/**
 * constant type
 */
export type SAVE = 'TODO_SAVE';

/**
 * action type
 */
export type Action = { type: SAVE, payload: Array<TodoData> };

/**
 * store type
 */
export type TodoData = {
  id: number,
  userId: number,
  title: string,
  completed: boolean
};
export type Store = Array<TodoData>;

/**
 * view's state type
 */
export type State = {
  todos: Array<TodoData>,
  visible: 'all' | 'active' | 'completed'
};
