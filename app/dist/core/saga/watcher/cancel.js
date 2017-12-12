import { call, fork, cancel, takeLatest, all } from 'redux-saga/effects';
import taskManager from '../task-manager';
import { map, last, find } from 'ramda';

/* 取消特定任務 */
export function* cancelOneQueueSaga({ payload: { action } }) {
  if ('task' in action) yield cancel(action.task);
}

/* 取消所有任務 */
export function* cancelAllQueueSaga() {
  yield all(map(cancel, taskManager.taskQueue));
  yield call(taskManager.clear);
}

/* 取消上一筆任務 */
export function* cancelLatestQueueSaga() {
  if (taskManager.taskQueue.length) {
    yield cancel(last(taskManager.taskQueue));
    yield call(taskManager.pop);
  }
}

export default function*() {
  yield all([
    fork(takeLatest, 'SAGA_CANCEL', cancelOneQueueSaga),
    fork(takeLatest, 'SAGA_CANCEL_ALL', cancelAllQueueSaga),
    fork(takeLatest, 'SAGA_CANCEL_LATEST', cancelLatestQueueSaga)
  ]);
}
