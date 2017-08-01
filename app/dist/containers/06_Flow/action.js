/**
 * @flow
 */
import MemberClass from './class';
import { FLOW_INSERT, FLOW_REMOVE } from './constant';
import type { InsertAction, RemoveAction } from './type';

/**
 * 新增資料
 * @param payload
 * @returns {{type: FLOW_INSERT, payload: MemberClass}}
 */
export function add(payload: MemberClass): InsertAction {
  return {
    type: FLOW_INSERT,
    payload
  };
}

/**
 * 刪除資料
 * @param uid
 * @returns {{type: FLOW_REMOVE, payload:{uid: number}}}
 */
export function remove(uid: number): RemoveAction {
  return {
    type: FLOW_REMOVE,
    payload: {
      uid
    }
  };
}
