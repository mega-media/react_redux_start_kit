import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ BDD vs. TDD</h5>
      <h5>☆ 執行測試</h5>
      <h5>☆ 覆蓋率報告</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ BDD vs. TDD</h5>
      <div>
        <ul>
          <li>
            <b>BDD</b> (Behavior Driven Development)
            <ol>
              <li>expect / should</li>
              <li>以需求面設計項目：功能執行結果是否達到需求</li>
            </ol>
          </li>
          <li>
            <b>TDD</b> (Test-Driven Development)
            <ol>
              <li>assert</li>
              <li>以測試面設計項目：功能的執行結果是否正確</li>
            </ol>
          </li>
        </ul>
      </div>
      <h5>☆ 執行測試</h5>
      <div>
        <ol>
          <li>
            <label>npm test</label>
            <p>
              - 檢測所有放在<b> __test__ </b>資料夾底下副檔名為 <b>.test.js[x]</b>{' '}
              檔案，在測試列表下還會有測試覆蓋率簡表
            </p>
          </li>
          <li>
            <label>npm run mocha-test:watch</label>
            <p>- 開啟監聽模式：當測試檔案變更，啟動測試。僅會顯示測試結果並不包含覆蓋率</p>
          </li>
        </ol>
      </div>
      <h5>
        ☆ 覆蓋率報告<span styleName="text-danger">
          (必須先執行過<label>npm test</label>)
        </span>
      </h5>
      <div>
        <ol>
          <li>
            <label>npm run coverage-report</label>
            <p>- 產出最後一次檢測結果的覆蓋率報表</p>
            <p>
              - 路徑 <b>{`./coverage`}</b> 底下可查看網頁版的詳細資訊
            </p>
          </li>
        </ol>
      </div>
    </div>
  )
};
