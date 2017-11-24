import React from 'react';
import { Link } from 'react-router-dom';
/* style */
import Style from '../../core/container/hoc/style';

export const sagaIntro = () => (
  <div>
    <h4># call(function [, arg1, arg2, ...])</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>
        允許包覆一個回傳 action 物件的方法，適合用在 polling 中 payload
        需有動態資料的 action
      </p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>function</b>
        </div>
        <div styleName="panel-body">
          Type: {`Function(...args:Array<any>) => Action`}
          <br />
          回傳一個帶有 type、payload 屬性的物件
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>arg</b>
        </div>
        <div styleName="panel-body">
          Type: any <br />
          function 傳入值
        </div>
      </div>
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
      <p>柯里化函式，延遲傳入的 action 被 dispatch 時間 </p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>duration</b>
        </div>
        <div styleName="panel-body">
          Type: number <br />
          延遲時間，單位為毫秒(milliseconds)
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>action</b>
        </div>
        <div styleName="panel-body">
          Type: Action <br />
          一段時間後被 dispatch 的 action
        </div>
      </div>
      <pre>{`dispatch(delay(5000, { type: 'TYPE_A' }))
//5 秒後 dispatch TYPE_A`}</pre>
    </div>
    <h4># emit(type, payload)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>柯里化函式，執行一個 action</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>type</b>
        </div>
        <div styleName="panel-body">
          Type: string <br />
          action 物件的 type 屬性
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>payload</b>
        </div>
        <div styleName="panel-body">
          Type: any <br />
          action 物件的 payload 屬性
        </div>
      </div>
      <pre>{`dispatch(emit(TYPE_A, { data: []}))
//就等於 dispatch({ type: TYPE_A, payload:{ data: []}})

//沒有 payload 時：
dispatch(emit(TYPE_A)())
//或者
dispatch(emit(TYPE_A, null))`}</pre>
    </div>
    <h4># fetchAPI(api_code , opts)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>
        發送一個 api request，目前支援 json 格式的串接，詳細說明參閱{' '}
        <Link to="/api">11. Fetch API </Link>
      </p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>api_code</b>
        </div>
        <div styleName="panel-body">
          Type: string <br />
          API 別名，作為發送(request)與(response)行為之間的聯繫
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>opts</b>
        </div>
        <div styleName="panel-body">
          Type: Object
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>body</b>
            </div>
            <div styleName="panel-body">
              Type: string | FormData <br />
              加到 request 中的內容資料。當 method 為 get、head 時不使用這個值。
            </div>
          </div>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>method</b>
            </div>
            <div styleName="panel-body">
              Type: string <br />
              request 的方法，包含：GET、POST、PUT、DELETE、HEAD
            </div>
          </div>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>middleware</b>
            </div>
            <div styleName="panel-body">
              Type: {`Function | Array<Function>`} <br />
              非必填，放在 response.json() 後執行的中介函式，
            </div>
          </div>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>url</b>
            </div>
            <div styleName="panel-body">
              Type: string <br />
              請求的網址
            </div>
          </div>
        </div>
      </div>
      <pre>{`dispatch(fetchAPI(GET_USER_LIST, { method: 'get', path: '/user' }))`}</pre>
    </div>
    <h4># lock()</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>
        鎖定所有 effects 並取消所有執行中的 effects，期間不處理任何 effects 事件
      </p>
      <pre>{`dispatch([
  delay(5000, { type: 'TYPE_A' }),
  lock(),
  fetchAPI(GET_USER_LIST),
  polling(5000, { type: 'TYPE_B' }),
])
//TYPE_A 會被取消，後續呼叫的 effect 不會有反應`}</pre>
    </div>
    <h4># polling(interval, action)</h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>柯里化函式，每隔一段間隔時間，dispatch 傳入的 action</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>interval</b>
        </div>
        <div styleName="panel-body">
          Type: number <br />
          間隔時間，單位為毫秒(milliseconds)
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>action</b>
        </div>
        <div styleName="panel-body">
          Type: Action <br />
          一段時間後被 dispatch 的 action
        </div>
      </div>
      <pre>{`dispatch(polling(1000, { type: 'TYPE_A' }))
//每隔 1 秒，dispatch 一次 TYPE_A`}</pre>
    </div>
    <h4># unlock()</h4>
    <div style={{ padding: '5px 10px 0' }}>
      <p>解除所有 effects 的鎖定</p>
      <pre>{`dispatch(unlock())`}</pre>
    </div>
  </div>
);

export default Style()(sagaIntro);
