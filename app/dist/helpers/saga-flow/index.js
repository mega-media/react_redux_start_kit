import { take, call, fork, all, actionChannel } from 'redux-saga/effects';
/* watcher */
import asyncWatch from './watcher/async';
import cancelWatch from './watcher/cancel';
import delayWatch from './watcher/delay';
import lockWatch from './watcher/lock';
import pollingWatch from './watcher/polling';

export function* startCanBeLockedWatch() {
  const tasks = yield all([
    fork(asyncWatch),
    fork(pollingWatch),
    fork(cancelWatch)
  ]);
  yield call(lockWatch, tasks, startCanBeLockedWatch);
}

export default function*() {
  yield all([fork(delayWatch), fork(startCanBeLockedWatch)]);
}
