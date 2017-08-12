import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 Redux-Saga</h5>
      <h5>☆ API 環境設定</h5>
      <h5>☆ 在 Container 中使用</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>
        ☆{' '}
        <a href="https://github.com/redux-saga/redux-saga" target="_blank">
          Redux-Saga
        </a>
      </h5>
      <div>
        <ul>
          <li>一個用於管理 Redux 非同步操作的 middleware</li>
          <li>
            透過建立 <b>Sagas</b> 將所有非同步操作邏輯在一個地方集中處理
          </li>
          <li>應用在此專案中，用來管理 API 的發送與接收行為</li>
          <li>
            <b>Saga: </b>透過{' '}
            <a href="http://es6.ruanyifeng.com/#docs/generator" target="_blank">
              Generator
            </a>{' '}
            函式建立，負責協調複雜或非同步的操作
          </li>
        </ul>
      </div>
      <h5>☆ 運作流程</h5>
      <div>
        <ol>
          <li>專案啟動時，Sagas 就會開始監聽 action 的行為</li>
          <li>
            每次收到 action type 為 <label>SAGA_ACTION</label> 時，建立新的 saga 發送 API
            並監聽回傳
            <helper>* 當 API 回傳執行完畢，saga 會將監聽關閉</helper>
            <helper>* 因為每次呼叫都是新的 saga，每個 saga 各自獨立監聽，以此達到非同步的處理</helper>
          </li>
          <li>
            同時會額外建立另一個 saga 支線，監聽 action type 為 <label>SAGA_CANCEL</label> 的呼叫
            <helper>* 收到 SAGA_CANCEL 的呼叫，會將所有監聽尚未關閉的 sagas 強制關閉</helper>
          </li>
        </ol>
      </div>
      <h5>☆ API 環境設定</h5>
      <div>
        <ol>
          <li>
            <b>HOST</b>
            <p>
              在專案目錄下 <b>config/env/dev.js</b> 中，參數 <label>apiHost</label> 寫入 API
              來源位址
            </p>
          </li>
          <li>
            <b>REQUEST</b>
            <div>
              <ul>
                <li>
                  每筆 API 皆給予一個<b>代碼</b>，作為資料識別
                </li>
                <li>
                  在路徑 <b>app/dist/api/</b> 底下建置專案所有需要的 API 資訊，建議由 api
                  第一層路由名稱命名資料夾
                </li>
                <li>
                  在每個資料夾底下添加 <label>request.js</label> 檔案，資料格式記錄在{' '}
                  <b>app/dist/api/type.js</b>
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
      <h5>☆ 在 Container 中使用</h5>
      <div>
        <ol>
          <li>
            <b>action.js</b>：透過 <b>fetchApi</b> 函式呼叫 API
            <pre>
              {`//action.js
import { fetchApi } from '~/helpers/fetch';

/* API 代碼 */
import { USER_GET } from '~/api/user/constant';

export function getUserList() {
  return fetchApi(USER_GET);
}`}
            </pre>
          </li>
          <li>
            <b>saga.js</b>：根據 API 代碼撰寫對應的回傳處理邏輯
            <pre>
              {`//saga.js
/* API 代碼 */
import { USER_GET } from '~/api/user/constant';

export default {
  [USER_GET]: function* (res) {
    /* 做些什麼... */
  }
};`}
            </pre>
          </li>
          <li>
            <b>config.js</b>：設定參數 <lable>saga</lable>，對應上述 saga.js 檔案
            <pre>
              {'//config.js'}
              {`
...
import Saga from './saga';

export default {
  router: {...},
  reducer: {...},
  saga: Saga
};

//多筆綁定: 使用陣列
...
saga: [SagaA, SagaB]
...
`}
            </pre>
          </li>
        </ol>
      </div>
    </div>
  )
};
