import { take, call, fork, race, cancel, takeLatest } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { SAGA_ACTION, SAGA_CANCEL } from './constant';
import { RootSagas } from '~/roots';

export function subscribe({ api, stream }) {
  return eventChannel(emit => {
    /* 發送 api */
    stream().then(response => response.json()).then(res => {
      /* 查詢有沒有回傳處理 */
      if (!RootSagas[api]) {
        /* 沒有：跳出錯誤 */
        console.error('api not be registered : ' + api);
      } else {
        /* 有：執行處理 */
        emit(RootSagas[api](res));
      }
      /* 處理完畢，結束這回合 */
      emit(END);
    });
    /* eventChannel 結束時要回傳一個方法 */
    return () => {
      /* 沒有想做的事情 */
      /* console.log("eventChannel finish."); */
    };
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
      /* 取得 action 發送的 payload */
      const { payload = null } = yield take(SAGA_ACTION);
      if (!payload) throw 'SAGA_ACTION 格式錯誤';
      /* 開始 api 流程。使用 fork 可將每次呼叫各別獨立處理 */
      const task = yield fork(asyncFunc, payload);
      /* 開另一個 saga 支線監聽 SAGA_CANCEL 的呼叫 */
      yield fork(takeLatest, SAGA_CANCEL, cancelQueueSaga, task);
    }
  } finally {
    console.debug('watchAsync terminated');
  }
}

export function* cancelQueueSaga(task) {
  /* 取消 api 任務 */
  yield cancel(task);
}

export default function*() {
  /* 開始監聽 api 的呼叫 */
  yield call(watchAsync);
}
