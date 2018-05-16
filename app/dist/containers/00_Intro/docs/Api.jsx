import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 設計原理與期望目標</h5>
      <h5>☆ API 串接的運作流程</h5>
      <h5>☆ 回傳處理</h5>
      <h5>☆ 如何使用</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ 設計原理與期望目標</h5>
      <div>
        <ul>
          <li>
            元件角色職責單純化：發送(request)與接收(response)行為可以分開管理
          </li>
        </ul>
      </div>
      <h5>☆ 運作流程</h5>
      <div>
        <ol>
          <li>
            專案啟動時，Sagas 開始監聽定義的 effects type，fetchAPI type 為{' '}
            <label>SAGA_ASYNC</label>
          </li>
          <li>
            每次 dispatch 的 action type 為 <label>SAGA_ASYNC</label>{' '}
            時，將建立新的 Saga Task 發送 API
          </li>
          <li>
            當 API 回傳時會執行 <i>相對應</i> 的 <b>回傳處理</b>，待處理完畢，Saga
            會將 Task 關閉
          </li>
          <li>
            由於每次呼叫都是新的 Saga Task，各自獨立監聽，以此達到非同步的處理
          </li>
        </ol>
      </div>
      <h5>☆ 回傳處理</h5>
      <div>
        <ul>
          <li>
            當 API 發送以及接收被各別分開之後，之間的關聯需透過「API
            別名」來聯繫
          </li>
          <li>回傳處理函式必須為 generator function</li>
        </ul>
      </div>
      <h5>☆ 如何使用</h5>
      <div>
        <ul>
          <li>
            在 request 中，定義 <label>API_USERS_LIST</label>{' '}
            代表該次的請求操作， 當收到 response 會去所有在 config
            綁入的訂閱(subscribe)，找尋 key 值為<label>API_USERS_LIST</label>的回傳處理
          </li>
          <li>
            <b>Request</b> : 使用 action effect - fetchAPI
            <pre className="prettyprint">{`//action.js
export function fetchAction = fetchAPI('API_USERS_LIST', {
  url: 'http://jsonplaceholder.typicode.com/users'
});

//component
this.props.dispatch(fetchAction);
`}</pre>
          </li>
          <li>
            <b>Response</b> : 定義在 config.js 裡，subscribe 屬性值
            <pre className="prettyprint">{`//config.js
export default {
  ...
  subscribe: {
    'API_USERS_LIST': function* (response) {
      //做你想做的處理
    }
  },
  ...
}
`}</pre>
          </li>
        </ul>
      </div>
    </div>
  )
};
