import { take, call, fork, race, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { SAGA_ACTION, SAGA_CANCEL } from './constant';
import { RootSagas } from '~/roots';

export function subscribe({ api, stream }) {
  return eventChannel(emit => {
    stream.then(response => response.json()).then(res => {
      if (!RootSagas[api]) {
        console.error('api not be registered : ' + api);
      } else emit(RootSagas[api](res));
      emit(END);
    });
    return () => {};
  });
}

export function* asyncFunc(payload) {
  const channel = yield call(subscribe, payload);
  try {
    while (true) {
      let action = yield take(channel);
      yield call(action);
    }
  } finally {
    channel.close();
  }
}

export function* watchAsync() {
  try {
    while (true) {
      const { payload } = yield take(SAGA_ACTION);
      yield race([call(asyncFunc, payload), take(SAGA_CANCEL)]);
    }
  } finally {
    console.debug('watchAsync terminated');
  }
}

export default function*() {
  yield fork(watchAsync);
}
