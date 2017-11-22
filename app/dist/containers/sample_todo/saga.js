import { put } from 'redux-saga/effects';
import { emit } from '../../core/action/effects';
import { SAVE_LIST } from './constant';

export default {
  [SAVE_LIST]: function*(res) {
    yield put(emit(SAVE_LIST, res));
  }
};
