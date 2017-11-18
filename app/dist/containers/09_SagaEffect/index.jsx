import React from 'react';
import { Link } from 'react-router-dom';
/* style */
import { applyStylesInline } from '../../core/css-module';

export const sagaIntro: any = () =>
  <div>
    <h4># call(function [, arg1, arg2, ...])</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>允許包覆一個回傳 action 物件的方法，適合用在 polling 中 payload 需有動態資料的 action</p>
      <pre>{`//每秒刷新當前時間
dispatch(polling(1000, call(() => ({
  type: 'TYPE',
  payload: { now: new Date().toLocaleTimeString() }
}))))`}</pre>
    </div>
    <h4># cancel()</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>取消所有執行中的 effects </p>
      <pre>{`dispatch([
  delay(5000, { type: 'TYPE_A' }),
  delay(1000, { type: 'TYPE_B' }),
  cancel(),
  delay(4000, { type: 'TYPE_C' }),
  delay(2000, { type: 'TYPE_D' })
])
//TYPE_A、TYPE_B 會被取消
//TYPE_C、TYPE_D 會被執行

dispatch([
  delay(5000, { type: 'TYPE_A' }),
  delay(1000, { type: 'TYPE_B' }),
  delay(3000, cancel()),
  delay(4000, { type: 'TYPE_C' }),
  delay(2000, { type: 'TYPE_D' })
])
//TYPE_A、TYPE_C 會被取消
//TYPE_B、TYPE_D 會被執行
`}</pre>
    </div>
    <h4># cancelLatest()</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>取消上一筆發出的 effect </p>
      <pre>{`dispatch([
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
`}</pre>
    </div>
    <h4># delay(duration, action)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>延遲傳入的 action 被 dispatch 時間 </p>
      <pre>{`dispatch(delay(5000, { type: 'TYPE_A' }))
//5 秒後 dispatch TYPE_A`}</pre>
    </div>
    <h4># fetchAPI(api_code , opts)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>
        發送一個 api request，詳細說明參閱 <Link to="/api">10. Fetch API </Link>
      </p>
      <pre>{`dispatch(fetchAPI(GET_USER_LIST, { method: 'get', path: '/user' }))`}</pre>
    </div>
    <h4># lock()</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>鎖定所有 effects 並取消所有執行中的 effects，期間不處理任何 effects 事件</p>
      <pre>{`dispatch([
  delay(5000, { type: 'TYPE_A' }),
  lock(),
  fetchAPI(GET_USER_LIST),
  polling(5000, { type: 'TYPE_B' }),
])
//TYPE_A 會被取消，後續呼叫的 effect 不會有反應`}</pre>
    </div>
    <h4># emit(type, payload)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>柯里化函式，執行一個 action</p>
      <pre>{`dispatch(emit(TYPE_A, { data: []}))
//dispatch({ type: TYPE_A, payload:{ data: []}})`}</pre>
    </div>
    <h4># polling(interval, action)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>每隔一段間隔時間，dispatch 傳入的 action</p>
      <pre>{`dispatch(polling(1000, { type: 'TYPE_A' }))
//每隔 1 秒，dispatch 一次 TYPE_A`}</pre>
    </div>
    <h4># unlock()</h4>
    <div style={{ padding: '5px 10px 0' }}>
      <p>解除所有 effects 的鎖定</p>
      <pre>{`dispatch(unlock())`}</pre>
    </div>
  </div>;

export default applyStylesInline()(sagaIntro);
