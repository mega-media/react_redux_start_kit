import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { findCombineConfig } from '~/core/roots';
/* 從 config 中取值 */
const rootEpic = combineEpics.apply(null, findCombineConfig('epic'));

const observableMiddleware = createEpicMiddleware();
observableMiddleware.__run__ = () => observableMiddleware.run(rootEpic);

export default observableMiddleware;
