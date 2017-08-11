import View from './view';
import { combineStructor } from '~/core/baseConfig';
import user from './user/config';
import todo from './todo/config';

export default combineStructor(
  {
    router: {
      path: '/saga',
      component: View
    }
  },
  user,
  todo
);

/**
 * core/baseConfig 提供 combineStructor 函式，用來合併兩個以上的 config 設定
 */
