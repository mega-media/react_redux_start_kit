##### ☆ Redux 主要角色
<img style="width:100%" src="../assets/images/redux_model.png" />

Redux 基於 Flux 所衍伸的應用架構，包含四個主要角色：`Action`、`Reducer`、`Store` 與 `View`
角色之間的對應關係如上圖所示，任何操作流程皆為 `單向資料流(Unidirectional data flow)`

#### **Actions**
執行的動作，由 View 透過 dispatch() 發起

#### **Reducers**
接收來自 Action 的通知，依照執行的動作將處理完的資料輸出

#### **Store**
由多個 states 組成，根據 Reducers 回傳的資料結果，寫進對應的 state 中

#### **Views**
當監聽的 state 發生改變，即觸發 view 進行處理（顯示資訊或其他邏輯處理）

---

##### ☆ Redux 開發輔助工具

Redux devTools : [https://github.com/gaearon/redux-devtools](https://github.com/gaearon/redux-devtools)

- 使用快捷鍵 `ctrl` + `h` 展開系統掛載的開發輔助工具
- 快捷鍵 `ctrl` + `g` 變更輔助工具位置

---

##### ☆ Reducer 的設定

- 新增在路徑 **app/src/storage/reducers/** 底下
- 系統讀取檔案名稱做為 redux store 鍵值
- 為了識別方便暫不支援資料夾格式，也就是用資料夾包起來的一律被略過

---

##### ☆ Container HOC

- 每個 hoc 都是柯里化函式，透過組合的方式將資料賦予給 component

- 可使用 `compose` 將元件組合
  ``` js
  import { compose, withDispatch, withStore } from '@core/container';

  export default compose(withDispatch, withStore(STORE_KEY))(YOUR_COMPONENT);
  ```

- 即可在 component 的 props 拿到被賦予的資料

- 更多 hoc 資訊可參閱 [9. Container HOC](/hoc)
