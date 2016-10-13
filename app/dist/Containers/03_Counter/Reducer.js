/**
 * Created by arShown on 2016/10/13.
 */

export default function (state = 0, action) {
    const {type} = action;
    switch (type) {
        case "COUNTER_CLICK":
            return state += 1;
        case "COUNTER_RESET":
            return 0;
        default:
            return state;
    }
}