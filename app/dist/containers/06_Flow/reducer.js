/**
 * @flow
 */
import { FLOW_INSERT, FLOW_UPDATE, FLOW_REMOVE } from './constant';
import { map, ifElse, propEq, always, identity } from 'ramda';
import type { Action, Store } from './type';

export default (state: Store = [], action: Action): Store => {
  switch (action.type) {
    /* 新增資料 */
    case FLOW_INSERT:
      return [...state, action.payload];

    /* 編輯資料 */
    case FLOW_UPDATE:
      return map(
        ifElse(
          propEq('uid', action.payload.uid),
          always(action.payload),
          identity
        )
      )(state);

    /* 移除資料 */
    case FLOW_REMOVE:
      const { uid } = action.payload;
      return [...state].filter(member => member.uid !== uid);

    default:
      return state;
  }
};
