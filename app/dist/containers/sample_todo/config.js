import Reducer from './reducer';
import Index from './';
import Saga from './saga';

export default {
  router: {
    path: '/todo',
    component: Index
  },
  reducer: Reducer,
  subscribe: Saga
};
