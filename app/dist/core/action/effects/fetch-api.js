import { curry, toUpper, toLower } from 'ramda';

module.exports = curry((apiCode, opts) => {
  /* 撈出指定的 request */
  const { method = 'get', url, body = null, middleware = [] } = opts;

  const upperMethod = toUpper(method);

  /* 產出 saga action 格式 */
  return {
    type: 'SAGA_ASYNC',
    payload: {
      apiCode,
      stream: fetch.bind(null, url, {
        headers: {
          Accept: 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
        method: upperMethod,
        body: upperMethod === 'GET' || upperMethod === 'HEAD' ? null : body
      }),
      middleware: middleware instanceof Array ? [...middleware] : [middleware]
    }
  };
});
