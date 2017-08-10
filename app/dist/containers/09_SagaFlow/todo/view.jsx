/* @flow */
import React from 'react';
import BaseView, { applyStyles, connect } from '~/core/baseView';
import { insert, remove, update } from './action';
import TodoItem from '../todoItem/view';
import { STORE_KEY as USER_STORE_KEY } from '../user/constant';
import { STORE_KEY } from './constant';
import style from './assets/todo.scss';
import type { State } from './type';

@applyStyles(style)
export class Todo extends BaseView<void, any, State> {
  state: State;
  input: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      todos: [],
      visible: 'all'
    };
  }

  toggleVisible = (visible: 'all' | 'active' | 'completed') => () => {
    this.setState({ visible });
  };

  removeHandler = (id: number) => () => {
    const { todos } = this.state;
    todos.splice(todos.findIndex(todo => todo.id === id), 1);
    this.setState({ todos });
    this.dispatch(remove(id));
  };

  updateHandler = (id: number) => (columns: {
    title?: string,
    completed?: boolean
  }) => {
    this.dispatch(update(id, columns));
  };

  insertHandler = (e: Event) => {
    if (e.charCode === 13) {
      const { activeUserId } = this.getState(USER_STORE_KEY);
      this.dispatch(insert(activeUserId, this.input.value, false));
      this.input.value = '';
      this.input.blur();
    }
  };

  componentWillReceiveProps(nextProps: any) {
    this.setState({ todos: this.getResponse(nextProps) });
  }

  render() {
    const { todos, visible } = this.state;
    let filterTodos = todos.slice(0);
    switch (visible) {
      case 'active':
        filterTodos = filterTodos.filter(item => !item.completed);
        break;
      case 'completed':
        filterTodos = filterTodos.filter(item => item.completed);
        break;
    }

    return (
      <div>
        <div>
          <label>Todo list</label>
          <div styleName="pull-right">
            <a
              styleName={`filter ${visible === 'all' ? 'active' : ''}`}
              href="javascript:void(0)"
              onClick={this.toggleVisible('all')}>
              All
            </a>
            &nbsp;&nbsp;
            <a
              styleName={`filter ${visible === 'active' ? 'active' : ''}`}
              href="javascript:void(0)"
              onClick={this.toggleVisible('active')}>
              Active
            </a>
            &nbsp;&nbsp;
            <a
              styleName={`filter ${visible === 'completed' ? 'active' : ''}`}
              href="javascript:void(0)"
              onClick={this.toggleVisible('completed')}>
              Completed
            </a>
          </div>
        </div>
        <ul styleName="todo">
          {filterTodos.map(todo =>
            <TodoItem
              key={`todo-item-${todo.id}`}
              todo={todo}
              updateHandler={this.updateHandler(todo.id)}
              removeHandler={this.removeHandler(todo.id)}
            />
          )}
        </ul>
        <div styleName="form-group">
          <label>新增一筆 Todo 事項</label>
          <input
            ref={el => (this.input = el)}
            type="text"
            styleName="form-control"
            onKeyPress={this.insertHandler}
          />
        </div>
        <div styleName="alert alert-danger">Note: API 編輯操作並不真的影響來源伺服器資料</div>
      </div>
    );
  }
}

export default connect(STORE_KEY)(Todo);
