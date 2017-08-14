/**
 * 定義共用參數名稱，像是：state name / Action type
 * 規則：皆大寫，使用 _ 連接單字
 */

/**
 * 儲存在 store 中的 key，必須為唯一值
 * 就是說不能跟其他 container 的 STORE_KEY 重複
 */
export const STORE_KEY = 'button';

/**
 * action type 
 */
export const BUTTON_CLICK = 'BUTTON_CLICK';
export const BUTTON_RESET = 'BUTTON_RESET';
