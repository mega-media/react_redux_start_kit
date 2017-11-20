import React, { Component } from 'react';
import { STORE_KEY } from './constant';
import { Dispatch, Store } from '~/core/container/hoc';
import { fetch } from './action';
import { compose } from 'ramda';
/* style */
import { applyStylesInline } from '../../core/css-module';
import type { Props } from './type';

export class apiIntro extends Component<void, Props, void> {
  props: Props;

  fetchHandler = () => {
    this.props.dispatch(fetch());
  };

  render() {
    const { storeData: { items } } = this.props;
    return (
      <div>
        <h4 />
        <h4 styleName="text-danger">
          注意：action effect - fetchAPI 使用
          <a
            href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch"
            target="_blank">
            {` Fetch API `}
          </a>實踐，並不支援非 HTTP 協定的串接<br /> (目前僅支援 json 格式)
        </h4>
        <div style={{ padding: '5px 10px 20px' }} />
        <div>
          <button styleName="btn btn-default" onClick={this.fetchHandler}>
            撈取 user 列表
          </button>
        </div>
        <div>
          {items.map(({ id, name }) =>
            <div key={id}>
              {name}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default compose(Dispatch, Store(STORE_KEY), applyStylesInline())(
  apiIntro
);
