##### ☆ Component

- **React.Component**
  將類別繼承自 React.Component，透過底下 render 方法渲染畫面，即可建構一個基本的 React 元件
  ``` js
  class Hello extends React.Component {
    render() {
      return <div>Hello World!</div>;
    }
  }
  ```

- **React.PureComponent**
  繼承自 React.PureComponent，當組件的 props 與 state 發生變化，會各別與 nextProps 與 nextState 進行淺比較，依照比較結果判斷需不需要重新渲染
  ``` js
  class Hello extends React.PureComponent {
    render() {
      return <div>Hello World!</div>;
    }
  }
  ```

- **Stateless Functional Component**
  這種寫法沒有 state，也不能使用 lifecycle，透過相同的 props 傳入，產出相同的結果
  ``` js
  const Hello = props => <div>Hello World!</div>;
  ```