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

/**
 * config.js 除了 router 、reducer
 * 還能夠自訂額外參數，此章節定義一個名為 subscribe 的資料
 *
 * subscribe 在 app/extensions/store.middleware.saga.watcher/async.js 檔案中被使用
 *
 */
