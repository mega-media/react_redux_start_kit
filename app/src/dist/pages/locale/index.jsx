/**
 * @flow
 */
import React, { PureComponent } from 'react';
import { compose, withDispatch, withI18n, applyStyles } from '@core/container';
/* redux-i18n 模組提供的切換語系 action */
import { setLanguage } from 'redux-i18n';

@applyStyles()
export class I18N extends PureComponent<any, void> {
  changeLocale = (lang: string) => () => this.props.dispatch(setLanguage(lang));

  render() {
    const { i18nText, i18nLang } = this.props;
    return (
      <div>
        <p>
          {/* i18nLang 取得當前使用語系 */}
          目前使用的語系為：
          {i18nLang}
        </p>
        <pre>
          {/* i18nText() 轉換語系文字 */}
          <p>{i18nText('hello guest', { user: '泰戈爾' })}</p>
          <p>{i18nText('i cannot choose the best')}</p>
          <p>{i18nText('the best chooses me')}</p>
        </pre>
        <div>
          <div>語系切換</div>
          <div styleName="btn-group">
            <button
              type="button"
              styleName="btn btn-default"
              onClick={this.changeLocale('en')}
            >
              en
            </button>
            <button
              type="button"
              styleName="btn btn-default"
              onClick={this.changeLocale('zh_tw')}
            >
              zh_tw
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withDispatch,
  withI18n
)(I18N);
