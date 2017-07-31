/**
 * @flow
 */
import View from './view';
import Reducer from './reducer';
import Constant from './constant';

export default {
  reducers: {
    [Constant.storeKey]: Reducer
  },
  router: {
    path: '/flow',
    component: View
  }
};
