/**
 * @flow
 */
import { FLOW_INSERT, FLOW_REMOVE } from './constant';
import type { Action, Store } from './type';

export default (state: Store = [], action: Action): Store => {
  switch (action.type) {
    /* 新增資料 */
    case FLOW_INSERT:
      return [...state, action.payload];

    /* 移除資料 */
    case FLOW_REMOVE:
      const { uid } = action.payload;
      const newState = [...state];
      return newState.filter(member => member.uid !== uid);

    default:
      return state;
  }
};
