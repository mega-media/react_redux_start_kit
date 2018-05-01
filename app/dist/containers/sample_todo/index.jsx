/* @flow */
import React from 'react';
import { STORE_KEY } from './constant';
import { compose, withStore, withStyle } from '../../core/container';
import Input from './input';
import Item from './item';
import css from './todo.scss';

export const Index = ({ storeData: { todos } }: Object) => (
  <div>
    <div styleName="input">
      <Input />
    </div>

    <table styleName="table todo-table">
      <tbody>{todos.map(todo => <Item key={todo.id} data={todo} />)}</tbody>
    </table>
  </div>
);

export default compose(withStore(STORE_KEY), withStyle(css))(Index);
