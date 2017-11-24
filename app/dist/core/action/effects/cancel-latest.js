/**
 * 取消最後一筆 API 發送與監聽
 * @return {{type: SAGA_CANCEL_LATEST}}
 */
module.exports = () => ({
  type: 'SAGA_CANCEL_LATEST'
});
