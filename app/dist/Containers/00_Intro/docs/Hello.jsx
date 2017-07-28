import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 建構簡易React Element</h5>
      <h5>☆ 定義 Router 與指向檔案</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ Container vs. Component</h5>
      <div>
        <ul>
          <li>
            <b>Component</b> : React 畫面元件
            <ol>
              <li>
                繼承自<label>React.Component</label>
              </li>
              <li>
                類別中除建構子外，至少必須有<label>render function</label>
              </li>
            </ol>
          </li>
          <li>
            <b>Container</b> : Redux 重要角色之一，<label>做為進入頁面</label>或<label>需要存取變更Store</label>的
            Component
            <ol>
              <li>通常由一個以上 Component 所組成</li>
              <li>
                可繼承自<label>React.Component</label>或核心檔案<label>BaseView</label>
              </li>
              <li>
                Redux 介紹請見 <a href="/counter">Click counter</a>
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <h5>☆ Config 的設定</h5>
      <div>
        <ul>
          <li>Config.js 是 Container 的設定檔，可在此設定該 Container 的路徑以及對應檔案</li>
          <li>專案建置時系統會掃描所有 Containers 的 Config.js 進行合併</li>
          <li>
            Router 相關設定語法請參閱：
            <a
              target="_blank"
              href="https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes">
              React Router - Configuration with Plain Routes
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
};
