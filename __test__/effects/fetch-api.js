import { objectEqual } from '~/core/helpers/equal';

module.exports = (apiCode, opts) => action => {
  const { type: fetchType, payload: { apiCode: actionCode }, meta } = action;
  if (fetchType !== 'SAGA_ASYNC') return false;

  const { method = 'get', url, body = null, middleware = [] } = opts;
  return (
    actionCode === apiCode &&
    objectEqual(meta, { method, url, body, middlewareLens: middleware.length })
  );
};
