/**
 * @flow
 */
import { map, ifElse, propEq, always, identity } from 'ramda';
import MemberClass from '../schema/member';

/**
 * constant type
 */
export type INSERT = 'FLOW_INSERT';
export type UPDATE = 'FLOW_UPDATE';
export type REMOVE = 'FLOW_REMOVE';

/**
 * 個別設定 action 回傳
 * 讓 action 與 reducer 使用，進行語法檢查
 */
export type Action = InsertAction | UpdateAction | RemoveAction;
export type InsertAction = { type: INSERT, payload: MemberClass };
export type UpdateAction = { type: UPDATE, payload: MemberClass };
export type RemoveAction = {
  type: REMOVE,
  payload: { uid: number }
};

/**
 * reducer 回傳值
 */
export type Store = Array<MemberClass>;

export const FLOW_INSERT: INSERT = 'FLOW_INSERT';
export const FLOW_REMOVE: REMOVE = 'FLOW_REMOVE';
export const FLOW_UPDATE: UPDATE = 'FLOW_UPDATE';

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
