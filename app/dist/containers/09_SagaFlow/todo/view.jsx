/* @flow */
import React, { Component } from 'react';
import { Dispatch, Store } from '../../../core/container/hoc';
import { applyStyles } from '../../../core/css-module';

/* constants */
import { STORE_KEY as USER_STORE_KEY } from '../user/constant';
import { STORE_KEY } from './constant';

/* action */
import { insert, remove, update, save } from './action';

/* component */
import TodoItem from '../todoItem/view';

/* helper */
import { ArrayEqual } from '~/helpers/equal';
import { compose } from 'ramda';

/* style */
import style from './assets/todo.scss';

/* type */
import type { Props, State, TodoData } from './type';

@applyStyles(style)
export class Todo extends Component<void, Props, State> {
  props: Props;
  input: any;
  state: State = {
    todos: [],
    visible: 'all'
  };

  /**
   * 切換顯示
   * @param visible {enum:'all' | 'active' | 'completed'}
   */
  toggleVisible = (visible: 'all' | 'active' | 'completed') => () => {
    this.setState((prevState, props) => ({
      visible,
      todos: this.todoFilter(props.storeData, visible)
    }));
  };

  /**
   * 移除項目
   * @param id
   * @return () => void
   */
  removeHandler = (id: number) => () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id)
    }));
    const todos = this.props.storeData;
    this.props.dispatch([
      remove(id),
      /* 更新刪除後的資料 */
      save(todos.filter(todo => todo.id !== id))
    ]);
  };

  /**
   * 更新項目
   * @param id
   * @return (columns:{title?: string,completed?: boolean}) => void
   */
  updateHandler = (id: number) => (columns: {
    title?: string,
    completed?: boolean
  }) => {
    this.props.dispatch(update(id, columns));
  };

  /**
   * 輸入框 onKeyPress 事件
   * @param e
   */
  insertHandler = (e: Event) => {
    /* 按下 enter 時執行 */
    if (e.charCode === 13) {
      /* 取得目前 user id */
      const { activeUserId } = this.props.storeSelector(USER_STORE_KEY);
      this.props.dispatch(insert(activeUserId, this.input.value, false));
      /* 輸入框清空 */
      this.input.value = '';
      this.input.blur();
    }
  };

  /**
   * 更新 state.todos
   * @param todos
   */
  saveToState = (todos: Array<TodoData>) => {
    this.setState(({ visible }) => ({
      todos: this.todoFilter(todos, visible)
    }));
  };

  /**
   * 根據顯示條件做 todos 資料篩選
   * @param todos
   * @param visible
   * @returns {Array<TodoData>}
   */
  todoFilter = (
    todos: Array<TodoData>,
    visible: 'all' | 'active' | 'completed'
  ) => {
    /* 顯示篩選 */
    switch (visible) {
      case 'active':
        return todos.filter(item => !item.completed);
      case 'completed':
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  };

  componentWillReceiveProps(nextProps: any) {
    /* 資料有變更的時候更新 */
    this.saveToState(nextProps.storeData);
  }

  shouldComponentUpdate(nextProps: any, nextState: State) {
    /* 比對 state.todos 資料有沒有改變，有的話回傳 true */
    return !ArrayEqual(this.state.todos, nextState.todos);
  }

  componentWillMount() {
    /* 第一次渲染就取出 store 裡面的資料 */
    this.saveToState(this.props.storeData);
  }

  render() {
    const { todos, visible } = this.state;

    return (
      <div>
        <div>
          <label>Todo list</label>
          {/* filter */}
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
        {/* todo list */}
        <ul styleName="todo">
          {todos.map(todo =>
            <TodoItem
              key={`todo-item-${todo.id}`}
              todo={todo}
              updateHandler={this.updateHandler(todo.id)}
              removeHandler={this.removeHandler(todo.id)}
            />
          )}
        </ul>
        {/* input element */}
        <div styleName="form-group">
          <label>新增一筆 Todo 事項</label>
          <input
            ref={el => (this.input = el)}
            type="text"
            styleName="form-control"
            onKeyPress={this.insertHandler}
          />
        </div>
        {/* note */}
        <div styleName="alert alert-danger">Note: API 編輯操作並不真的影響來源伺服器資料</div>
      </div>
    );
  }
}

export default compose(Dispatch, Store(STORE_KEY))(Todo);
