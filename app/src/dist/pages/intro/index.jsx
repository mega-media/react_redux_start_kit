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
        </div>
        <h4>專案架構</h4>
        <div style={{ padding: '5px 10px 20px' }}>
          <pre className="prettyprint">
            {`app/
  ⊢ src/
    ⊢ api/  (api 相關的設定與 type 文件)
    ⊢ dist/  (元件區)
      ⊢ master/  (主框架)
      ⊢ pages/  (有路由的頁面，非純路由)
        ∟ .routeropt  (路由設定檔案)
      ∟ shared/  (共用元件區，底下依專案需求分類)
        ∟ handlers/  (共用邏輯，以功能需求命名)
    ∟ storage/  (redux store 相關)
      ∟ reducers/  (redux reducer)`}
          </pre>
          <h5>☆ 主框架</h5>
          <ul style={{ lineHeight: '30px' }}>
            <li>
              系統框架預設指向 <b>master/index.jsx</b>
            </li>
          </ul>
          <h5>☆ 路由頁</h5>
          <ul style={{ lineHeight: '30px' }}>
            <li>pages 底下第一層資料夾為路由頁面</li>
            <li>
              資料夾名稱就是路徑名稱，預設指向元件為 <b>index.jsx</b>
            </li>
            <li>
              若有其他需求則在 pages/ 下添加設定檔 <b>.routeropt</b>
            </li>
          </ul>
        </div>
        <h4>
          專案入口
          <small>app/main.js</small>
        </h4>
        <div style={{ padding: '5px 10px 20px' }}>
          專案基本設定，包含：語系、路由
          <pre className="prettyprint">{`/* app/main.js */
import React from 'react';
import { render } from 'react-dom';
import router from '@core/router';

render(
  router({
    /* 語系設定 */
    i18nInit: 'zh_tw',
    i18nFallback: 'en',

    /* 路由設定 */
    routerIndex: '/intro',
    routerNotFound: null,
    routerMiddleware: null,

    /* reducer middleware */
    reducerMiddleware: reducer => (state, action) => reducer(state, action)
  }),
  document.getElementById('container') //定義在\`entrance/index.html\`中渲染內容的元素
);`}</pre>
          <h5>☆ 語系系統</h5>
          <ul style={{ lineHeight: '30px' }}>
            <li>
              <b>i18nInit</b>: 字串，選填，預設值為 <label>zh_tw</label>
              。預設語系
            </li>
            <li>
              <b>i18nFallback</b>: 字串，選填，預設值為 <label>en</label>
              。未翻譯文字的顯示語言
            </li>
            <li>
              多國語系詳細使用說明請參考 <Link to="/locale">7. Locales.</Link>
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
              <b>routerMiddleware</b>: 函式，選填，預設值為 <label>null</label>
              。路由系統要處理的 middleware
            </li>
            <li>路由相關在下一節進行說明</li>
          </ul>
        </div>
        <h4>
          關於路由
          <small>react-router</small>
        </h4>
        <div style={{ padding: '5px 10px 20px' }}>
          系統會到 <label>app/src/dist/pages/</label>{' '}
          底下讀取資料夾檔案，將讀取到的第一層資料夾名稱做為路徑名稱，預設指向底下
          index.jsx
          <br />
          <pre className="prettyprint">
            {`app/
  ⊢ src/
    ⊢ dist/
      ⊢ pages/
        ⊢ hello/
        ⊢ world/
`}
          </pre>
          以上述例子會產出兩筆路由，分別為 <label>/hello</label> 、{' '}
          <label>/world</label>
        </div>
        <h4>routerMiddleware</h4>
        <div>
          <div style={{ padding: '5px 10px 0' }}>
            <label>routerMiddleware</label> 會執行在{' '}
            <b>
              <i>進入畫面之前</i>
            </b>{' '}
            的階段，執行函式格式如下：
            <pre className="prettyprint">{`/**
* @param {Object} store 系統中儲存的資料
* @param {Object} routerParams 定義在.routeropt中的參數
* @return {Function}
*/
function(store, routerParams) {
  /**
  * @param {Function} render 回傳元件
  * @param {Function} redirectTo 導向某個路由的函式
  * @return 元件畫面
  */
  return function(render, redirectTo) {
    return render(); // or redirectTo('/path')
  }
}`}</pre>
            <ul style={{ lineHeight: '30px' }}>
              <li>
                <label>store</label>： 系統中儲存的資料。概念說明可參閱
                <Link to="/counter">3. Click counter.</Link>
              </li>
              <li>
                <label>routerParams</label>： 設定在{' '}
                <label>app/src/dist/pages/.routeropt</label> 中
                <pre className="prettyprint">{`//app/src/dist/pages/.routeropt
{
  "hello": {
    "auth": false
  }
};

//在 routerMiddleware 取到的 routerParams 就等於...
{
  path: "/hello",
  auth: false
}
`}</pre>
              </li>
              <li>
                <label>render</label>
                ：直接渲染元件
              </li>
              <li>
                <label>redirectTo</label>
                ：導向某個路由的函式
              </li>
            </ul>
          </div>
          <div style={{ padding: '0 10px 20px' }}>
            <h5>☆ 使用時機</h5>
            <div>
              因為 routerMiddleware 會在進入畫面之前執行，因此適合做如「
              <label>登入驗證導向</label>
              」、「
              <label>瀏覽權限</label>
              」的判斷
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
