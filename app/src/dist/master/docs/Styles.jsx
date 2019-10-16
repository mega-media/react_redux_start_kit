import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 套用自訂樣式檔</h5>
      <h5>☆ 使用外部檔案</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ 套用自訂樣式檔</h5>
      <ol>
        <li>
          載入樣式檔
          <pre className="prettyprint">{`import customStyle from './styleFile.css'`}</pre>
        </li>
        <li>
          使用 applyStyles 嵌套進元件中
          <pre className="prettyprint">{`import { applyStyles } from '@core/container';

@applyStyles(customStyle)
export default class YourComponent extends React.Component { ... }
`}</pre>
        </li>
        <li>
          使用 hoc - withStyle 嵌套進元件中
          <pre className="prettyprint">{`import withStyle from '@core/container';

export class YourComponent extends React.Component { ... }
export default withStyle(customStyle)(YourComponent);
`}</pre>
        </li>
      </ol>
      <h5>☆ 使用外部檔案 - 以圖片為例</h5>
      <ul>
        <li>
          載入外部檔案與載入系統檔案方式相同
          <pre className="prettyprint">{`import imageUrl from './imageFile.jpg'`}</pre>
        </li>
        <li>
          使用：
          <pre className="prettyprint">{`<img src={imageUrl} />`}</pre>
        </li>
        <li>
          支援載入的外部檔案副檔名包含：
          <ol>
            <li>
              資料格式：
              <label>.json</label>
            </li>
            <li>
              圖片：
              <label>.jpeg</label>
              <label>.jpg</label>
              <label>.png</label>
              <label>.gif</label>
              <label>.svg</label>
              <label>.ico</label>
            </li>
            <li>
              多媒體：
              <label>.mp4</label>
              <label>.swf</label>
            </li>
            <li>
              字型：
              <label>.woff</label>
              <label>.woff2</label>
              <label>.ttf</label>
              <label>.eot</label>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  )
};
