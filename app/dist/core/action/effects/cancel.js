/**
 * 取消所有 API 發送與監聽
 * @return {{type: SAGA_CANCEL}}
 */
module.exports = () => ({
  type: 'SAGA_CANCEL'
});
