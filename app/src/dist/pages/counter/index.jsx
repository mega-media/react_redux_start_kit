import React, { PureComponent } from 'react';
/* 使用符號 `@core` 可代替指向專案目錄 `app/core` */
import { compose, withDispatch, withStore } from '@core/container';

/* actions */
import { click, reset } from './action';

class Counter extends PureComponent {
  clickHandler = () => {
    /**
     * 使用 props.dispatch 將 Action 回傳值丟給 Reducer 處理
     *
     * NOTICE :
     * - 傳入的參數必須是 `Action 的執行結果` 而不是 Action 函式本身
     */
    this.props.dispatch(click());
  };

  resetHandler = () => {
    this.props.dispatch(reset());
  };

  render() {
    /**
     * 使用 props.counter 將與 Container 綁定的 state 內容取出
     */
    const counterState = this.props.counter;
    return (
      <div>
        <div>Clicks : {counterState}</div>
        <br />
        <button onClick={this.clickHandler}>Click the button</button>
        &nbsp;
        <button onClick={this.resetHandler}>Reset Counter</button>
      </div>
    );
  }
}

/**
 * containers hoc 元件的順序並不影響最終結果
 */
export default compose(
  withDispatch,
  withStore('counter')
)(Counter);
