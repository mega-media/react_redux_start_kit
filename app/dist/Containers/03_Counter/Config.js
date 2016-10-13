/**
 * Created by arShown on 2016/10/13.
 */
import View from './View';
import Reducer from './Reducer';

export default {
    reducers: {
        "counterStore": Reducer
    },
    router: {
        path: 'counter',
        component: View
    }
};
