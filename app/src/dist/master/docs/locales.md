##### ☆ 多國語系套件 [redux-i18n](https://github.com/APSL/redux-i18n)

語系檔路徑: `app/src/locales`

**NOTICE!!** 語系參數僅支援字串

---

##### ☆ container hoc - withI18n

使用 hoc 將語系函式以 props 方式傳入 component

``` js
// 語系檔.js
{ en: { 'hello': "你好" } }

// component.jsx
import { withI18n } from '@core/container';

class MyComponent extends React.Component {
  render() {
    return <div>{this.props.i18nText('hello')}</div>
  }
}
export default withI18n(MyComponent)

// another component.jsx
<MyComponent />
//= <div>你好</div>
```

支援傳入動態參數

``` js
// 語系檔.js
{ zh_tw: { 'number less': "輸入數值不能超過 {max}" } }

// component.jsx
import { withI18n } from '@core/container';

class MyComponent extends React.Component {
  render() {
    return <div>{this.props.i18nText('number less', { max: 5 })}</div>
  }
}
export default withI18n(MyComponent)

// another component.jsx
<MyComponent />
//= <div>輸入數值不能超過 5</div>
```

---

##### ☆ setLanguage

- redux-i18n 模組提供的切換語系 action
- 需要與 withDispatch hoc 元件，搭配使用
``` js
import { compose, withDispatch, withI18n } from '@core/container/hoc';
import { setLanguage } from 'redux-i18n';

class MyComponent extends React.Component {
  changeLocale = lang => () => this.props.dispatch(setLanguage(lang));

  render() {
    return (
      <div>
        目前使用的語系為 {this.props.i18nLang}
        <br />
        <button onClick={this.changeLocale('en')}>en</button>
        <button onClick={this.changeLocale('zh_tw')}>zh_tw</button>
      </div>
    )
  }
}

export default compose(withDispatch, withI18n)(MyComponent)
```
