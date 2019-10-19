##### ☆ [redux-observable](https://github.com/redux-observable/redux-observable)

以 RxJS 6 為基礎的 middleware(入坑之前建議先摸一下 [RxJS](https://github.com/ReactiveX/rxjs)) 可處理複雜的非同步邏輯，有效管理 side effect

---

##### ☆ 核心思想 - Epic

接收 actions 作為參數並返回 actions ( actions 入, actions 出 )

需要注意的是 `如果傳入與傳出的 action 相同，將會造成無限循環`

---

##### ☆ 如何在專案中使用

在專案模組位置 `app/src/storage/epics/` 新增 epic 檔案

``` js
//app/src/storage/epics/observable.js
import { delay, mapTo } from 'rxjs/operators';

export const pingEpic = action$ =>
  action$.ofType('PING').pipe(
    delay(1000),
    mapTo({ type: 'PONG' })
  );

/* 最後輸出使用陣列格式 */
export default [pingEpic];
```
