/* @flow */
/* constant */
import {
  TODO_GET_BY_USER,
  TODO_INSERT,
  TODO_UPDATE,
  TODO_DELETE
} from '~/api/todo/constant';
import { TODO_SAVE } from './constant';

/* helpers */
import { fetchApi } from '~/helpers/fetch';
import { SAGA_CANCEL } from '~/helpers/saga-flow/constant';

/* type */
import type { Action, TodoData } from './type';

/**
 * 取消之前所有發送 actions 的監聽
 */
export function cancelLastAction() {
  return {
    type: SAGA_CANCEL
  };
}

/**
 * 抓取特定 user 的 todos
 * @param userId  {number}  [user's id]
 * @returns {object}
 */
export function fetchByUser(userId: number) {
  return fetchApi(TODO_GET_BY_USER, userId);
}

/**
 * 寫入一筆 todo
 * @param userId    {number}
 * @param title     {string}
 * @param completed {boolean}
 * @returns {object}
 */
export function insert(
  userId: number,
  title: string,
  completed: boolean = false
) {
  return fetchApi(TODO_INSERT, userId, title, completed);
}

/**
 * 更新某筆 todo
 * @param id  {number}  [todo's id]
 * @param columns  {object} [修改的內容]
 * @returns {object}
 */
export function update(id: number, columns: Object) {
  return fetchApi(TODO_UPDATE, id, columns);
}

/**
 * 移除某筆 todo
 * @param id  {number}  [todo's id]
 * @returns {*}
 */
export function remove(id: number) {
  return fetchApi(TODO_DELETE, id);
}

/**
 * 儲存 todos
 * @param data  {Array<TodoData>} [todos 資料]
 * @returns {{type: SAVE, payload: Array<TodoData>}}
 */
export function save(data: Array<TodoData>): Action {
  return {
    type: TODO_SAVE,
    payload: data
  };
}
