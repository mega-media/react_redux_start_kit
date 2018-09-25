import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 高階組件(Higher-Order Components)</h5>
      <h5>☆ 組合系統中的高階組件</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>
        ☆{' '}
        <a
          href="https://reactjs.org/docs/higher-order-components.html"
          target="_blank"
        >
          高階組件(Higher-Order Components)
        </a>
      </h5>
      <div>
        <ul>
          <li>高階組件是一個函式</li>
          <li>
            函式接受元件的傳入，接著回傳一個新的元件
            <pre className="prettyprint">{`function SampleHoc(WrappedComponent) {
  /* 回傳一個新元件 */
  return class extends React.component {
    render() {
      /* 渲染舊元件 */
      return <WrappedComponent
              /* 賦予舊元件一個新的屬性\`newProps\` */
              newProps="newProps"
              /* 將上層傳入的props繼續往下傳 */
              {...this.props}
              />
    }
  }
}
// 宣告（注意：不要在 render 函式中宣告)
const NewComponent = SampleHoc(OldComponent);

// 在元件中渲染
<NewComponent />
`}</pre>
          </li>
        </ul>
      </div>
      <h5>
        ☆ 組合系統中的高階組件: <label>compose</label>{' '}
      </h5>
      <div>
        <ul>
          <li>
            compose 函式: 由右到左來組合多個函式
            <pre className="prettyprint">{`fnA(fnB(fnC(value)));
// 即是
compose(fnA, fnB, fnC)(value);
`}</pre>
          </li>
          <li>
            使用範例
            <pre className="prettyprint">{`compose(
  withDispatch,
  withStore(STORE_KEY),
  withStyle()
)(WrapperComponent)`}</pre>
          </li>
        </ul>
      </div>
      <h5>☆ 為何使用高階組件 </h5>
      <div>
        <ul>
          <li>能在不改變原始元件的情況下添加屬性</li>
          <li>通用邏輯可以共用</li>
        </ul>
      </div>
      <h5>☆ 注意事項 </h5>
      <div>
        <ul>
          <li>
            <b>不要在render中使用高階组件</b>
            ：這將使每次父元件渲染都造成子元件的卸載再建立
          </li>
          <li>
            <b>Refs属性不能傳遞</b>
            ：偽屬性Refs只用來指向最外層的元件
          </li>
        </ul>
      </div>
    </div>
  )
};
