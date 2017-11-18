import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import taskManager from '../task-manager';

function* emitTask(payload) {
  yield put(payload);
}

export default function*() {
  const callChannel = yield actionChannel('SAGA_EMIT');
  try {
    while (true) {
      let { payload } = yield take(callChannel);
      const task = yield fork(emitTask, payload);
      yield call(taskManager.append, task);
    }
  } finally {
    callChannel.close();
  }
}
