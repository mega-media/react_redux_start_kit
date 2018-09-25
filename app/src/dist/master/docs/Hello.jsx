import React from 'react';

module.exports = {
  target: (
    <div>
      <h5>☆ 建構簡易React Element</h5>
    </div>
  ),
  desc: (
    <div>
      <h5>☆ Component</h5>
      <div>
        <ul>
          <li>
            <b>React.Component</b>
            <div>
              將類別繼承自 React.Component，透過底下 render
              方法渲染畫面，即可建構一個基本的 React 元件
            </div>
            <pre className="prettyprint">{`class Hello extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}`}</pre>
          </li>
          <li>
            <b>React.PureComponent</b>
            <div>
              繼承自 React.PureComponent，當組件的 props 與 state
              發生變化，會各別與 nextProps 與 nextState
              進行淺比較，依照比較結果判斷需不需要重新渲染
            </div>
            <pre className="prettyprint">{`class Hello extends React.PureComponent {
  render() {
    return <div>Hello World!</div>;
  }
}`}</pre>
          </li>
          <li>
            <b>Stateless Functional Component</b>
            <div>
              這種寫法沒有 state，也不能使用 lifecycle，透過相同的 props
              傳入，產出相同的結果
            </div>
            <pre className="prettyprint">{`const Hello = props => <div>Hello World!</div>;`}</pre>
          </li>
        </ul>
      </div>
    </div>
  )
};
