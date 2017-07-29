/**
 * @flow
 */
import Constant from './constant';
import type { MemberDataType } from './type';

/**
 * 新增資料
 * @param data
 * @returns {{type: null, data: MemberDataType}}
 */
export function add(
  data: MemberDataType
): { type: string, data: MemberDataType } {
  return {
    type: Constant.FLOW_INSERT,
    data
  };
}

/**
 * 刪除資料
 * @param uid
 * @returns {{type: null, uid: number}}
 */
export function remove(uid: number): { type: string, uid: number } {
  return {
    type: Constant.FLOW_REMOVE,
    uid
  };
}