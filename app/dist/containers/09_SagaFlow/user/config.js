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

/**
 * 將 saga 檔案寫入 sagas 參數，即可綁定監聽的 API 回傳行為
 */
