//@flow
export class Base {
  reducers: Object;
  router: Array<Object>;

  constructor() {
    this.reducers = {};
    this.router = [];
  }
}

/**
 * 合併 object
 * @param structor
 * @param arg
 * @returns {Base}
 */
type Structor = {
  reducers?: Object,
  router?: Object | Array<Object>
};

export const combineStructor = (
  structor: Structor = {},
  ...arg: Array<Structor>
): Base => {
  let returnObject: Base = new Base();
  if (structor.reducers)
    returnObject.reducers = Object.assign({}, structor.reducers);
  if (structor.router)
    returnObject.router =
      structor.router instanceof Array
        ? structor.router.slice(0)
        : [structor.router];

  arg.reduce((returnObject: Base, item: Structor) => {
    if (item.reducers) {
      Object.keys(item.reducers).forEach((key: string) => {
        if (Object.keys(returnObject.reducers).indexOf(key) > -1)
          throw Error('reducer key 不能重複 :' + key);
      });
      returnObject.reducers = Object.assign(
        returnObject.reducers,
        item.reducers
      );
    }
    if (item.router) {
      if (item.router instanceof Array)
        returnObject.router = returnObject.router.concat(item.router);
      else returnObject.router.push(item.router);
    }

    return returnObject;
  }, returnObject);

  return returnObject;
};
