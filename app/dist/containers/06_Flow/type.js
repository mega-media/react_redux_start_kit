/* @flow */
import MemberClass from './class';

/**
 * constant type
 */
export type INSERT = 'FLOW_INSERT';
export type REMOVE = 'FLOW_REMOVE';

/**
 * 個別設定 action 回傳
 * 讓 action 與 reducer 使用，進行語法檢查
 */
export type Action = InsertAction | RemoveAction;
export type InsertAction = { type: INSERT, payload: MemberClass };
export type RemoveAction = {
  type: REMOVE,
  payload: { uid: number }
};

/**
 * reducer 回傳值
 */
export type Store = Array<MemberClass>;
