/**
 * @flow
 */
import View from './view';
import Reducer from './reducer';
import { STORE_KEY } from './constant';

export default {
  reducer: {
    [STORE_KEY]: Reducer
  },
  router: {
    path: '/flow',
    component: View
  }
};
