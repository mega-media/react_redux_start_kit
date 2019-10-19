import React, { Component } from 'react';
import { emit } from '@core/action/effects';
import { compose, withStore, withDispatch } from '@core/container';
import MarkdownToHtml from '../../shared/markdown-to-html';
import observableMd from './observable.md';

class Observable extends Component {
  ping = () => {
    /* 與 saga effect 不衝突 */
    this.props.dispatch(emit('PING'));
  };

  render() {
    const {
      observable: { isPinging }
    } = this.props;
    return (
      <div>
        <MarkdownToHtml>{observableMd}</MarkdownToHtml>
        <h1>is pinging: {isPinging.toString()}</h1>
        <br />
        <button onClick={this.ping}>Start PING</button>
        <br />
        <br />
        <helper>NOTE: 點擊後一秒回復狀態</helper>
      </div>
    );
  }
}

export default compose(
  withDispatch,
  withStore('observable')
)(Observable);
