/* @flow */
import { USER_GET } from '~/api/user/constant';
import { fetchApi } from '~/helpers/fetch';
import { USER_SAVE, USER_CHANGE } from './constant';
import type { SaveAction, ChangeAction, UserData } from './type';

export function fetch() {
  return fetchApi(USER_GET);
}

export function save(data: Array<UserData>): SaveAction {
  return {
    type: USER_SAVE,
    payload: data
  };
}

export function changeActive(userId: number): ChangeAction {
  return {
    type: USER_CHANGE,
    payload: userId
  };
}
