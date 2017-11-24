import { take, call, fork, all, actionChannel } from 'redux-saga/effects';
/* watcher */
import asyncWatch from './watcher/async';
import callWatch from './watcher/call';
import cancelWatch from './watcher/cancel';
import delayWatch from './watcher/delay';
import lockWatch from './watcher/lock';
import pollingWatch from './watcher/polling';

export default function* startWatch() {
  const tasks = yield all([
    fork(delayWatch),
    fork(callWatch),
    fork(asyncWatch),
    fork(pollingWatch),
    fork(cancelWatch)
  ]);
  yield call(lockWatch, tasks, startWatch);
}
