import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 redux-observable</h5>
      <h5>☆ 核心思想 - Epic</h5>
      <h5>☆ 如何在專案中使用</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>
        ☆{' '}
        <a
          href="https://github.com/redux-observable/redux-observable"
          target="_blank"
        >
          redux-observable
        </a>
      </h5>
      <div>
        <ul>
          <li>
            以 RxJS 6 為基礎的 middleware(入坑之前建議先摸一下{' '}
            <a href="https://github.com/ReactiveX/rxjs" target="_blank">
              RxJS
            </a>
            )
          </li>
          <li>可處理複雜的非同步邏輯，有效管理 side effect</li>
        </ul>
      </div>
      <h5>☆ 核心思想 - Epic</h5>
      <div>
        <ul>
          <li>一個函式</li>
          <li>
            接收 actions 作為參數並返回 actions ( actions 入, actions 出 )
          </li>
          <li>
            需要注意的是：
            <label>如果傳入與傳出的 action 相同，將會造成無限循環</label>
          </li>
        </ul>
      </div>
      <h5>☆ 如何在專案中使用</h5>
      <div>
        <ul>
          <li>
            在專案模組位置 app/src/storage/epics/ 新增 epic 檔案
            <pre className="prettyprint">{`//app/src/storage/epics/observable.js
import { delay, mapTo } from 'rxjs/operators';

export const pingEpic = action$ =>
  action$.ofType('PING').pipe(
    delay(1000),
    mapTo({ type: 'PONG' })
  );

/* 最後輸出使用陣列格式 */
export default [pingEpic];

`}</pre>
          </li>
        </ul>
      </div>
    </div>
  )
};
