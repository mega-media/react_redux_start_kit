/**
 * redux-observable 配置
 * @link https://redux-observable-cn.js.org/docs/basics/SettingUpTheMiddleware.html
 */
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { findCombineConfig } from '@core/roots';
import { flatten } from 'ramda';

/* 建立一個 observable middleware */
const observableMiddleware = createEpicMiddleware();

/* 添加執行行為到 __run__ 下，方便 store 引用 */
observableMiddleware.__run__ = () => {
  const rootEpic = combineEpics.apply(null, flatten(findCombineConfig('epic')));
  observableMiddleware.run(rootEpic);
};

export default observableMiddleware;
