const loggerMiddleware = store => next => action => {
  console.log('[REDUX DISPATCHER]: ', action);
  let result = next(action);
  console.log('[REDUX NEXT STATE] : ', store.getState());
  return result;
};

export default loggerMiddleware;
