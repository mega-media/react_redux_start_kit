import React from 'react';
import BaseView, { applyStyles, connect } from '~/core/baseView';
import { click, reset } from './action';
import { storeKey } from './constant';

/**
 * 裝飾方法 applyStyles 可套用系統預設樣式
 * 系統預設樣式包含：Bootstrap / Font Awesome
 */
@applyStyles()
class Buttons extends BaseView {
  constructor(props, context) {
    super(props, context);
  }

  clickHandler = style => () => {
    this.dispatch(click(style));
  };

  resetHandler = () => {
    this.dispatch(reset());
  };

  render() {
    const counterState = this.getResponse();
    const activeArray = Object.keys(counterState).filter(
      style => counterState[style]
    );
    /**
     * 使用系統預設樣式時，類別名稱為 `styleName`
     */
    return (
      <div>
        <div>
          You click : {activeArray.join(' , ')}
        </div>
        <br />
        <div styleName="btn-toolbar">
          <div styleName="btn-group">
            <button
              styleName="btn btn-primary"
              onClick={this.clickHandler('primary')}>
              PRIMARY
            </button>
            <button
              styleName="btn btn-success"
              onClick={this.clickHandler('success')}>
              SUCCESS
            </button>
            <button
              styleName="btn btn-warning"
              onClick={this.clickHandler('warning')}>
              WARNING
            </button>
            <button
              styleName="btn btn-danger"
              onClick={this.clickHandler('danger')}>
              DANGER
            </button>
          </div>
          <div styleName="btn-group">
            <button styleName="btn btn-default" onClick={this.resetHandler}>
              Reset Counter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(storeKey)(Buttons);
