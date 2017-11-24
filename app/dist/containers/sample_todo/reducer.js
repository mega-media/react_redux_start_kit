import {
  STORE_KEY,
  SAVE_LIST,
  APPEND_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM
} from './constant';
import { reducerCreator } from '~/core/reducer';
import {
  pipe,
  prepend,
  prop,
  propEq,
  sortWith,
  descend,
  findIndex,
  update,
  map,
  remove
} from 'ramda';

export const defaultState = { todos: [], nextIdVal: 1 };

export const reducer = reducerCreator(defaultState, {
  /* 儲存 */
  [SAVE_LIST]: ({ todos, nextIdVal }, payload) => {
    let idVal = 1;
    const descTodos = pipe(
      map(({ title, completed }) => ({
        id: idVal++,
        title,
        completed
      })),
      sortWith([descend(prop('id'))])
    )(payload);

    return {
      todos: descTodos,
      nextIdVal: idVal
    };
  },

  /* 新增 */
  [APPEND_ITEM]: ({ todos, nextIdVal }, { title }) => ({
    todos: prepend(
      {
        id: nextIdVal,
        title,
        completed: false
      },
      todos
    ),
    nextIdVal: nextIdVal + 1
  }),

  /* 編輯 */
  [UPDATE_ITEM]: ({ todos, nextIdVal }, { id, title, completed }) => ({
    todos: update(findIndex(propEq('id', id))(todos), {
      id,
      title,
      completed
    })(todos),
    nextIdVal
  }),

  /* 移除 */
  [REMOVE_ITEM]: ({ todos, nextIdVal }, { id }) => ({
    todos: remove(findIndex(propEq('id', id))(todos), 1, todos),
    nextIdVal
  })
});

export default {
  [STORE_KEY]: reducer
};
