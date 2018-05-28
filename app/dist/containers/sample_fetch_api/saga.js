/* @flow */
import { put } from 'redux-saga/effects';
import { save } from './action';
import { API_USER_LIST } from './constant';
import { map, pickAll } from 'ramda';
import type { ResponseType } from './type';

export default {
  [API_USER_LIST]: function*(res: ResponseType) {
    yield put(save(map((pickAll(['id', 'name']): any))(res)));
  }
};
