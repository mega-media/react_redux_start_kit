import Constant from './Constant';

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
