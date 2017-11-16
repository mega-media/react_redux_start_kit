/**
 * 產生 saga action 格式內容
 */
import { API_HOST } from 'Config';
import requests from '~/build/request';

const apiSet = requests.reduce(
  (output, req) => Object.assign(output, req.default),
  {}
);

/**
 * 格式檢查
 * @param api
 * @param args
 * @private
 */
function _validate(api, ...args) {
  if (!apiSet[api]) throw '找不到指定的 api :' + api;
  if (typeof apiSet[api] !== 'function') throw 'api 參數宣告必須為方法 :' + api;
  const apiObject = apiSet[api](...args);
  if (!('method' in apiObject)) throw '缺少 method 參數：' + api;
  if (!('path' in apiObject)) throw '缺少 path 參數：' + api;
  if (!['get', 'post', 'put', 'delete'].includes(apiObject['method']))
    throw 'method 格式錯誤' + api;
}

/**
 * 從設定的 request，帶入 saga action
 * @param api   [API 代碼]
 * @param args  [傳入request 的參數]
 * @returns {{type: SAGA_ASYNC, payload: {api: string, stream: Promise<*>}}}
 */
module.exports = (api, ...args) => {
  /* 錯誤檢查 */
  _validate(api, ...args);
  /* 撈出指定的 request */
  const {
    protocol = 'http',
    host = API_HOST,
    method,
    path,
    body = null
  } = apiSet[api](...args);

  /* 產出 saga action 格式 */
  return {
    type: 'SAGA_ASYNC',
    payload: {
      api,
      stream: fetch.bind(null, `${protocol}://${host}${path}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method,
        body
      })
    }
  };
};
