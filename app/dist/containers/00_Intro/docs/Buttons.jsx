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
      <h5>☆ 套用系統樣式檔</h5>
      <ul>
        <li>核心檔案 - BaseView 中包含嵌套樣式檔的方法：applyStyles()</li>
        <li>
          使用 ES7 Decorator 的方式加上符號<label>@</label>標記在 Container/Component 上方
        </li>
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
      </ul>
    </div>
  )
};
