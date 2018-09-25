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
        <div styleName="text-right">
          (圖片來源：
          <a
            href="https://github.com/markerikson/react-redux-links/blob/master/redux-side-effects.md"
            target="_blank"
          >
            react-redux-links
          </a>
          )
        </div>
      </div>
      <div>
        <ul>
          <li>
            <b>Saga: </b>
            透過{' '}
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
          <li>
            專案啟動時，系統開始監聽所有 action effects，透過各自的 effect type
            觸發任務執行
          </li>
          <li>每個 effect 回傳值皆是 action 物件</li>
          <li>
            簡單來說就是對「執行動作」進行包裝，當它被 dispatch 會先檢查包裝的
            type 值。接著，負責處理的 action effects
            就會接手運行「執行動作」囉！
          </li>
        </ul>
      </div>
    </div>
  )
};
