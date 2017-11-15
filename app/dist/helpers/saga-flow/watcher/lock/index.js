import { take, call, fork, all, cancel } from 'redux-saga/effects';
import taskManager from '../../task-manager';
import { map } from 'ramda';

export default function*(tasks, watchers) {
  while (true) {
    yield take('SAGA_LOCK');
    yield all(map(cancel, tasks));
    yield call(taskManager.clear);

    yield take('SAGA_UNLOCK');
    yield call(watchers);
  }
}
