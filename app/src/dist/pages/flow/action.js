/**
 * @flow
 */
import MemberClass from '../../../storage/schema/member';
import {
  FLOW_INSERT,
  FLOW_REMOVE,
  FLOW_UPDATE
} from '../../../storage/reducers/flow';
import type {
  InsertAction,
  UpdateAction,
  RemoveAction
} from '../../../storage/reducers/flow';

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
 * 修改資料
 * @param payload
 * @returns {{type: FLOW_UPDATE, payload: MemberClass}}
 */
export function update(payload: MemberClass): UpdateAction {
  return {
    type: FLOW_UPDATE,
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
