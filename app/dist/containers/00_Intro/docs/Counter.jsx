import React from 'react';
import redux_model from '../assets/images/redux_model.png';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 Redux</h5>
      <h5>☆ 使用 Container HOC</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ Redux 主要角色</h5>
      <div>
        <div>
          <img styleName="img-responsive img-rounded" src={redux_model} />
        </div>
        <ul>
          <li>
            Redux 基於 Flux 所衍伸的應用架構，包含四個主要角色：<label>Action</label>、<label>Reducer</label>、<label>Store</label>與<label>View</label>
          </li>
          <li>
            角色之間的對應關係如上圖所示，任何操作流程皆為<label>
              單向資料流(Unidirectional data flow)
            </label>
          </li>
          <li>
            每個角色有各自的負責職責：
            <ol>
              <li>
                <b>Actions : </b>執行的動作，由 View 透過 dispatch() 發起
              </li>
              <li>
                <b>Reducers : </b>接收來自 Action 的通知，依照執行的動作將處理完的資料輸出
              </li>
              <li>
                <b>Store : </b>由多個 states 組成，根據 Reducers 回傳的資料結果，寫進對應的 state 中
              </li>
              <li>
                <b>Views : </b>當監聽的 state 發生改變，即觸發 view 進行處理（顯示資訊或其他邏輯處理）
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <h5>☆ Redux 開發輔助工具</h5>
      <ul>
        <li>
          使用快捷鍵<label>ctrl</label> + <label>h</label> 展開系統掛載的開發輔助工具
        </li>
        <li>
          快捷鍵<label>ctrl</label> + <label>g</label> 變更輔助工具位置
        </li>
        <li>
          Redux devTools :{' '}
          <a target="_blank" href="https://github.com/gaearon/redux-devtools">
            {`https://github.com/gaearon/redux-devtools`}
          </a>
        </li>
      </ul>
      <h5>☆ Reducer 的設定</h5>
      <ul>
        <li>與 Router 設定一同寫在 config.js 中</li>
      </ul>
      <h5>☆ Container HOC </h5>
      <ul>
        <li>
          <b>Dispatch</b>: 元件 dispatch 方法與 store 查詢函式
        </li>
        <li>
          <b>Store</b>: store 內容的監聽
        </li>
        <li>
          使用方式
          <ol>
            <li>每個 hoc 都是柯里化函式，透過組合的方式將資料賦予給 component </li>
            <li>
              使用{' '}
              <a target="_blank" href="http://ramdajs.com">
                Ramda
              </a>{' '}
              提供的 <label>compose</label> 將元件組合
              <pre>{`compose(Dispatch, Store(STORE_KEY))(YOUR_COMPONENT)`}</pre>
            </li>
            <li>即可在 component 的 props 拿到被賦予的資料</li>
          </ol>
        </li>
      </ul>
    </div>
  )
};
