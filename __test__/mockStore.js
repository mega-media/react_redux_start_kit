/**
 * @flow
 * @use configureStore([middleware])(defaultStates)
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  promiseMiddleware,
  multiDispatchMiddleware
} from '../app/dist/middleware';

export default configureStore([
  multiDispatchMiddleware,
  promiseMiddleware,
  thunk
]);
