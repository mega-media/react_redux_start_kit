/* @flow */
import { USER_GET } from './constant';

export default {
  [USER_GET]: () => ({
    method: 'get',
    url: '/users'
  })
};
