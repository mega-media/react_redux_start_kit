import {
  STORE_KEY,
  SAVE_LIST,
  APPEND_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM
} from './constant';
import { handleActions } from 'redux-actions';
import {
  pipe,
  prepend,
  concat,
  prop,
  propEq,
  sortWith,
  descend,
  findIndex,
  update,
  map,
  remove
} from 'ramda';

export default {
  [STORE_KEY]: handleActions(
    {
      /* 儲存 */
      [SAVE_LIST]: ({ todos, nextIdVal }, { payload }) => {
        let idVal = nextIdVal;
        const descTodos = pipe(
          sortWith([descend(prop('id'))]),
          map(({ title, completed }) => ({
            id: idVal++,
            title,
            completed
          }))
        )(payload);

        return {
          todos: concat(descTodos, todos),
          nextIdVal: idVal
        };
      },

      /* 新增 */
      [APPEND_ITEM]: ({ todos, nextIdVal }, { payload: { title } }) => ({
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
      [UPDATE_ITEM]: (
        { todos, nextIdVal },
        { payload: { id, title, completed } }
      ) => ({
        todos: update(findIndex(propEq('id', id))(todos), {
          id,
          title,
          completed
        })(todos),
        nextIdVal
      }),

      /* 移除 */
      [REMOVE_ITEM]: ({ todos, nextIdVal }, { payload: { id } }) => ({
        todos: remove(findIndex(propEq('id', id))(todos), 1, todos),
        nextIdVal
      })
    },
    { todos: [], nextIdVal: 1 }
  )
};
