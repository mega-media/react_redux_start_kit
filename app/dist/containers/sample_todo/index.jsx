import React from 'react';
import { STORE_KEY } from './constant';
import { compose, Store, Style } from '../../core/container';
import Input from './input';
import Item from './item';
import css from './todo.scss';

export default compose(
  Store(STORE_KEY),
  Style(css)
)(({ storeData: { todos } }) => {
  return (
    <div>
      <div styleName="input">
        <Input />
      </div>

      <table styleName="table todo-table">
        <tbody>
          {todos.map(todo => <Item key={todo.id} data={todo} />)}
        </tbody>
      </table>
    </div>
  );
});
