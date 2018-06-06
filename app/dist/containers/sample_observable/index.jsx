import React, { Component } from 'react';
import { emit } from '~/core/action/effects';
import { compose, withStore, withDispatch } from '~/core/container';
import { PING, STORE_KEY } from './constant';

class Observable extends Component {
  ping = () => {
    /* 與 saga effect 不衝突 */
    this.props.dispatch(emit(PING));
  };

  render() {
    const {
      storeData: { isPinging }
    } = this.props;
    return (
      <div>
        這是擴充檔案 app/extensions/store.middleware/redux-observable.js
        的使用範例。<br />
        <br />
        引用來自{' '}
        <a
          href="https://github.com/redux-observable/redux-observable"
          target="_blank">
          https://github.com/redux-observable/redux-observable
        </a>:{' '}
        <a href="http://jsbin.com/jexomi/edit?js,output" target="_blank">
          Online Live Examples - Using React
        </a>
        <br />
        <br />
        <pre>需要安裝的模組：redux-observable、rxjs、rxjs-compat</pre>
        <hr />
        <h1>is pinging: {isPinging.toString()}</h1>
        <br />
        <button onClick={this.ping}>Start PING</button>
      </div>
    );
  }
}

export default compose(
  withDispatch,
  withStore(STORE_KEY)
)(Observable);
