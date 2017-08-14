/* @flow */
import { USER_SAVE, USER_CHANGE } from './constant';
import type { Action, Store } from './type';

export default (
  state: Store = { activeUserId: 0, users: [] },
  action: Action
): Store => {
  switch (action.type) {
    case USER_SAVE:
      return { activeUserId: state.activeUserId, users: action.payload };

    case USER_CHANGE:
      return { activeUserId: action.payload, users: state.users };

    default:
      return state;
  }
};
