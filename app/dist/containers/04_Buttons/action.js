import Constant from './constant';

export function click(btnStyle) {
  return {
    type: Constant.BUTTON_CLICK,
    btnStyle
  };
}

export function reset() {
  return {
    type: Constant.BUTTON_RESET
  };
}
