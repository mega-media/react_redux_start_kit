import { take, call, fork, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { RootSagas } from '~/core/roots';
import { pipeP, apply, identity, has } from 'ramda';
import taskManager from '../task-manager';

export function* asyncTask(payload) {
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

export function subscribe({ apiCode, stream, middleware }) {
  return eventChannel(emit => {
    /* 發送 api */
    stream()
      .then(
        apply(pipeP, [
          response => response.json(),
          /* 自定義 middleware */
          ...middleware
        ])
      )
      /* 重頭戲 */
      .then(res => {
        /* 呼叫定義好的處理 */
        if (has(apiCode, RootSagas)) emit(RootSagas[apiCode](res));

        /* 處理完畢，結束這回合 */
        emit(END);
      })
      .catch(err => {
        /* 例外 */
        console.error('[SAGA catch]: ', err);

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

export default function*() {
  while (true) {
    /* 取得 action 發送的 payload */
    const { payload } = yield take('SAGA_ASYNC');
    /* 開始 api 流程。使用 fork 可將每次呼叫各別獨立處理 */
    const task = yield fork(asyncTask, payload);
    yield call(taskManager.append, task);
  }
}
