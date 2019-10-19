<style>.break-line{margin: 15px 0; border: 0;}</style>
### **withDispatch**
元件需要呼叫 action 去改變 store 內容時使用

#### **dispatch(action)**
`Function(action: Action) => void`
改變 store 資料內容的重要函式。由 react-redux connect 給予。
``` js
// action 是一個帶有 type 的物件
this.props.dispatch({ type: 'typeA', payload: { foo: true } });

// 支援陣列
this.props.dispatch([
  { type: 'typeA', payload: { foo: true } },
  { type: 'typeB', payload: { bar: true } }
]);

// Promise
this.props.dispatch(new Promise(resolve => { ... } ));
```

<hr class="break-line" />

#### **storeSelector([ storeKey ])**
`Function(storeKey?: string) => any`
用來拿其他沒有透過 withStore 綁定的資料，支援同時拿取多筆資料。

``` js
//假設 store 長這樣
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
```
---
### **withI18n**
元件需要多國語系轉換時用

#### **i18nText(alias[, params])**
`Function(alias: string, params?: Object) => string`
轉換語系的函式，回傳為轉換後的結果。僅支援文字格式的轉換。
``` js
//語系檔
{
  en: { 'hello': "Hello" }
  zh_tw: { 'number less': "輸入數值不能超過 {max}" }
}

//component
this.props.i18nText('hello') // === "Hello"
this.props.i18nText('number less', { max: 5 }) // === "輸入數值不能超過 5"
```

<hr class="break-line" />

#### **i18nLang**
`string`
取得當前使用語系
``` js
/* redux-i18n 模組提供的切換語系 action */
import { setLanguage } from 'redux-i18n';

class MyLocale extends React.Component {
  componentDidMount() {
    /* 切換語系到 zh_tw */
    this.props.dispatch(setLanguage('zh_tw'));
  }

  render() {
    // <div>locale lang: zh_tw </div>
    return <div>locale lang: { this.props.i18nLang } </div>
  }
}

export default withDispatch(MyLocale);
```

---

### **withStore(storeKeysOrObjec)**
綁定 store 資料用，以監聽 store 資料變化
**storeKeysOrObject** 允許使用 `string` 、 `Object` 、 `Array`，不同格式的綁定方式與說明如下：

#### **type: string**
``` js
//綁定單筆資料
withStore("myKey")
//然後你會拿到 {`{ myKey: [data] }`}

//也可直接指向路徑
withStore("myStore.field.0.key")
//會拿到 {`{ 'myStore.field.0.key': [data] }`}

//綁定多筆資料，只有格式為字串才允許這樣綁
withStore("myKeyA", "myKeyB")
//結果為 {`{ myKeyA: [data], myKeyB: [data] }`}
```
> 回傳的資料型別為 `Object` 並使用綁定的字串做為鍵值

#### **type: Object({string: string})**
``` js
withStore({ "myKey": "renameKey" })
// { renameKey: [data] }

withStore({ "myStore.field.0.key": "newKey" })
// { newKey: [data] }

withStore(
  "myStore.field.0.key": "newKey"
  "myStore.another.key": "anotherKey"
})
// { newKey: [data], anotherKey: [data] }`}
```
> 將綁定的鍵值做更名

#### **type: Array(string[])**
``` js
withStore(["myKeyA", "myKeyB"])
// { myKeyA: [data], myKeyB: [data] }
```

> 回傳的資料型別為 `Object` 並使用綁定的字串做為鍵值

---

### **withStyle(...cs)**
樣式檔嵌入用，預設樣式包含：Bootstrap(v3.3.7)、Font Awesome(v4.6.3)
**css**: 元件要套用的樣式檔，支援多筆。需注意的是，若命名相同的類別名稱，後面引入的樣式檔案會蓋掉前者。

``` js
import scssA from './scss-a.scss';
import scssB from './scss-b.scss';
import scssC from './scss-c.scss';

export default withStyle(scssA, scssB, scssC)(YourComponent);
```

---

### **withMount(didMoun)**
簡化生命週期 `componentDidMount`、`componentWillUnmount` 的使用

#### **didMount**
`Function(props:Object) => void | (props:Object) => void`
componentDidMount 邏輯，可以沒有回傳值。若有回傳值需為方法格式，將在 componentWillUnmount 時呼叫。

``` js
const unMount = props =>
  //componentWillUnmount logic
}

const didMount = props => }
  //do something when component did mount
  return unMount;
  //return unMount; //若不需要處理離開事件，也可以不要回傳值
}

export default withMount(didMount)(YourComponent);
```