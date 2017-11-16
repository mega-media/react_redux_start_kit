import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import taskManager from '../task-manager';

function* callTask({ func }) {
  const action = yield call(func);
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
