/* @flow */
import MemberClass from './class';

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
