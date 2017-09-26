import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 套用系統樣式檔</h5>
      <h5>☆ 使用 Constant 定義參數值</h5>
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
          </a>、
          <a href="http://fontawesome.io/" target="_blank">
            Font Awesome
          </a>
        </li>
        <li>
          要套用樣式屬性名稱須為<label>styleName</label>而非className
        </li>
        <li>
          嵌套方式包含
          <ol>
            <li>
              <b>applyStyles</b>
              <p>
                使用 ES7 Decorator 的方式加上符號<label>@</label>標記在 Container/Component
                上方
              </p>
            </li>
            <li>
              <b>applyStylesInline</b>
              <p>嵌套方式如下</p>
              <pre>
                {`applyStylesInline()(Component)`}
              </pre>
              <p>亦可與 container hoc 組合</p>
              <pre>
                {`compose(Dispatch, applyStylesInline())(Component)`}
              </pre>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  )
};
