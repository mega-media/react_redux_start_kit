import { take, call, fork, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
/* helper */
import { pipeP, apply, identity, has } from 'ramda';
/* 包好的 config.subscribe */
import { RootSagas } from '~/core/roots';
/* 任務管理 */
import taskManager from '~/core/store/middleware/saga/task-manager';

/* 任務事件 */
export function* asyncTask(payload) {
  const channel = yield call(subscribe, payload);
  try {
    while (true) {
      /* 從監聽的回傳(emit) */
      let action = yield take(channel);
      /* 執行回傳 */
      yield call(action);
    }
  } finally {
    channel.close();
  }
}

/* 監聽 */
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
    let action = yield take('SAGA_ASYNC');
    const { payload } = action;
    /* 開始 api 流程。使用 fork 可將每次呼叫各別獨立處理 */
    const task = yield fork(asyncTask, payload);
    /* 標記任務 */
    action.task = task;
    /* 添加到任務佇列 */
    yield call(taskManager.append, task);
  }
}
