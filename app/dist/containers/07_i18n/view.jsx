/**
 * @flow
 */
import React from 'react';
import BaseView, { applyStyles, connect } from '~/core/baseView';
/* redux-i18n 模組提供的切換語系 action */
import { setLanguage } from 'redux-i18n';
import Pure from './pure/index';

@applyStyles()
export class I18N extends BaseView<void, any, void> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  changeLocale: (lang: string) => () => void = (lang: string) => () =>
    this.dispatch(setLanguage(lang));

  render() {
    return (
      <div>
        <p>
          {/* i18nLang() 取得當前使用語系 */}
          目前使用的語系為：{this.i18nLang()}
        </p>
        <pre>
          {/* i18nText() 取得語系文字 */}
          <p>
            {this.i18nText('hello guest', { user: '泰戈爾' })}
          </p>
          <p>
            {this.i18nText('i cannot choose the best')}
          </p>
          <p>
            {this.i18nText('the best chooses me')}
          </p>
        </pre>
        locale in component
        <pre>
          <Pure />
        </pre>
        <div>
          <div>語系切換</div>
          <div styleName="btn-group">
            <button
              type="button"
              styleName="btn btn-default"
              onClick={this.changeLocale('en')}>
              en
            </button>
            <button
              type="button"
              styleName="btn btn-default"
              onClick={this.changeLocale('zh_tw')}>
              zh_tw
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(I18N);
