import React from 'react';
/* style */
import Style from '../../core/container/hoc/style';

export const hocIntro = () => (
  <div>
    <h4 id="dispatch">
      <a href="#dispatch" style={{ color: '#000' }}>
        # Dispatch(component)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>元件需要呼叫 action 去改變 store 內容時使用</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>component</b>
        </div>
        <div styleName="panel-body">
          Type: Component
          <br />
          元件，React.Component 或者 Stateless Functional Component
        </div>
      </div>
      <pre>{`export default Dispatch(YourComponent);`}</pre>
      <b>props：</b>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>dispatch(action)</b>
        </div>
        <div styleName="panel-body">
          Type: Function(action: Action) => void
          <p>改變 store 資料內容的重要函式。由 react-redux connect 給予。</p>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>action</b>
            </div>
            <div styleName="panel-body">
              Type: Action
              <br />
              一個包含 type、payload 兩個鍵值的物件
              <pre>
                {`//component`}
                <br />
                {`this.props.dispatch({ type: 'typeA', payload: { foo: true } })`}
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>storeSelector([storeKey])</b>
        </div>
        <div styleName="panel-body">
          Type: Function(storeKey?: string) => any
          <p>
            用來拿其他沒有透過 <a href="#store">Store</a> 綁定的 store
            資料，支援同時拿取多筆資料。
          </p>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>storeKey</b>
            </div>
            <div styleName="panel-body">
              Type: string
              <pre>{`//假設 store 長這樣
store = {
  keyA: [1, 2, 3],
  keyB: {
    foo: 100,
    bar: 200
  },
  keyC: true
}

/* 拿一筆資料 */
const A = this.props.storeSelector(keyA);
console.log(A); // [1, 2, 3]

/* 取得某個物件屬性 */
const B = this.props.storeSelector('keyB.bar');
console.log(B); // 200

/* 多筆時，回傳的資料會按傳入順序包在陣列裡面 */
const [ A, C ] = this.props.storeSelector(keyA, keyC);
console.log(A); // [1, 2, 3]
console.log(C); // true
`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 id="i18n">
      <a href="#i18n" style={{ color: '#000' }}>
        # I18n(component)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>元件需要多國語系轉換時用</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>component</b>
        </div>
        <div styleName="panel-body">
          Type: Component
          <br />
          元件，React.Component 或者 Stateless Functional Component
        </div>
      </div>
      <pre>{`export default I18n(YourComponent);`}</pre>
      <b>props：</b>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>i18nText(alias[, params])</b>
        </div>
        <div styleName="panel-body">
          Type: Function(alias: string, params?: Object) => string
          <p>轉換語系的函式，回傳為轉換後的結果。僅支援文字格式的轉換。</p>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>alias</b>
            </div>
            <div styleName="panel-body">
              Type: string
              <br />
              語系檔鍵值，即是該文字對應的別名。
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
            </div>
          </div>
          <div styleName="panel panel-default">
            <div styleName="panel-heading">
              <b>params</b>
            </div>
            <div styleName="panel-body">
              Type: Object
              <br />
              支援動態運算，可帶入替換的文字。
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
            </div>
          </div>
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>i18nLang</b>
        </div>
        <div styleName="panel-body">
          Type: string
          <br />
          取得當前使用語系
          <pre>
            {`//component`}
            <br />
            {`this.props.i18nLang // === "zh_tw" `}
          </pre>
        </div>
      </div>
    </div>
    <h4 id="store">
      <a href="#store" style={{ color: '#000' }}>
        # Store(...storeKeys)(component)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>綁定 store 資料用，以監聽 store 資料變化</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>storeKeys</b>
        </div>
        <div styleName="panel-body">
          Type: string
          <br />
          store 資料的 key，支援多筆。當監聽的值為多筆，回傳的資料為 Object
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>component</b>
        </div>
        <div styleName="panel-body">
          Type: Component
          <br />
          元件，React.Component 或者 Stateless Functional Component
        </div>
      </div>
      <pre>{`export default Store(keyA, keyB, keyC)(YourComponent);`}</pre>
      <b>props：</b>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>storeData</b>
        </div>
        <div styleName="panel-body">
          Type: any
          <br />
          監聽的 store 資料，依照監聽的 storeKeys 會有不同的格式。
          <pre>{`//假設 store 長這樣
store = {
  keyA: [1, 2, 3],
  keyB: {
    foo: 100,
    bar: 200
  },
  keyC: true,
  keyD: { baz: [{ qux: 300 }] }
}

/* 綁定單一個 store */
//Store(keyA)(YourComponent)
const { storeData } = this.props;
console.log(storeData); // [1, 2, 3]

/* 綁定多個 store */
//Store(keyA, keyC)(YourComponent)
const { storeData } = this.props;
console.log(storeData); // { keyA: [1, 2, 3], keyC: true }

/* 取得某個物件屬性 */
//Store('keyB.foo')(YourComponent)
const { storeData } = this.props;
console.log(storeData); // 100

/* 取得某個路徑內容 */
//Store({ keyD: ['baz', 0, 'qux'] })(YourComponent)
const { storeData } = this.props;
console.log(storeData); // 300

/* 綁定多個 store */
//Store('keyB.foo', keyC, { keyD: ['baz', 0, 'qux'] })(YourComponent)
const { storeData } = this.props;
console.log(storeData); // { 'keyB.foo': 100, keyC: true, 'keyD.baz.0.qux': 300 }
`}</pre>
        </div>
      </div>
    </div>
    <h4 id="style">
      <a href="#style" style={{ color: '#000' }}>
        # Style(...css)(component)
      </a>
    </h4>
    <div style={{ padding: '5px 10px 20px' }}>
      <p>樣式檔嵌入用，預設樣式包含：Bootstrap(v3.3.7)、Font Awesome(v4.6.3)</p>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>css</b>
        </div>
        <div styleName="panel-body">
          Type: Object
          <br />
          元件要套用的樣式檔，支援多筆。需注意的是，若命名相同的類別名稱，後面引入的樣式檔案會蓋掉前者。
        </div>
      </div>
      <div styleName="panel panel-default">
        <div styleName="panel-heading">
          <b>component</b>
        </div>
        <div styleName="panel-body">
          Type: Component
          <br />
          元件，React.Component 或者 Stateless Functional Component
        </div>
      </div>
      <pre>{`import scssA from './scss-a.scss';
import scssB from './scss-b.scss';
import scssC from './scss-c.scss';

export default Style(scssA, scssB, scssC)(YourComponent);
`}</pre>
    </div>
  </div>
);

export default Style()(hocIntro);
