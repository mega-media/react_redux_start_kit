import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ state 存取</h5>
      <h5>☆ 使用 Component</h5>
      <h5>☆ 元件傳值方式</h5>
      <h5>☆ 表單元件應用</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ 關於 state </h5>
      <ul>
        <li>Component 儲存資料的小倉庫，應當做私有參數，供元件內部使用</li>
        <li>變更 state 內容時，應使用 setState()</li>
        <li>使用 setState() 變更 state 時，會使畫面重新渲染 (re-render)</li>
        <li styleName="text-danger">setState 方法不能在 render 方法中使用</li>
      </ul>
      <h5>☆ 關於 props </h5>
      <ul>
        <li>Components 傳值的方式</li>
        <li>
          在 JSX 中使用添加屬性的方式傳遞 props。ex. {`<Tag name="thisIsProps" />`}
        </li>
        <li>不在 Component 內部變更自己的 props 內容</li>
      </ul>
    </div>
  )
};
