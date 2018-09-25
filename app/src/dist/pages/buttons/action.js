import { emit } from '@core/action/effects';
import { BUTTON_CLICK, BUTTON_RESET } from '../../../storage/reducers/buttons';

/**
 * 當有參數傳遞時，使用 payload 作為 key 值
 * @param {string} btnStyle
 * @returns {{type, payload: {btnStyle: *}}}
 */
export function click(btnStyle) {
  /**
   * 使用 action/effects emit 的寫法：
   * return emit(BUTTON_CLICK, { btnStyle });
   */
  return {
    type: BUTTON_CLICK,
    payload: {
      btnStyle
    }
  };
}

export function reset() {
  /**
   * 使用 action/effects emit 的寫法：
   * return emit(BUTTON_RESET);
   */
  return {
    type: BUTTON_RESET
  };
}
