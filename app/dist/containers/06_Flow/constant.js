/**
 * @flow
 */
import type { INSERT, REMOVE } from './type';

/**
 * 儲存在 store 中的 key
 */
export const STORE_KEY = 'flow';

/**
 * 從 type.js 拿取對應的 type 常數
 */
export const FLOW_INSERT: INSERT = 'FLOW_INSERT';
export const FLOW_REMOVE: REMOVE = 'FLOW_REMOVE';
