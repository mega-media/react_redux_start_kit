import React, { PureComponent } from 'react';
import { Dispatch, Store } from '../../core/container/hoc';
import { applyStyles } from '../../core/css-module';
import { click, reset } from './action';
import { STORE_KEY } from './constant';
/* helper */
import { compose, pickBy, keys, join, pipe } from 'ramda';

/**
 * 裝飾方法 applyStyles 可套用系統預設樣式
 * 系統預設樣式包含：Bootstrap / Font Awesome
 */
@applyStyles()
class Buttons extends PureComponent {
  clickHandler = style => () => {
    this.props.dispatch(click(style));
  };

  resetHandler = () => {
    this.props.dispatch(reset());
  };

  render() {
    /**
     * 使用系統預設樣式時，類別名稱為 `styleName`
     */
    return (
      <div>
        <div>
          You click :{' '}
          {pipe(pickBy((val, key) => val), keys, join(', '))(
            this.props.storeData
          )}
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

export default compose(Dispatch, Store(STORE_KEY))(Buttons);
