import { BUTTON_CLICK, BUTTON_RESET } from './constant';

/**
 * 當有參數傳遞時，使用 payload 作為 key 值
 * @param btnStyle
 * @returns {{type, payload: {btnStyle: *}}}
 */
export function click(btnStyle) {
  return {
    type: BUTTON_CLICK,
    payload: {
      btnStyle
    }
  };
}

export function reset() {
  return {
    type: BUTTON_RESET
  };
}
