/* @flow */
import { pingEpic } from './epic';
import Reducer from './reducer';
import Index from './';

export default {
  router: {
    path: '/observable',
    component: Index
  },
  reducer: Reducer,
  epic: pingEpic
};
