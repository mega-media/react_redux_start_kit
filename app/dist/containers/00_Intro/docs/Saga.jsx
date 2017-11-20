import React from 'react';
import redux_saga from '../assets/images/redux-saga.png';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 Redux-Saga</h5>
      <h5>☆ action effects</h5>
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
        <img
          styleName="img-responsive img-rounded"
          width="100%"
          src={redux_saga}
        />
      </div>
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
      <h5>☆ action effects</h5>
      <div>
        <ul>
          <li>專案啟動時，開始監聽所有 action effects，透過各自的 effect type 觸發任務執行</li>
          <li>每個 effect 都是柯里化函式，回傳值皆是 action 物件</li>
        </ul>
      </div>
    </div>
  )
};
