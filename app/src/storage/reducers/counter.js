const counter = function(state = 0, action) {
  const { type } = action;
  switch (type) {
    case 'COUNTER_CLICK':
      return (state += 1);
    case 'COUNTER_RESET':
      return 0;
    default:
      return state;
  }
};

/**
 * Reducer export 必須是一個 function，參數說明如下：
 * state : 傳給 Store 儲存的內容
 * action: 來自 Action 的回傳
 *
 * 使用 type 來判斷要執行的邏輯，switch 中必須要有 default 的條件回傳
 * 意思是：當系統在處理其他 Containers 的 Action 時，此 Reducer 回傳的 state 不會改變
 * 其用意在於 Redux 會判斷 View 綁定的 state 是否改變
 * 若有改變則會觸發執行 Component 事件
 * 因此，添加 default 可避免觸發非預期中的行為
 */

export default counter;
