/* @flow */
import { USER_GET } from './constant';

const request = {};

request[USER_GET] = () => ({
  method: 'get',
  url: '/users'
});

export default request;
