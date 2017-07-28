/**
 * Created by arShown on 2016/10/13.
 * @flow
 */
import Constant from './Constant';
import type { MemberDataType } from './Type';

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
