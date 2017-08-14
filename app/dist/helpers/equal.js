/* @flow */
export function NullEqual(params: ?any, ...others: Array<?any>): boolean {
  if (others.length === 0) return false;

  if (params === null) {
    if (others.findIndex(item => item !== null) > -1) return false;
  } else {
    if (others.findIndex(item => item === null) > -1) return false;
  }
  return true;
}

export function ObjectEqual(
  object: ?Object,
  ...others: Array<?Object>
): boolean {
  if (!NullEqual(object, ...others)) return false;
  object = !!object ? Object(object) : null;
  for (let index = 0; index < others.length; index++) {
    const source = !!others[index] ? Object(others[index]) : null;
    if (object && source) {
      if (Object.keys(object).length !== Object.keys(source).length)
        return false;
      for (let propName in object) {
        if (object.hasOwnProperty(propName) != source.hasOwnProperty(propName))
          return false;
        else if (typeof source[propName] != typeof object[propName])
          return false;
        if (
          source[propName] instanceof Array &&
          object[propName] instanceof Array
        ) {
          if (!ArrayEqual(object[propName], source[propName])) return false;
        } else if (
          typeof source[propName] === 'function' &&
          typeof object[propName] === 'function'
        ) {
          if (!FunctionEqual(object[propName], source[propName])) return false;
        } else if (
          source[propName] instanceof Object &&
          object[propName] instanceof Object
        ) {
          if (!ObjectEqual(object[propName], source[propName])) return false;
        } else if (source[propName] !== object[propName]) return false;
      }
    } else if (!NullEqual(object, source)) return false;
  }
  return true;
}

export function ArrayEqual(
  array: ?Array<any>,
  ...others: Array<?Array<any>>
): boolean {
  if (!NullEqual(array, ...others)) return false;
  const originArray: Array<any> = !!array ? array : [];
  for (let index = 0; index < others.length; index++) {
    const sourceArray = !!others[index] ? others[index] : [];
    if (sourceArray instanceof Array && array instanceof Array) {
      if (sourceArray.length != originArray.length) return false;
      for (let i = 0; i < originArray.length; i++) {
        const master = originArray[i];
        if (typeof master != typeof sourceArray[i]) return false;
        if (sourceArray[i] instanceof Array && master instanceof Array) {
          if (!ArrayEqual(master, sourceArray[i])) return false;
        } else if (
          typeof sourceArray[i] === 'function' &&
          typeof master === 'function'
        ) {
          if (!FunctionEqual(master, sourceArray[i])) return false;
        } else if (
          sourceArray[i] instanceof Object &&
          master instanceof Object
        ) {
          if (!ObjectEqual(master, sourceArray[i])) return false;
        } else if (sourceArray[i] != master) return false;
      }
    } else throw new TypeError('參數必須為陣列');
  }
  return true;
}

export function FunctionEqual(
  func: ?(...params: any) => any,
  ...others: Array<?(...params: any) => any>
): boolean {
  if (!NullEqual(func, ...others)) return false;

  for (let index = 0; index < others.length; index++) {
    const source = others[index];
    if (typeof source === 'function' && typeof func === 'function') {
      if (source.toString() !== func.toString()) return false;
    } else throw new TypeError('參數必須為方法');
  }
  return true;
}
