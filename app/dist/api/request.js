/* @flow */
import user from './user/request';
import todo from './todo/request';
import type { RequestType } from './type';

export default (Object.assign({}, user, todo): RequestType);
