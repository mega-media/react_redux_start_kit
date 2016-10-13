/**
 * Created by arShown on 2016/10/13.
 */
import View from './View';
import Reducer from './Reducer';
import Constant from './Constant';

export default {
    reducers: {
        [Constant.StoreKey]: Reducer
    },
    router: {
        path: 'btnClick',
        component: View
    }
};
