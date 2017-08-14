/* @flow */
import {
  TODO_GET_BY_USER,
  TODO_INSERT,
  TODO_UPDATE,
  TODO_DELETE
} from './constant';
import { replace, toQuery, toString } from '~/helpers/api-params';

export default {
  [TODO_GET_BY_USER]: (userId: number) => ({
    method: 'get',
    url: '/todos?' + toQuery({ userId })
  }),

  [TODO_INSERT]: (userId: number, title: string, completed: boolean) => ({
    method: 'post',
    url: '/todos',
    body: toString({ userId, title, completed })
  }),

  [TODO_UPDATE]: (id: number, columns: Object) => ({
    method: 'put',
    url: replace('/todos/{id}', { id }),
    body: toString(columns)
  }),

  [TODO_DELETE]: (id: number) => ({
    method: 'delete',
    url: `/todos/${id}`
  })
};
