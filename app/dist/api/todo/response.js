/* @flow */
import type { TodoItem } from './type';

import {
  TODO_GET_BY_USER,
  TODO_INSERT,
  TODO_UPDATE,
  TODO_DELETE
} from './constant';

export default {
  [TODO_INSERT]: ({ userId, title, completed }: Object): TodoItem => ({
    id: Date.now(),
    userId,
    title,
    completed
  })
};
