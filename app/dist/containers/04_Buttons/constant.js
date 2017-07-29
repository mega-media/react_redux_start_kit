import KeyMirror from 'keymirror';
const Constant = Object.assign(
  {
    storeKey: 'buttonStore'
  },
  KeyMirror({
    BUTTON_CLICK: null,
    BUTTON_RESET: null
  })
);
export default Constant;

/**
 * 定義共用參數名稱，像是：state name / Action type
 * 
 * KeyMirror 函式：將 Object value = Object key
 * 上述 KeyMirror 結果等於：
 * {
 *      BUTTON_CLICK : BUTTON_CLICK,
 *      BUTTON_RESET : BUTTON_RESET
 * }
 */
