/* @flow */
import {
  TODO_GET_BY_USER,
  TODO_INSERT,
  TODO_UPDATE,
  TODO_DELETE
} from '~/api/todo/constant';
import { fetchApi } from '~/helpers/fetch';
import { SAGA_CANCEL } from '~/helpers/saga-flow/constant';
import { TODO_SAVE } from './constant';
import type { Action, TodoData } from './type';

export function cancelLastAction() {
  return {
    type: SAGA_CANCEL
  };
}

export function fetchByUser(userId: number) {
  return fetchApi(TODO_GET_BY_USER, userId);
}

export function insert(
  userId: number,
  title: string,
  completed: boolean = false
) {
  return fetchApi(TODO_INSERT, userId, title, completed);
}

export function update(id: number, columns: Object) {
  return fetchApi(TODO_UPDATE, id, columns);
}

export function remove(id: number) {
  return fetchApi(TODO_DELETE, id);
}

export function save(data: Array<TodoData>): Action {
  return {
    type: TODO_SAVE,
    payload: data
  };
}
