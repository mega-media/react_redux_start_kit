/* @flow */
import { SAGA_SAVE, API_USER_LIST } from './constant';
import { fetchAPI } from '~/core/action/effects';
import type { SaveAction, Item } from '~/containers/10_Api/type';

export function fetch() {
  return fetchAPI(API_USER_LIST, {
    method: 'get',
    url: 'http://jsonplaceholder.typicode.com/users',
    body: null,
    middleware: []
  });
}

export function save(items: Array<Item>): SaveAction {
  return {
    type: SAGA_SAVE,
    payload: {
      items
    }
  };
}
