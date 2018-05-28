import { put, take, call, fork, actionChannel } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { requestInterval } from '~/core/helpers/raf-timer';
import taskManager from '../task-manager';

export function* pollingTask(payload) {
  const channel = yield call(subscribe, payload);

  try {
    /* 先執行一次 */
    yield put(payload.action);
    /* 開始 interval 監聽 */
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  } finally {
    channel.close();
  }
}

export function subscribe({ action, interval }) {
  return eventChannel(emit => {
    let request = requestInterval(() => {
      emit(action);
    }, interval);

    return () => {
      request.clear();
    };
  });
}

export default function*() {
  const pollingChannel = yield actionChannel('SAGA_POLLING');
  try {
    while (true) {
      let action = yield take(pollingChannel);
      const { payload } = action;
      const task = yield fork(pollingTask, payload);
      action.task = task;
      yield call(taskManager.append, task);
    }
  } finally {
    pollingChannel.close();
  }
}
