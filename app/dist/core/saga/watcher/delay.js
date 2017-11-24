import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import taskManager from '../task-manager';

function* delayTask({ action, duration }) {
  yield call(delay, duration);
  yield put(action);
}

export default function*() {
  const delayChannel = yield actionChannel('SAGA_DELAY');
  try {
    while (true) {
      let { payload } = yield take(delayChannel);
      const task = yield fork(delayTask, payload);
      yield call(taskManager.append, task);
    }
  } finally {
    delayChannel.close();
  }
}
