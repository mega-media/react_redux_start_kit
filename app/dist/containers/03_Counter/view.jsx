import React from 'react';
import BaseView, { connect } from '~/core/baseView';
import { click, reset } from './action';
/**
 * 引入 BaseView：使用符號 `~` 可代替指向專案目錄 `app/dist`
 *
 * BaseView 提供基本操作函式，包含：
 * 頁面導向 / 返回上一頁 / get 當前 path /
 * get 綁定 state 內容 / get 其他 state 內容 / dispatch 函式(呼叫 Action 用)
 *
 * 透過繼承方式即可使用上述函式
 */
class Counter extends BaseView {
  constructor(props, context) {
    super(props, context);
  }

  clickHandler = () => {
    /**
     * 使用 BaseView.dispatch method 將 Action 回傳值丟給 Reducer 處理
     * 因為已繼承 BaseView 因此可直接使用 this 來呼叫
     *
     * NOTICE :
     * - 此函式必須有 connect 才能使用 (見此頁最下方)
     * - 傳入的參數必須是 `Action 的執行結果` 而不是 Action 函式本身
     */
    this.dispatch(click());
  };

  resetHandler = () => {
    this.dispatch(reset());
  };

  render() {
    /**
     * 使用 getResponse 將與 Container 綁定的 state 內容取出
     */
    const counterState = this.getResponse();
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
 * connect 回傳 react-redux 的 connect 函式，
 * 用以綁定在 Configs.reducers 中設定的 state，當 state 內容改變時，會觸發 View 做處理
 *
 * 用法說明如下：
 * connect(state 名稱)(Component class name)
 */
export default connect('counterStore')(Counter);
