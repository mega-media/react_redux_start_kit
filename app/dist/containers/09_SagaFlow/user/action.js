/* @flow */
import { USER_GET } from '~/api/user/constant';
import { fetchApi } from '~/helpers/fetch';
import { USER_SAVE, USER_CHANGE } from './constant';
import type { SaveAction, ChangeAction, UserData } from './type';

/**
 * 發送取得 user 資料 api
 * @returns {*}
 */
export function fetch() {
  return fetchApi(USER_GET);
}

/**
 * 儲存 user 資料
 * @param data
 * @returns {{type: SAVE, payload: Array<UserData>}}
 */
export function save(data: Array<UserData>): SaveAction {
  return {
    type: USER_SAVE,
    payload: data
  };
}

/**
 * 變更選擇的成員
 * @param userId
 * @returns {{type: CHANGE, payload: number}}
 */
export function changeActive(userId: number): ChangeAction {
  return {
    type: USER_CHANGE,
    payload: userId
  };
}
