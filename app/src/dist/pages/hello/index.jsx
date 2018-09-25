import React, { Component, PureComponent } from 'react';

/**
 * Class 在 ES6 中被引入，相較於 ES5 更貼近傳統語言的寫法
 * ES6 的 Class 以及 import 使用請參閱：http://es6.ruanyifeng.com/#docs/module
 *
 * 建立一個 React Component 可以有以下幾種寫法：
 */

/**
 * 1. React.Component
 * 將類別 extends 自 React.Component，透過 React 底下 render 方法渲染畫面
 * 即可建構一個基本的 React 元件
 */
class Hello extends Component {
  render() {
    return <div>Hello World!</div>;
  }
}

/**
 * 2. React.PureComponent
 * 與 1.寫法相同，但繼承自 React.PureComponent，
 * 當組件的 props 與 state 發生變化，會各別與 nextProps 與 nextState 進行比較，
 * 依照比較結果判斷需不需要重新渲染
 *
 * !!需注意的是，PureComponent 進行的 props 與 state 資料比較為「淺比較」，
 * 意指無法進行過於複雜的結構比對
 */
class HelloPure extends PureComponent {
  render() {
    return <div>Hello World!</div>;
  }
}

/**
 * 3. Stateless Functional Component
 * 這種寫法沒有 state，也不能使用 component lifecycle，透過相同的 props 傳入，產出相同的結果
 */
const HelloFunctional = props => <div>Hello World!</div>;

export default Hello;
