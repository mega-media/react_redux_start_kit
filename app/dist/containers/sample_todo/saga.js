import { put } from 'redux-saga/effects';
import { emit } from '../../core/action/effects';
import { API_FETCH_LIST, SAVE_LIST } from './constant';

export default {
  [API_FETCH_LIST]: function*(res) {
    yield put(emit(SAVE_LIST, res));
  }
};
