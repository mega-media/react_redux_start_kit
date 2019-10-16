import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import { values, map } from 'ramda';
/* watcher */
import * as watchers from './watcher';

function* startWatch() {
  yield all(map(fork, values(watchers)));
}

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.__run__ = () => sagaMiddleware.run(startWatch);

export default sagaMiddleware;
