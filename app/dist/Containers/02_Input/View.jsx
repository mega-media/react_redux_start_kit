/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';

export default class Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    /**
         * 設定 state 預設值
         * The ES5 way
         * getInitialState: function() {
         *   return {
         *      name: null
         *   };
         * }
         */
    this.state = {
      name: null
    };
  }

  changeHandler() {
    /**
         * setState 可以變更 state 內容
         * 要注意的是：變更 state 會讓畫面重新渲染(會執行render)
         */
    this.setState({ name: this.refs.name.value });
    /**
         * 使用屬性 refs 可取得元件內容
         * this.refs.XXX  => XXX 則是 element 屬性 ref 定義的內容
         */
  }

  render() {
    /* 取得 state.name */
    const { name } = this.state;

    /**
         * 賦予元件屬性 ref 可在類別中使用 this.refs.XXX 取得元件內容
         *
         * JSX 中可兼容許多 html tag 的屬性，但是由兩個單字組成的需要使用駝峰式名稱
         * 像是 : readOnly, onClick, onChange ... 等
         */
    return (
      <div>
        Who are you?{' '}
        <input
          ref="name"
          placeholder="input your name..."
          onChange={this.changeHandler.bind(this)}
        />
        <SayHello name={name} />
      </div>
    );
  }
}

/**
 * 在畫面中添加另一個 Component，只需像使用 Tag 的方式即可
 * 傳值方式則像添加屬性值：<SayHello name={name}/>
 * 上述的意思為：將 name 透過 props 的方式傳給 Component.SayHello
 */

class SayHello extends React.Component {
  constructor(props, context) {
    super(props, context);
    /**
         * 由 Input 傳過來的 name 可在此接收 : props.name
         */
  }

  render() {
    /**
         * 或直接在渲染時取出 props 值
         */
    const { name } = this.props;
    return (
      <div>
        Hello ! {name}
      </div>
    );
  }
}
