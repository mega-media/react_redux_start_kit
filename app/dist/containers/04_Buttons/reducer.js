import Constant from './constant';

class BtnClass {
  constructor() {
    this.primary = false;
    this.success = false;
    this.warning = false;
    this.danger = false;
  }
}

/**
 * 可以使用類別作為 state 內容
 */

export default function(state = new BtnClass(), action) {
  const { type, btnStyle } = action;
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