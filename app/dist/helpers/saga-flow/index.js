import { take, call, fork, race, cancel, takeLatest } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { SAGA_ACTION, SAGA_CANCEL } from './constant';
import { RootSagas } from '~/roots';
import response from '../../build/response';
import { isLegal, authResponse, clientTransfer } from './middleware';

export function subscribe({ api, stream }) {
  return eventChannel(emit => {
    /* 發送 api */
    stream()
      .then(response => response.json())
      /* 檢查 api */
      .then(isLegal(api))
      /* 回傳格式轉換 */
      .then(clientTransfer(api))
      /* 重頭戲 */
      .then(res => {
        /* 呼叫定義好的處理 */
        emit(RootSagas[api](res));

        /* 處理完畢，結束這回合 */
        emit(END);
      })
      .catch(err => {
        /* 例外 */
        if ('sagaThrowMessage' in err)
          console.error('[SAGA catch]: ', err['sagaThrowMessage']);
        else {
          /* 不在預料中的其他錯誤 */
          if (!RootSagas[api])
            emit(
              RootSagas[api]({
                code: 0,
                errorMessage: '伺服器連線錯誤',
                time: Date.now()
              })
            );
          else console.error('[SAGA catch]: ', err);
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
