/**
 * @flow
 */
import View from './view';
import Reducer from './reducer';
import { storeKey } from './constant';

export default {
  reducers: {
    [storeKey]: Reducer
  },
  router: {
    path: '/flow',
    component: View
  }
};
