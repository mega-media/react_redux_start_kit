import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 語系轉換函式</h5>
      <h5>☆ 語系切換操作</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ 多國語系套件: redux-i18n</h5>
      <div>
        <ul>
          <li>
            語系檔路徑：<label>./app/dist/locales/</label>
          </li>
          <li styleName="text-danger">語系參數僅支援字串</li>
        </ul>
      </div>
      <h5>☆ BaseView.i18nLang</h5>
      <div>
        <ul>
          <li>繼承自 BaseView 的 Container，可直接呼叫 this.i18nLang 方法，取得目前語系</li>
        </ul>
      </div>
      <h5>☆ BaseView.i18nText</h5>
      <div>
        <ul>
          <li>繼承自 BaseView 的 Container，可直接呼叫 this.i18nText 方法</li>
          <li>
            舉例
            <pre>
              {`//語系檔`}
              <br />
              {`en: { 'hello': "Hello" }`}
              <br />
              <br />
              {`//container`}
              <br />
              {`this.i18nText('hello') // === "Hello" `}
            </pre>
          </li>
          <li>
            動態參數
            <pre>
              {`//語系檔`}
              <br />
              {`zh_tw: { 'number less': "輸入數值不能超過 {max}" }`}
              <br />
              <br />
              {`//container`}
              <br />
              {`this.i18nText('number less', { max: 5 }) // === "輸入數值不能超過 5" `}
            </pre>
          </li>
        </ul>
      </div>
      <h5>☆ LocaleHoc</h5>
      <div>
        <ul>
          <li>
            在component（沒有繼承 BaseView）使用語系，需透過<label>
              ./app/dist/components/localeHoc
            </label>
          </li>
          <li>LocaleHoc 將 BaseView.i18nText 函式以 props 方式傳入 component</li>
          <li>
            <pre>
              {`//component
import LocaleHoc from '~/components/localeHoc';
class Pure extends React.Component {
  render() {
    const { i18nText } = this.props;
    return (
      <div>
          {this.i18nText('hello')}
      </div>
    );
  }
}
export default LocaleHoc(Pure);`}
            </pre>
          </li>
        </ul>
      </div>
      <h5>☆ setLanguage</h5>
      <div>
        <ul>
          <li>redux-i18n 模組提供的切換語系 action</li>
          <li>
            在繼承自 BaseView 的 container 中，使用
            this.dispatch(setLanguage('en'))，即可切換語系
          </li>
        </ul>
      </div>
    </div>
  )
};
