/* @flow */
import { put, select } from 'redux-saga/effects';
import {
  TODO_GET_BY_USER,
  TODO_INSERT,
  TODO_UPDATE,
  TODO_DELETE
} from '~/api/todo/constant';
import { STORE_KEY } from './constant';
import { save } from './action';
import type { TodoItem } from '~/api/todo/response';

export default {
  [TODO_GET_BY_USER]: function*(res: Array<TodoItem>) {
    yield put(save(res));
  },
  [TODO_INSERT]: function*(res) {
    console.log('todo item insert success.');
    const { userId, title, completed } = res;
    const todos = yield select(state => state[STORE_KEY]);
    yield put(save([...todos, { id: Date.now(), userId, title, completed }]));
  },
  [TODO_UPDATE]: function*(res: {
    userId?: number,
    id: number,
    title?: string,
    completed?: boolean
  }) {
    console.log('todo item updated.');
    const { id, ...others } = res;
    const todos = yield select(state => state[STORE_KEY]);
    yield put(
      save(
        todos.map(todo => (todo.id === id ? Object.assign(todo, others) : todo))
      )
    );
  },
  [TODO_DELETE]: function*() {
    console.log('todo item deleted !! ');
  }
};
