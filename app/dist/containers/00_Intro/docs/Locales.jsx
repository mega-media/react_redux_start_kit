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
      <h5>
        ☆ container hoc - <a href="/hoc#withI18n">withI18n</a>
      </h5>
      <div>
        <ul>
          <li>
            使用 hoc 將語系函式以 props 方式傳入 component
            <pre>
              {`import { withI18n } from '~/core/container';
export default withI18n(Component) `}
            </pre>
          </li>
          <li>
            舉例
            <pre>
              {`//語系檔`}
              <br />
              {`en: { 'hello': "Hello" }`}
              <br />
              <br />
              {`//component`}
              <br />
              {`this.props.i18nText('hello') // === "Hello" `}
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
              {`//component`}
              <br />
              {`this.props.i18nText('number less', { max: 5 }) // === "輸入數值不能超過 5" `}
            </pre>
          </li>
        </ul>
      </div>
      <h5>☆ setLanguage</h5>
      <div>
        <ul>
          <li>redux-i18n 模組提供的切換語系 action</li>
          <li>
            需要與 withDispatch hoc 元件，搭配使用
            <pre>{`import { compose, withDispatch, withI18n } from '~/core/container/hoc';

export default compose(withDispatch, withI18n)(YOUR_COMPONENT)`}</pre>
          </li>
          <li>this.props.dispatch(setLanguage('en'))，即可切換語系</li>
        </ul>
      </div>
    </div>
  )
};
