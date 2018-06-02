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
          target="_blank">
          redux-observable
        </a>
      </h5>
      <div>
        <ul>
          <li>
            以 RxJS 5 為基礎的 middleware(入坑之前建議先摸一下{' '}
            <a href="https://github.com/ReactiveX/rxjs" target="_blank">
              RxJS
            </a>)
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
            需要注意的是：<label>
              如果傳入與傳出的 action 相同，將會造成無限循環
            </label>
          </li>
        </ul>
      </div>
      <h5>☆ 如何在專案中使用</h5>
      <div>
        <ul>
          <li>
            在專案模組下的 config.js 中使用<label>epic</label>將寫好的 epics
            綁定即可
            <pre className="prettyprint">{`//config.js
export default {
  router: {
    path: '/observable',
    component: Index
  },
  reducer: Reducer,
  epic: pingEpic // 可使用陣列格式寫入多組：[pingEpic, pongEpic]
};
`}</pre>
          </li>
        </ul>
      </div>
    </div>
  )
};
