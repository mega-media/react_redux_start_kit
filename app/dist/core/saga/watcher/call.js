import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import taskManager from '../task-manager';

let tempPayload = null;

function* callTask({ func, params }) {
  const action = yield call(func, ...params);
  yield put(action);
}

export default function*() {
  const callChannel = yield actionChannel('SAGA_CALL');
  try {
    while (true) {
      let { payload } = yield take(callChannel);
      const task = yield fork(callTask, payload);
      yield call(taskManager.append, task);
    }
  } finally {
    callChannel.close();
  }
}
