這是擴充檔案 app/extensions/store.middleware/redux-saga/ 的使用範例。


**NOTICE!!!**
```
若使用的話需連同 app/extensions/action.effects/ 檔案一起擴充
```

### 安裝模組
``` yaml
npm install --save redux-saga
```
---


### **call(function [, arg1, arg2, ...])**
允許包覆一個回傳 action 物件的方法，適合用在 polling 中 payload 需有動態資料的 action

``` js
// 每秒刷新當前時間
dispatch(
  polling(
    1000,
    call(
      () => ({
        type: 'TYPE',
        payload: { now: new Date().toLocaleTimeString() }
      })
    )
  )
)
```

---

### **cancel(action)**
取消特定 effects，適合搭配 delay、polling 使用

**delay**
``` js
//設定延遲函式：7 秒後 dispatch TYPE_A
const timeout = delay(7000, { type: 'TYPE_A' });

//開始執行
dispatch(timeout);

//取消執行延遲行為
dispatch(cancel(timeout));
```

**polling**
```js
//宣告輪詢函式：每秒 dispatch TYPE_A
const loop = polling(1000, { type: 'TYPE_A' });

//開始執行
dispatch(loop);

//中斷輪詢
dispatch(cancel(loop));
```

---

### **cancelAll()**
取消所有執行中的 effects

``` js
dispatch([
  delay(5000, { type: 'TYPE_A' }),
  delay(1000, { type: 'TYPE_B' }),
  cancelAll(),
  delay(4000, { type: 'TYPE_C' }),
  delay(2000, { type: 'TYPE_D' })
])
//TYPE_A、TYPE_B 會被取消
//TYPE_C、TYPE_D 會被執行

dispatch([
  delay(5000, { type: 'TYPE_A' }),
  delay(1000, { type: 'TYPE_B' }),
  delay(3000, cancelAll()),
  delay(4000, { type: 'TYPE_C' }),
  delay(2000, { type: 'TYPE_D' })
])
//TYPE_A、TYPE_C 會被取消
//TYPE_B、TYPE_D 會被執行
```

---

### **cancelLatest()**
取消上一筆發出的 effect

``` js
dispatch([
  delay(5000, { type: 'TYPE_A' }),
  delay(1000, { type: 'TYPE_B' }),
  cancelLatest(),
  delay(4000, { type: 'TYPE_C' }),
  delay(2000, { type: 'TYPE_D' })
])
//TYPE_B 會被取消
//TYPE_A、TYPE_C、TYPE_D 會被執行

dispatch([
  delay(5000, { type: 'TYPE_A' }),
  delay(1000, { type: 'TYPE_B' }),
  delay(3000, cancelLatest()),
  delay(4000, { type: 'TYPE_C' }),
  delay(2000, { type: 'TYPE_D' })
])
//TYPE_C 會被取消
//TYPE_A、TYPE_B、TYPE_D 會被執行
```

---

### **delay(duration, action)**
延遲傳入的 action 被 dispatch 時間

``` js
// 延遲時間單位為毫秒(milliseconds)
dispatch(delay(5000, { type: 'TYPE_A' }))
//5 秒後 dispatch TYPE_A
```

---

### **polling(interval, action)**
每隔一段間隔時間，dispatch 傳入的 action

``` js
//間隔時間單位為毫秒(milliseconds)
dispatch(polling(1000, { type: 'TYPE_A' }))
//每隔 1 秒，dispatch 一次 TYPE_A
```
