import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Extension extends Component {
  render() {
    return (
      <div>
        <h4>核心檔的擴充</h4>
        <div style={{ padding: '5px 10px 20px', lineHeight: '30px' }}>
          核心檔隨時會進行更新，為了保持程式乾淨與更新方便，不應去更動到核心檔案。<br
          />
          而在專案開發的過程中，不同專案類型會有不同的需求，當專案提供的
          container hoc 、 saga action effect
          無法滿足開發使用，則可自行添加擴充檔案。
          <br />
        </div>
        <h4>如何擴充</h4>
        <div style={{ padding: '5px 10px 20px' }}>
          找到目錄資料夾：<label>app/extensions</label>，這是放置擴充檔案的地方，檔案深度只允許兩層。<br
          />
          在裡面已有檔案範例:
          <pre style={{ lineHeight: '22px' }}>
            extensions<br />
            {'  '}⊢ action.effects <small>[1]</small>
            <br />
            {'    '}∟ fetch-api.js <small>[2]</small>
            <br />
            {'  '}⊢ store.middleware <br />
            {'    '}⊢ _logger.js <small>[3]</small>
            <br />
            {'    '}∟ redux-observable.js<br />
            {'  '}∟ store.middleware.saga.watcher<br />
            {'    '}∟ async.js<br />
          </pre>
          名稱說明：
          <ol style={{ padding: '5px 20px', lineHeight: '30px' }}>
            <li>
              第一層資料夾對應的是 <label>app/dist/core</label> 底下的路徑。
              action.effects 即是 <label>app/dist/core/action/effects/</label>
            </li>
            <li>
              第二層放置想要擴充的檔案。檔案名稱若使用連接符號連接，系統轉成引入的函式時，會變成{' '}
              <b>
                <i>駝峰式命名</i>
              </b>
            </li>
            <li>若擴充檔案名稱開頭為 `_` ，則不會引入該檔案</li>
          </ol>
        </div>
      </div>
    );
  }
}
