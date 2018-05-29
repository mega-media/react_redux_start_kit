import {
  keysIn,
  forEach,
  has,
  append,
  is,
  concat,
  reduce,
  merge,
  keys,
  head
} from 'ramda';

export const combineStructor = (...arg) => {
  let returnObject = {};
  arg.reduce((returnObject, item) => {
    forEach(key => {
      if (!has(key, returnObject)) {
        returnObject[key] = [];
      }
      const combineFn = is(Array, item[key]) ? concat : append;
      returnObject[key] = combineFn(item[key], returnObject[key]);
    }, keysIn(item));
    return returnObject;
  }, returnObject);

  return returnObject;
};

export const validReducer = reduce((reducerSet, item) => {
  const key = head(keys(item));
  if (has(key, reducerSet)) throw Error('reducer key 不能重複 :' + key);
  return merge(reducerSet, item);
}, {});
