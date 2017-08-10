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
