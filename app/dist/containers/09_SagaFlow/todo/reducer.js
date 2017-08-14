/* @flow */
import { TODO_SAVE } from './constant';
import type { Action, Store } from './type';

export default (state: Store = [], action: Action): Store => {
  switch (action.type) {
    case TODO_SAVE:
      return action.payload;

    default:
      return state;
  }
};
