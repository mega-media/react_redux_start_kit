/**
 * Created by arShown on 2016/10/13.
 */
import KeyMirror from 'keymirror';
const Constant = Object.assign({
        StoreKey: "buttonStore"
    },
    KeyMirror({
        BUTTON_CLICK: null,
        BUTTON_RESET: null
    }));
export default Constant;