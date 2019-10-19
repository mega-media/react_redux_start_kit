### INTRODUCE
這是介紹頁面，在接下來的章節裡，將循序漸進的介紹系統中各個角色。

在此區塊會有章節的程式執行結果，建議打開程式檔案搭配著看，註解的部分也不要遺漏了唷！！

---

### 專案架構

```
app/
  ⊢ src/
    ⊢ api/       (api 相關的設定與 type 文件)
    ⊢ dist/      (元件區)
      ⊢ master/       (主框架)
      ⊢ pages/        (有路由的頁面，非純路由)
        ∟ .routeropt  (路由設定檔案)
      ∟ shared/   (共用元件區，底下依專案需求分類)
        ∟ handlers/   (共用邏輯，以功能需求命名)
    ∟ storage/    (redux store 相關)
      ∟ reducers/     (redux reducer)
```


#### ☆ 主框架
 - 系統框架預設指向 *master/index.jsx*

#### ☆ 路由頁
 - pages 底下第一層資料夾為路由頁面
 - 資料夾名稱就是路徑名稱，預設指向元件為 *index.jsx*
 - 若有其他需求則在 pages/ 下添加設定檔 *.routeropt*

***

### 專案入口 _app/main.js_
專案基本設定，包含：語系、路由

``` js
/* app/main.js */
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
  document.getElementById('container') //定義在 entrance/index.html 中渲染內容的元素
);
```

#### ☆ 語系系統
 - **i18nInit**: 字串，選填，預設值為 `zh_tw` 。預設語系
 - **i18nFallback**: 字串，選填，預設值為 `en` 。未翻譯文字的顯示語言
 - 多國語系詳細使用說明請參考 [7. Locales.](/locale)

#### ☆ 路由系統
 - **routerIndex**: 字串，必填。系統一進入的初始頁面路徑
 - **routerNotFound**: 字串，選填，預設值為 `null` 。找不到路由的導向路徑， null 時導向預設頁面路徑
 - **routerMiddleware**: 函式，選填，預設值為 `null` 。路由系統要處理的 middleware
 - 路由相關在下一節進行說明

***

### 關於路由
系統會到 `app/src/dist/pages/` 底下讀取資料夾檔案，將讀取到的第一層資料夾名稱做為路徑名稱，預設指向底下 index.jsx

```
app/
  ⊢ src/
    ⊢ dist/
      ⊢ pages/
        ⊢ hello/
        ⊢ world/
```

> #### 以上述例子會產出兩筆路由，分別為 `/hello` 、 `/world`

`routerMiddleware` 會執行在 **_進入畫面之前_** 的階段，執行函式格式如下：

``` javascript
/**
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
}
```

- **store**： 系統中儲存的資料。概念說明可參閱 [3. Click counter.](/counter)

- **routerParams**： 設定在 `app/src/dist/pages/.routeropt` 中

  ``` javascript
  //app/src/dist/pages/.routeropt
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
  ```

- **render**：直接渲染元件

- **redirectTo**：導向某個路由的函式


#### ☆ 使用時機
routerMiddleware 會在進入畫面之前執行，因此適合做如 `登入驗證導向`、`瀏覽權限` 的判斷

``` javascript
//登入驗證導向
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
  }
}
```

``` javascript
//瀏覽權限
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
}
```