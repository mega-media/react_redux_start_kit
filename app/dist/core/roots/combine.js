//@flow
export class Base {
  reducer: Object;
  router: Array<Object>;
  subscribe: SagaGroupType;

  constructor() {
    this.reducer = {};
    this.router = [];
    this.subscribe = {};
  }
}

/**
 * 合併 object
 * @param structor
 * @param arg
 * @returns {Base}
 */
type Structor =
  | {
      reducer?: Object,
      router?: Object | Array<Object>,
      subscribe?:
        | SagaType
        | SagaGroupType
        | Array<SagaType>
        | Array<SagaGroupType>
    }
  | Base;

export const combineStructor = (
  structor: Structor = {},
  ...arg: Array<Structor>
): Base => {
  let returnObject: Base = new Base();
  if (structor.reducer) returnObject.reducer = { ...structor.reducer };
  if (structor.router)
    returnObject.router =
      structor.router instanceof Array
        ? [...structor.router]
        : [structor.router];

  if (structor.subscribe)
    returnObject.subscribe =
      structor.subscribe instanceof Array
        ? combineSagas.apply(null, [...structor.subscribe])
        : combineSagas({ ...structor.subscribe });

  arg.reduce((returnObject: Base, item: Structor) => {
    if (item.reducer) {
      Object.keys(item.reducer).forEach((key: string) => {
        if (Object.keys(returnObject.reducer).indexOf(key) > -1)
          throw Error('reducer key 不能重複 :' + key);
      });
      returnObject.reducer = Object.assign(returnObject.reducer, item.reducer);
    }

    if (item.router)
      returnObject.router =
        item.router instanceof Array
          ? [...returnObject.router, ...item.router]
          : [...returnObject.router, item.router];

    if (item.subscribe) {
      returnObject.subscribe =
        item.subscribe instanceof Array
          ? combineSagas.apply(null, [
              returnObject.subscribe,
              ...item.subscribe
            ])
          : combineSagas(returnObject.subscribe, item.subscribe);
    }

    return returnObject;
  }, returnObject);

  return returnObject;
};

/**
 * 合併 sagas
 * @param sagas Array<object>
 * @returns {*}
 */
type SagaFuncType = (res: any) => Generator<any, any, any>;
type SagaType = {
  [key: any]: SagaFuncType
};
type SagaGroupType = {
  [key: any]: Array<SagaFuncType>
};

export function combineSagas(
  ...sagas: Array<SagaType | SagaGroupType>
): SagaGroupType {
  return sagas.reduce(
    (
      processObj: SagaGroupType,
      sagaObj: SagaType | SagaGroupType
    ): SagaGroupType => {
      for (let key in sagaObj) {
        if (!processObj[key]) processObj[key] = [];
        if (sagaObj[key] instanceof Array)
          processObj[key] = processObj[key].concat(sagaObj[key]);
        else processObj[key].push(sagaObj[key]);
      }
      return processObj;
    },
    {}
  );
}
