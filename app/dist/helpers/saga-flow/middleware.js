import response from '../../build/response';
import { RootSagas } from '~/roots';
import { memoize } from 'ramda';

const responseSet = response.reduce(
  (output, req) => Object.assign(output, req.default),
  {}
);

/* 檢查 api 有沒有設定接收處理，並且格式正確 */
export const isLegal = memoize(api => {
  if (!RootSagas[api]) {
    return res => {
      throw { sagaThrowMessage: 'api not be registered : ' + api };
    };
  }
  if (responseSet[api] && typeof responseSet[api] !== 'function') {
    return res => {
      throw { sagaThrowMessage: 'api response 格式錯誤 : ' + api };
    };
  }
  return res => res;
});

/* client 的 response 轉換 */
export const clientTransfer = memoize(
  api => (responseSet[api] ? res => responseSet[api](res) : res => res)
);
