/* @flow */
import React, { Component } from 'react';
import { STORE_KEY } from './constant';
import { compose, withDispatch, withStore, withStyle } from '~/core/container';
import { fetch } from './action';
/* style */
import type { Props } from './type';

export class ApiIntro extends Component<Props, void> {
  props: Props;

  fetchHandler = () => {
    this.props.dispatch(fetch());
  };

  render() {
    const { storeData: { items } } = this.props;
    return (
      <div>
        這是擴充檔案 action.effects/fetch-api.js 的使用範例。
        <h4 styleName="text-danger">
          注意：此章節使用
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
        <div>{items.map(({ id, name }) => <div key={id}>{name}</div>)}</div>
        <hr />
        使用說明：
        <h4># fetchApi(api_code, opts)</h4>
        <div style={{ padding: '5px 10px 20px' }}>
          <p>發送一個 api request，目前支援 json 格式的串接，詳細說明參閱 </p>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>api_code</b>
            </div>
            <div styleName="panel-body">
              Type: <label>string</label> <br />
              API 別名，作為發送(request)與(response)行為之間的聯繫
            </div>
          </div>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>opts</b>
            </div>
            <div styleName="panel-body">
              Type: <label>Object</label>
              <div styleName="panel panel-default">
                <div styleName="panel-heading">
                  <b>body</b>
                </div>
                <div styleName="panel-body">
                  Type: <label>string</label> | <label>FormData</label> <br />
                  加到 request 中的內容資料。當 method 為 get、head
                  時不使用這個值。
                </div>
              </div>
              <div styleName="panel panel-default">
                <div styleName="panel-heading">
                  <b>method</b>
                </div>
                <div styleName="panel-body">
                  Type: <label>string</label> <br />
                  request 的方法，包含：GET、POST、PUT、DELETE、HEAD
                </div>
              </div>
              <div styleName="panel panel-default">
                <div styleName="panel-heading">
                  <b>middleware</b>
                </div>
                <div styleName="panel-body">
                  Type: <label>{`Function | Array<Function>`}</label> <br />
                  非必填，放在 response.json() 後執行的中介函式，
                </div>
              </div>
              <div styleName="panel panel-default">
                <div styleName="panel-heading">
                  <b>url</b>
                </div>
                <div styleName="panel-body">
                  Type: <label>string</label> <br />
                  請求的網址
                </div>
              </div>
            </div>
          </div>
          <pre className="prettyprint">{`dispatch(fetchApi(GET_USER_LIST, { method: 'get', path: '/user' }))`}</pre>
        </div>
        <h4 />
      </div>
    );
  }
}

export default compose(withDispatch, withStore(STORE_KEY), withStyle())(
  ApiIntro
);
