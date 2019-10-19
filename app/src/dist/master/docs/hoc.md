##### ☆ [高階組件(Higher-Order Components)](https://reactjs.org/docs/higher-order-components.html)

高階組件是一個函式。函式接受元件的傳入，接著回傳一個新的元件

``` js
function SampleHoc( WrappedComponent ) {
  /* 回傳一個新元件 */
  return class extends React.component {
    render() {
      /* 渲染舊元件 */
      return <WrappedComponent
              /* 賦予舊元件一個新的屬性 newProps */
              newProps="newProps"
              /* 將上層傳入的props繼續往下傳 */
              {...this.props}
              />
    }
  }
}
```

---

##### ☆ 組合系統中的高階組件: `compose`

由右到左來組合多個函式

``` js
compose(
  withDispatch,
  withStore(STORE_KEY),
  withStyle()
)(WrapperComponent);

// = withDispatch(withStore(STORE_KEY)(withStyle()(WrapperComponent)))
```

---

##### ☆ 為何使用高階組件

- 能在不改變原始元件的情況下添加屬性
- 通用邏輯可以共用

---

##### ☆ 注意事項

- **不要在render中使用高階组件**：這將使每次父元件渲染都造成子元件的卸載再建立
- **Refs属性不能傳遞**：偽屬性Refs只用來指向最外層的元件
