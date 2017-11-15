import { put, take, call, fork, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import taskManager from '../../task-manager';

export function* createTask(payload) {
  const channel = yield call(subscribe, payload);
  try {
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
    let timer = setInterval(() => {
      emit(action);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  });
}

export default function*() {
  while (true) {
    const { payload, payload: { action } } = yield take('SAGA_POLLING');
    const task = yield fork(createTask, payload);
    yield put(action);
    yield call(taskManager.append, task);
  }
}
