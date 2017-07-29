/**
 * @flow
 */
import React from 'react';
/* component: locale hoc */
import LocaleHoc from '~/components/localeHoc';
import type { Props } from '~/components/localeHoc/Type';

export class Pure extends React.Component<void, Props, void> {
  props: Props;

  constructor(props: Props, context: any) {
    super(props, context);
  }

  render() {
    /**
     * 可由 props 取得 i18nText 函式
     * 使用方式與 BaseView.i18nText 用法相同
     */
    const { i18nText } = this.props;
    return (
      <div>
        <p>
          {i18nText('hello guest', { user: '泰戈爾' })}
        </p>
        <p>
          {i18nText('i cannot choose the best')}
        </p>
        <p>
          {i18nText('the best chooses me')}
        </p>
      </div>
    );
  }
}

/* 使用 Hoc 函式產出 pure component */
export default LocaleHoc(Pure);
