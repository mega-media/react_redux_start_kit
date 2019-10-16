import { assoc } from 'ramda';

class BtnClass {
  constructor() {
    this.primary = false;
    this.success = false;
    this.warning = false;
    this.danger = false;
  }
}

/**
 * action type
 */
export const BUTTON_CLICK = 'BUTTON_CLICK';
export const BUTTON_RESET = 'BUTTON_RESET';

/**
 * 可以使用類別(class)作為 state 內容
 */
export default (state = new BtnClass(), { type, payload }) => {
  switch (type) {
    case BUTTON_CLICK:
      const { btnStyle } = payload;
      return assoc(btnStyle, !state[btnStyle], state);
    case BUTTON_RESET:
      return new BtnClass();
    default:
      return state;
  }
};
