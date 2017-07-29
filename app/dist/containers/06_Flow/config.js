/**
 * @flow
 */
import view from './view';
import Reducer from './reducer';
import Constant from './constant';

export default {
  reducers: {
    [Constant.StoreKey]: Reducer
  },
  router: {
    path: 'flow',
    component: view
  }
};
