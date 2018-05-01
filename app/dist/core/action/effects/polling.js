/**
 * 輪詢 action
 * @param interval {number} 間隔時間
 * @param action {Object} action 物件
 * @return {{type: SAGA_POLLING}}
 */
const polling = (interval, action) => ({
  type: 'SAGA_POLLING',
  payload: {
    action,
    interval
  }
});

export default polling;
