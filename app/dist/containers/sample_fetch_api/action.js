/* @flow */
import { SAGA_SAVE, API_USER_LIST } from './constant';
import { fetchApi } from '~/core/action/effects';
import type { SaveAction, Item } from './type';

export function fetch() {
  return fetchApi(API_USER_LIST, {
    url: 'http://jsonplaceholder.typicode.com/users'
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
