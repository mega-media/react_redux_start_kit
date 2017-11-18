import { curry } from 'ramda';

module.exports = curry((apiCode, opts) => {
  /* 撈出指定的 request */
  const { method, url, body = null, middleware = [] } = opts;

  /* 產出 saga action 格式 */
  return {
    type: 'SAGA_ASYNC',
    payload: {
      apiCode,
      stream: fetch.bind(null, url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method,
        body
      }),
      middleware: middleware instanceof Array ? [...middleware] : [middleware]
    }
  };
});
