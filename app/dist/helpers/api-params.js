/**
 * 字串處理 helpers
 * @flow
 */
/**
 * 內容取代
 * @param str    {string}  [字串]
 * @param params {object}  [取代的 mapping object]
 * @returns {string}
 * ex.
 * replace('Hola! {user}.',{user:'John'}); // 'Hola! John'
 */
export function replace(str: string, params: Object): string {
  return str.replace(
    /\{\w+\}/gi,
    word => params[word.substr(1, word.length - 2).trim()] || word
  );
}

/**
 * object 轉換成字串
 * @param params  {object}  [要轉換的 object]
 */
export function toString(params: Object): string {
  return JSON.stringify(params);
}

/**
 * object 轉換成 query 字串
 * @param params  {object}  [要轉換的 object]
 * @returns {string}
 * ex.
 * toQuery({user:'John',age:25}); //user=John&age=25
 */
export function toQuery(params: Object): string {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}
