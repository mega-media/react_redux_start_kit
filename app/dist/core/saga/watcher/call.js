import { put, take, call, fork, actionChannel } from 'redux-saga/effects';

function* callTask({ func, params }) {
  const action = yield call(func, ...params);
  yield put(action);
}

export default function*() {
  const callChannel = yield actionChannel('SAGA_CALL');
  try {
    while (true) {
      const { payload } = yield take(callChannel);
      yield fork(callTask, payload);
    }
  } finally {
    callChannel.close();
  }
}
