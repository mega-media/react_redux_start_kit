export function click() {
  return {
    type: 'COUNTER_CLICK'
  };
}

export function reset() {
  return {
    type: 'COUNTER_RESET'
  };
}

/**
 * Action 是等待被呼叫的函式，將回傳的內容傳給 Reducer 去處理
 * 回傳內容須為 Object 且 type 為必須值，作為 Reducer 判斷的依據
 */
