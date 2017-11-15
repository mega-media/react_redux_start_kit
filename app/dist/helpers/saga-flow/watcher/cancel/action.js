/**
 * 取消所有 API 發送與監聽
 * @return {{type: SAGA_CANCEL}}
 */
export function cancel() {
  return {
    type: 'SAGA_CANCEL'
  };
}

/**
 * 取消最後一筆 API 發送與監聽
 * @return {{type: SAGA_CANCEL_LATEST}}
 */
export function cancelLatest() {
  return {
    type: 'SAGA_CANCEL_LATEST'
  };
}
