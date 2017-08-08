/* @flow */
export function replace(str: string, params: Object): string {
  return str.replace(
    /\{\w+\}/gi,
    word => params[word.substr(1, word.length - 2).trim()] || word
  );
}

export function toString(params: Object): string {
  return JSON.stringify(params);
}

export function toQuery(params: Object): string {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}
