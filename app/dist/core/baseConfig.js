//@flow
export class Base {
  reducers: Object;
  router: Array<Object>;
  sagas: SagaGroupType;

  constructor() {
    this.reducers = {};
    this.router = [];
    this.sagas = {};
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
      reducers?: Object,
      router?: Object | Array<Object>,
      sagas?: SagaType | SagaGroupType
    }
  | Base;

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
  if (structor.sagas) returnObject.sagas = combineSagas({}, structor.sagas);

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

    if (item.sagas)
      returnObject.sagas = combineSagas(returnObject.sagas, item.sagas);

    return returnObject;
  }, returnObject);

  return returnObject;
};

/**
 * 合併 sagas
 * @param sagas Array<object>
 * @returns {*}
 */
type SagaFuncType = (res: any) => () => Generator<any, any, any>;
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
