import { fork, all } from 'redux-saga/effects';
import { values, map } from 'ramda';
/* watcher */
import * as watchers from './watcher';

export default function* startWatch() {
  yield all(map(fork, values(watchers)));
}
