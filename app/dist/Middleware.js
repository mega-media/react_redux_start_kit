export const logger = store => next => action => {
  console.log('[REDUX DISPATCHER]: ', action);
  let result = next(action);
  console.log('[REDUX NEXT STATE] : ', store.getState());
  return result;
};

export const promiseMiddleware = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action);
  }
  return Promise.resolve(action).then(store.dispatch);
};

export const multiDispatchMiddleware = store => next => action => {
  if (Array.isArray(action))
    return action
      .filter(item => item instanceof Object && item.type)
      .map(store.dispatch);
  else return next(action);
};
