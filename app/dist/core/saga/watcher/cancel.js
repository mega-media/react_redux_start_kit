import { call, fork, cancel, takeLatest, all } from 'redux-saga/effects';
import taskManager from '../task-manager';
import { map, last } from 'ramda';

/* 取消 api 任務 */
export function* cancelAllQueueSaga() {
  yield all(map(cancel, taskManager.taskQueue));
  yield call(taskManager.clear);
}

/* 取消 上一筆 api 任務 */
export function* cancelLatestQueueSaga() {
  if (taskManager.taskQueue.length) {
    yield cancel(last(taskManager.taskQueue));
    yield call(taskManager.pop);
  }
}

export default function*() {
  yield all([
    fork(takeLatest, 'SAGA_CANCEL', cancelAllQueueSaga),
    fork(takeLatest, 'SAGA_CANCEL_LATEST', cancelLatestQueueSaga)
  ]);
}
