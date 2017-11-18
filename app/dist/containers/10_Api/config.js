/* @flow */
import Index from './';
import Reducer from './reducer';
import Saga from './saga';

export default {
  router: {
    path: '/api',
    component: Index
  },
  reducer: Reducer,
  subscribe: Saga
};
