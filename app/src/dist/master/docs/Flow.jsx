import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 認識 Flow Type</h5>
      <h5>☆ 動態資料新增與刪除</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>
        ☆{' '}
        <a href="https://flowtype.org/" target="_blank">
          Flow Type
        </a>
      </h5>
      <ul>
        <li>
          一種靜態型別檢查，允許自由設定要檢查檔案，只檢查語法不需編譯即可執行
        </li>
        <li styleName="text-danger">
          程式對於型別檢查寫法越嚴謹，當資料異動時的維護越方便
        </li>
      </ul>
      <h5>☆ Flow Type 安裝與測試</h5>
      <ul>
        <li>
          第一次使用時須先執行安裝 module 的型別過濾：
          <label>npm run flow-install</label>
        </li>
        <li>
          針對要檢查的檔案，僅需在
          <label>檔案最上方</label>
          標記檢查語法：
          <label>{`//@flow`}</label>
        </li>
        <li>
          進行檢查：
          <label>npm run flow-test</label>
        </li>
      </ul>
      <h5>☆ 持續監聽</h5>
      <ul>
        <li>
          專案使用{' '}
          <a href="https://github.com/emcrisostomo/fswatch" target="_blank">
            Fswatch
          </a>{' '}
          來監聽檔案變更
        </li>
        <li>
          執行前須先{' '}
          <a
            href="https://github.com/emcrisostomo/fswatch#getting-fswatch"
            target="_blank"
          >
            安裝
          </a>
        </li>
        <li>
          進行檢查：
          <label>npm run flow-test:watch</label>
        </li>
      </ul>
    </div>
  )
};
