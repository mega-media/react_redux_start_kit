/* @flow */
import React, { PureComponent } from 'react';
import { applyStyles } from '../../../core/css-module';
import style from './assets/todoItem.scss';
import type { Props, State } from './type';

@applyStyles(style)
export default class TodoItem extends PureComponent<void, Props, State> {
  props: Props;
  state: State;
  input: any;

  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      modify: false
    };
  }

  /**
   * input element onKeyPress event
   */
  eventHandler = (e: Event) => {
    if (e.charCode === 13) {
      /* 按下 enter 執行 */
      const { updateHandler } = this.props;
      updateHandler({ title: this.input.value });
      this.input.blur();
    }
  };

  /**
   * completed edit
   * @param completed {boolean}
   */
  completeHandler = (completed: boolean) => () => {
    const { updateHandler } = this.props;
    updateHandler({ completed });
  };

  /**
   * 顯示狀態切換
   */
  toggleModify = () => {
    this.setState({ modify: !this.state.modify });
  };

  componentDidUpdate() {
    /* 編輯狀態的時候，游標 focus input element */
    if (this.state.modify) this.input.focus();
  }

  render() {
    const { todo: { id, title, completed }, removeHandler } = this.props;
    const { modify } = this.state;
    return (
      <li styleName={`todo-item text-right ${completed ? 'completed' : ''}`}>
        {modify
          ? <input
              ref={el => (this.input = el)}
              type="text"
              styleName="form-control"
              defaultValue={title}
              onBlur={this.toggleModify}
              onKeyPress={this.eventHandler}
            />
          : [
              <span
                key="todo-text"
                styleName="pull-left text-left text"
                onClick={this.toggleModify}>
                {title}
              </span>,
              <span
                key="todo-icon-complete"
                styleName={`icon complete ${completed ? 'active' : ''}`}
                onClick={this.completeHandler(!completed)}>
                <i styleName="glyphicon glyphicon-ok" title="completed" />
              </span>,
              <span
                key="todo-icon-remove"
                styleName="icon remove"
                onClick={removeHandler}>
                <i styleName="glyphicon glyphicon-remove" title="remove" />
              </span>
            ]}
      </li>
    );
  }
}
