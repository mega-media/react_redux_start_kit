/* @flow */
import { put } from 'redux-saga/effects';
import { USER_GET } from '~/api/user/constant';
import { save } from './action';
import type { User } from '~/api/user/type';

export default {
  [USER_GET]: function*(res: Array<User>) {
    /* 寫入資料 */
    yield put(save(res));
  }
};
