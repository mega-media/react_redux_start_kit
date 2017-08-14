/* @flow */
import { USER_GET } from './constant';
import type { User } from './type';

export default {
  /* 篩選 id、name */
  [USER_GET]: (res: Object): Array<User> =>
    res.map(({ id, name }) => ({
      id,
      name
    }))
};
