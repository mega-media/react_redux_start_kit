/**
 * Created by arShown on 2016/10/13.
 */
import Constant from './Constant';

class BtnClass {
    constructor() {
        this.primary = false;
        this.success = false;
        this.warning = false;
        this.danger = false;
    }
}

export default function (state = new BtnClass(), action) {
    const {type, btnStyle} = action;
    switch (type) {
        case Constant.BUTTON_CLICK:
            state[btnStyle] = !state[btnStyle];
            return Object.assign(new BtnClass(), state);
        case Constant.BUTTON_RESET:
            return new BtnClass();
        default:
            return state;
    }
}