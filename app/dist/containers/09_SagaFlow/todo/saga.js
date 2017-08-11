/* @flow */
import { put, select } from 'redux-saga/effects';

/* constant */
import {
  TODO_GET_BY_USER,
  TODO_INSERT,
  TODO_UPDATE,
  TODO_DELETE
} from '~/api/todo/constant';
import { STORE_KEY } from './constant';

/* action */
import { save } from './action';

/* type */
import type { TodoItem } from '~/api/todo/response';

export default {
  /* 抓取特定 user 的 todos */
  [TODO_GET_BY_USER]: function*(res: Array<TodoItem>) {
    /* 寫入取得的資料 */
    yield put(save(res));
  },

  /* 寫入一筆 todo */
  [TODO_INSERT]: function*(res) {
    console.log('todo item insert success.');
    const { userId, title, completed } = res;
    /* 取得目前store中已儲存的資料內容 */
    const todos = yield select(state => state[STORE_KEY]);
    /* 將回傳內容新增至陣列中 */
    yield put(save([...todos, { id: Date.now(), userId, title, completed }]));
  },

  /* 更新某筆 todo */
  [TODO_UPDATE]: function*(res: {
    userId?: number,
    id: number,
    title?: string,
    completed?: boolean
  }) {
    console.log('todo item updated.');
    const { id, ...others } = res;
    /* 取得目前store中已儲存的資料內容 */
    const todos = yield select(state => state[STORE_KEY]);
    /* 儲存更新後的資料 */
    yield put(
      save(
        todos.map(
          todo => (todo.id === id ? Object.assign({}, todo, others) : todo)
        )
      )
    );
  },

  /* 移除某筆 todo */
  [TODO_DELETE]: function*() {
    console.log('todo item deleted !! ');
  }
};
