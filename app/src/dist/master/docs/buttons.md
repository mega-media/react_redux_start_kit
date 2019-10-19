##### ☆ css-module 套用系統樣式檔

系統預設樣式有：[Bootstrap](http://getbootstrap.com/)、[Font Awesome](http://fontawesome.io/)

要套用樣式屬性名稱須為 `styleName` 而非 className

#### **applyStyles**

使用 ES7 Decorator 的方式加上符號 `@` 標記在 Container/Component 上方

``` js
import { applyStyles } from '@core/container';

@applyStyles()
export default class YourComponent extends React.Component { ... }
```

---

#### **withStyle**

使用 HOC 嵌套，將樣式檔帶入元件中，HOC 相關說明可參閱 [9. Container HOC](/hoc)
``` js
import { withStyle } from '@core/container';

export class YourComponent extends React.Component { ... }
export default withStyle()(YourComponent);
```

與其他 HOC 組合，需注意的是 css-module 只會轉換第一層元件，因此函式順序必須放在最接近元件的位置

``` js
import { compose, withDispatch, withStore, withStyle } from '@core/container';

class YourComponent extends React.Component { ... }

export default compose(
  withDispatch,
  withStore(STORE_KEY),
  withStyle()
)(YourComponent);
```

---

##### ☆ Action 其他格式

- 除了 type 之外，另一個允許的格式為 `payload`
- 需要傳遞的參數皆放置在 `payload` 之下
- core/action/effect 提供 `emit` 函式，建立一個 Action Object

``` js
emit(TYPE_A, { data: [1, 2, 3] });
//就等於 { type: TYPE_A, payload: { data: [ 1, 2, 3 ] }}

//沒有 payload 時允許空值：
emit(TYPE_A);
//等於 { type: TYPE_A }
```