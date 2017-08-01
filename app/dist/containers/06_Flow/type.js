/* @flow */
import MemberClass from './class';
import { FLOW_INSERT, FLOW_REMOVE } from './constant';

/**
 * 個別設定 action 回傳
 * 讓 action 與 reducer 使用，進行語法檢查
 */
export type Action = InsertAction | RemoveAction;
export type InsertAction = { type: typeof FLOW_INSERT, payload: MemberClass };
export type RemoveAction = {
  type: typeof FLOW_REMOVE,
  payload: { uid: number }
};

/**
 * reducer 回傳值
 */
export type Store = Array<MemberClass>;
