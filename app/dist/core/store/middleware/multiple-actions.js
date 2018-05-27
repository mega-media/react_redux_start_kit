const multipleActionMiddleware = store => next => action => {
  if (Array.isArray(action))
    return action
      .filter(item => item instanceof Object && item.type)
      .map(store.dispatch);
  else return next(action);
};

export default multipleActionMiddleware;
