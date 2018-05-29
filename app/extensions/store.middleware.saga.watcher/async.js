import { take, call, fork, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
/* 任務管理 */
import taskManager from '~/core/store/middleware/saga/task-manager';
/* helper */
import {
  pipeP,
  apply,
  has,
  reduce,
  head,
  keys,
  append,
  map,
  forEach,
  keysIn
} from 'ramda';
/* 這個函式是用來拿 config.js 中字定義的參數 */
import { findCombineConfig } from '~/core/roots';

/* 從 config 中拿 subscribe */
const flattenSaga = reduce(
  (sagaSet, saga) => {
    forEach(key => {
      if (!has(key, sagaSet)) sagaSet[key] = [];

      sagaSet[key] = append(saga[key], sagaSet[key]);
    }, keysIn(saga));
    return sagaSet;
  },
  {},
  findCombineConfig('subscribe')
);

/* 將 saga 轉成想要的格式 */
const rootSagas = reduce(
  (obj, key) => {
    obj[key] = response =>
      function*() {
        yield all(map(sagaFunc => call(sagaFunc, response), flattenSaga[key]));
      };
    return obj;
  },
  {},
  keys(flattenSaga)
);

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
        if (has(apiCode, rootSagas)) emit(rootSagas[apiCode](res));

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
