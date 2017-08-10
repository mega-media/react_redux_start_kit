/* @flow */
import { put } from 'redux-saga/effects';
import { USER_GET } from '~/api/user/constant';
import { save } from './action';
import type { User } from '~/api/user/response';

export default {
  [USER_GET]: function*(res: Array<User>) {
    yield put(save(res.map(({ id, name }) => ({ id, name }))));
  }
};
