import { curry } from 'ramda';

/**
 * 輪詢 action
 * @param interval {number} 間隔時間
 * @param action {Object} action 物件
 * @return {{type: SAGA_POLLING}}
 */
module.exports = curry((interval, action) => ({
  type: 'SAGA_POLLING',
  payload: {
    action,
    interval
  }
}));
