import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 套用系統樣式檔</h5>
      <h5>☆ Action 其他格式</h5>
      <h5>☆ 認識 Store 支援的存取格式 </h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ css-module 套用系統樣式檔</h5>
      <ul>
        <li>
          系統預設樣式有：
          <a href="http://getbootstrap.com/" target="_blank">
            Bootstrap
          </a>
          、
          <a href="http://fontawesome.io/" target="_blank">
            Font Awesome
          </a>
        </li>
        <li>
          要套用樣式屬性名稱須為
          <label>styleName</label>
          而非className
        </li>
        <li>
          嵌套方式包含
          <ol>
            <li>
              <b>Decorator - applyStyles</b>
              <p>
                使用 ES7 Decorator 的方式加上符號
                <label>@</label>
                標記在 Container/Component 上方
              </p>
              <pre className="prettyprint">
                {`import { applyStyles } from '@core/container';

@applyStyles()
export default class YourComponent extends React.Component { ... }`}
              </pre>
            </li>
            <li>
              <b>
                HOC - <a href="/hoc#withStyle">withStyle</a>
              </b>
              <p>使用 HOC 嵌套，將樣式檔帶入元件中</p>
              <pre className="prettyprint">
                {`import { withStyle } from '@core/container';

export class YourComponent extends React.Component { ... }
export default withStyle()(YourComponent);
`}
              </pre>
              <p>
                與其他 HOC 組合，需注意的是 css-module
                只會轉換第一層元件，因此函式順序必須放在最接近元件的位置
              </p>
              <pre className="prettyprint">{`import { compose, withDispatch, withStore, withStyle } from '@core/container';

export class YourComponent extends React.Component { ... }
export default compose(
  withDispatch,
  withStore(STORE_KEY),
  withStyle()
)(YourComponent);
`}</pre>
            </li>
          </ol>
        </li>
      </ul>
      <h5>☆ Action 其他格式</h5>
      <ul>
        <li>
          除了 type 之外，另一個允許的格式為 <label>payload</label>
        </li>
        <li>
          需要傳遞的參數皆放置在 <label>payload</label> 之下
        </li>
        <li>
          core/action/effect 提供 <label>emit</label> 函式，建立一個 Action
          Object
          <pre className="prettyprint">{`emit(TYPE_A, { data: [1, 2, 3] });
//就等於 { type: TYPE_A, payload: { data: [ 1, 2, 3 ] }}

//沒有 payload 時允許空值：
emit(TYPE_A);
//等於 { type: TYPE_A }
`}</pre>
        </li>
      </ul>
    </div>
  )
};
