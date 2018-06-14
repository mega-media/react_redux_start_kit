import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Intro extends Component {
  render() {
    return (
      <div>
        <h4>INTRODUCE</h4>
        <div style={{ padding: '5px 10px 20px' }}>
          這是介紹頁面，在接下來的章節裡，將循序漸進的介紹系統中各個角色。
          在此區塊會有章節的程式執行結果，建議打開程式檔案搭配著看，註解的部分也不要遺漏了唷！！
          <br />
          <br />
          開始之前，先瞭解一下專案的設定，包含：語系、路由、主框架等等如何修改。
        </div>
        <h4>
          專案入口
          <small>app/main.js</small>
        </h4>
        <div style={{ padding: '5px 10px 20px' }}>
          <pre className="prettyprint">{`/* app/main.js */
import React from 'react';
import { render } from 'react-dom';
import router from '~/core/router';

render(
  router({
    /* 語系設定 */
    i18nInit: 'zh_tw',
    i18nFallback: 'en',

    /* 主框架 */
    masterComponent: null,

    /* 路由設定 */
    routerIndex: '/intro',
    routerNotFound: '/error',
    routerMiddleware: null
  }),
  document.getElementById('container') //定義在\`entrance/index.html\`中渲染內容的元素
);`}</pre>
          <h5>☆ 語系系統</h5>
          <ul style={{ lineHeight: '30px' }}>
            <li>
              <b>i18nInit</b>: 字串，選填，預設值為 <label>zh_tw</label>。預設語系
            </li>
            <li>
              <b>i18nFallback</b>: 字串，選填，預設值為 <label>en</label>。未翻譯文字的顯示語言
            </li>
            <li>
              多國語系詳細使用說明請參考 <Link to="/locale">7. Locales.</Link>
            </li>
          </ul>
          <h5>☆ 主框架</h5>
          <ul style={{ lineHeight: '30px' }}>
            <li>
              <b>masterComponent</b>: 資料格式為元件(Component)，選填，預設值為{' '}
              <label>null</label>。null 表示沒有主框架
            </li>
            <li>在所有子元件的外層</li>
            <li>當子元件透過路由系統變化的時候，主框架不會受影響</li>
            <li>
              適合放置不受路由影響的元件，如：「跳轉動畫元件」、「系統提示訊息元件」等
            </li>
          </ul>
          <h5>☆ 路由系統</h5>
          <ul style={{ lineHeight: '30px' }}>
            <li>
              <b>routerIndex</b>: 字串，必填。系統一進入的初始頁面路徑
            </li>
            <li>
              <b>routerNotFound</b>: 字串，選填，預設值為 <label>null</label>。
              找不到路由的導向路徑， null 時導向預設頁面路徑
            </li>
            <li>
              <b>routerMiddleware</b>: 函式，選填，預設值為 <label>null</label>。路由系統要處理的
              middleware
            </li>
            <li>路由相關在下一節進行說明</li>
          </ul>
        </div>
        <h4>
          關於路由
          <small>react-router</small>
        </h4>
        <div style={{ padding: '5px 10px 20px' }}>
          各個模組的路由設定記錄在 <label>config.js</label> 中，路由參數需包含{' '}
          <label>path</label>、<label>component</label>。
          <br />
          以下一章節的 <Link to="/hello">1. Hello World !</Link> 路由設定為例：
          <pre className="prettyprint">{`//config.js
import View from './view';

export default {
  router: {
    path: '/hello',
    component: View
  }
};
//路由設定鍵值： router
`}</pre>
          <ul style={{ lineHeight: '30px' }}>
            <li>
              路由設定允許多筆：當頁面為多筆時，使用陣列格式
              <pre className="prettyprint">{`//config.js
import ViewA from './view';
import ViewB from './view';

export default {
  router: [{
    path: '/pageA',
    component: ViewA
  },{
    path: '/pageB',
    component: ViewB
  }]
};
`}</pre>
            </li>
            <li>
              path 以 / 開頭且為唯一值，注意不能重複
              <pre className="prettyprint">{`//config.js
import ViewA from './view';
import ViewB from './view';

export default {
  router: [{
    path: '/pageA',
    component: ViewA
  },{
    path: '/pageA',
    component: ViewB
  }]
};
//若路徑名稱(path)重複，則後面設定的頁面不會導向到(永遠看不到 ViewB)
`}</pre>
            </li>
          </ul>
          <br />
          <div style={{ padding: '5px 10px 20px' }}>
            <h5>
              ☆ 回頭來講一下 <label>routerMiddleware...</label>
            </h5>
            <label>routerMiddleware</label> 會執行在{' '}
            <b>
              <i>進入畫面之前</i>
            </b>{' '}
            的階段，執行函式格式如下：
            <pre className="prettyprint">{`/**
* @param store {Object} [系統中儲存的資料]
* @param routerParams {Object} [config.router 除了component之外的參數]
* @return {Function}
*/
function(store, routerParams) {
  /**
  * @param render {Function} [回傳 config.router.component]
  * @param redirectTo {Function} [導向某個路由的函式]
  * @return [元件畫面]
  */
  return function(render, redirectTo) {
    return render(); // or redirectTo('/path')
  }
}`}</pre>
            <ul style={{ lineHeight: '30px' }}>
              <li>
                <label>store</label>： 系統中儲存的資料。概念說明可參閱<Link to="/counter">3. Click counter.</Link>
              </li>
              <li>
                <label>routerParams</label>： 在 <label>config.js</label>{' '}
                中，路由參數除了 <label>path</label>、<label>component</label>，可再額外附加需要的參數
                <pre className="prettyprint">{`//config.js
{
  router: {
    path: '/hello',
    component: View,
    foo: 'bar',
    baz: 'qux'
  }
};

//在 routerMiddleware 取到的 routerParams 就等於...
{
  path: '/hello',
  foo: 'bar',
  baz: 'qux'
}
`}</pre>
              </li>
              <li>
                <label>render</label>：直接渲染 config.router.component
              </li>
              <li>
                <label>redirectTo</label>：導向某個路由的函式
              </li>
            </ul>
          </div>
          <div style={{ padding: '5px 10px 20px' }}>
            <h5>☆ 使用時機</h5>
            <div>
              因為 routerMiddleware 會在進入畫面之前執行，因此適合做如「<label>
                登入驗證導向
              </label>」、「<label>瀏覽權限</label>」的判斷
              <div>
                <pre className="prettyprint">{`//登入驗證導向
{
  routerMiddleware: (store, routerParams) => (render, redirectTo) => {
    // 從 routerParams 拿路徑名稱判斷是否在登入頁
    if( routerParams.path === '/login') {
      //是的話就直接渲染畫面
      return render();
    }
    //不是登入頁，從 store.account 中取得已登入的狀態
    const isLoggedIn = store['account'].isLoggedIn;

    //已登入？直接渲染畫面：導向登入頁
    return isLoggedIn ? render() : redirectTo('/login');
}`}</pre>
              </div>
              <div>
                <pre className="prettyprint">{`//瀏覽權限
{
  routerMiddleware: (store, routerParams) => (render, redirectTo) => {
    //從 store.account 中取得會員等級
    const accountLevel = store['account'].accountLevel;

    // 從 routerParams 中拿參數 levelAuth，假設值為 ALL、NORMAL、VIP
    switch( routerParams.levelAuth ) {
      case 'NORMAL':
        // 不符合瀏覽資格就導向錯誤頁面
        return accountLevel === 'normal' ? render() : redirectTo('/error');
      case 'VIP':
        // 不符合瀏覽資格就導向錯誤頁面
        return accountLevel === 'vip' ? render() : redirectTo('/error');
      default:
        return render();
    }
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
