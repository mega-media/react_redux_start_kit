/* @flow */
import { STORE_KEY } from './constant';
import Reducer from './reducer';
import Saga from './saga';

export default {
  reducers: {
    [STORE_KEY]: Reducer
  },
  sagas: Saga
};
