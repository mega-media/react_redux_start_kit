import React from 'react';
import { Link } from 'react-router-dom';
/* style */
import { withStyle } from '../../core/container';

export const sagaIntro = () => (
  <div>
    <h4 id="call">
      <a href="#call" style={{ color: '#000' }}>
        # call(function [, arg1, arg2, ...])
      </a>
    </h4>
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
          Type: <label>{`Function(...args:Array<any>) => Action`}</label>
          <br />
          回傳一個帶有 type、payload 屬性的物件
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>arg</b>
        </div>
        <div styleName="panel-body">
          Type: <label>any</label> <br />
          function 傳入值
        </div>
      </div>
      <pre className="prettyprint">{`//每秒刷新當前時間
dispatch(polling(1000, call(() => ({
  type: 'TYPE',
  payload: { now: new Date().toLocaleTimeString() }
}))))`}</pre>
    </div>
    <h4 id="cancel">
      <a href="#cancel" style={{ color: '#000' }}>
        # cancel(action)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>取消特定 effects，適合搭配 delay、polling 使用</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>action</b>
        </div>
        <div styleName="panel-body">
          Type: <label>Action</label> <br />
          取消之前已註冊的 action effects
        </div>
      </div>
      <pre className="prettyprint">{`/* delay */
//設定延遲函式：7 秒後 dispatch TYPE_A
const timeout = delay(7000, { type: 'TYPE_A' });

//開始執行
dispatch(timeout);

//取消執行延遲行為
dispatch(cancel(timeout));`}</pre>
      <pre className="prettyprint">{`/* polling */
//宣告輪詢函式：每秒 dispatch TYPE_A
const loop = polling(1000, { type: 'TYPE_A' });

//開始執行
dispatch(loop);

//中斷輪詢
dispatch(cancel(loop));
`}</pre>
    </div>
    <h4 id="cancelAll">
      <a href="#cancelAll" style={{ color: '#000' }}>
        # cancelAll()
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>取消所有執行中的 effects </p>
      <pre className="prettyprint">{`dispatch([
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
`}</pre>
    </div>
    <h4 id="cancelLatest">
      <a href="#cancelLatest" style={{ color: '#000' }}>
        # cancelLatest()
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>取消上一筆發出的 effect </p>
      <pre className="prettyprint">{`dispatch([
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
    <h4 id="delay">
      <a href="#delay" style={{ color: '#000' }}>
        # delay(duration, action)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>延遲傳入的 action 被 dispatch 時間 </p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>duration</b>
        </div>
        <div styleName="panel-body">
          Type: <label>number</label> <br />
          延遲時間，單位為毫秒(milliseconds)
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>action</b>
        </div>
        <div styleName="panel-body">
          Type: <label>Action</label> <br />
          一段時間後被 dispatch 的 action
        </div>
      </div>
      <pre className="prettyprint">{`dispatch(delay(5000, { type: 'TYPE_A' }))
//5 秒後 dispatch TYPE_A`}</pre>
    </div>
    <h4 id="emit">
      <a href="#emit" style={{ color: '#000' }}>
        # emit(type[, payload])
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>執行一個 action</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>type</b>
        </div>
        <div styleName="panel-body">
          Type: <label>string</label> <br />
          action 物件的 type 屬性
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>payload</b>
        </div>
        <div styleName="panel-body">
          Type: <label>any</label> <br />
          action 物件的 payload 屬性
        </div>
      </div>
      <pre className="prettyprint">{`dispatch(emit(TYPE_A, { data: []}))
//就等於 dispatch({ type: TYPE_A, payload:{ data: []}})

//沒有 payload 時允許空值：
dispatch(emit(TYPE_A))
`}</pre>
    </div>
    <h4 id="polling">
      <a href="#polling" style={{ color: '#000' }}>
        # polling(interval, action)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>每隔一段間隔時間，dispatch 傳入的 action</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>interval</b>
        </div>
        <div styleName="panel-body">
          Type: <label>number</label> <br />
          間隔時間，單位為毫秒(milliseconds)
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>action</b>
        </div>
        <div styleName="panel-body">
          Type: <label>Action</label> <br />
          一段時間後被 dispatch 的 action
        </div>
      </div>
      <pre className="prettyprint">{`dispatch(polling(1000, { type: 'TYPE_A' }))
//每隔 1 秒，dispatch 一次 TYPE_A`}</pre>
    </div>
  </div>
);

export default withStyle()(sagaIntro);
