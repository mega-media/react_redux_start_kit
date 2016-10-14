//@flow
export class Base {
    reducers:Object;
    router:Array<Object>;

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
type Structor ={
    reducers?:Object,
    router?:Object,
};

export function combineStructor(structor:Structor = {}, ...arg:Array<Structor>):Base {
    let returnObject:Base = Object.assign(new Base(), {
        reducers: structor.reducers || {},
        router: structor.router instanceof Array ? structor.router : (structor.router ? [structor.router] : [])
    });

    if (returnObject.reducers instanceof Object === false)
        throw new Error("reducer 必須為 Object");

    arg.reduce((returnObject:Base, item:Structor)=> {
        if (item.reducers) {
            if (item.reducers instanceof Object === false)
                throw new Error("reducer 必須為 Object");
            Object.keys(item.reducers).forEach((key:string)=> {
                if (Object.keys(returnObject.reducers).indexOf(key) > -1)
                    throw new Error("reducer key 不能重複");
                returnObject.reducers = Object.assign(returnObject.reducers, item.reducers);
            });
        }
        if (item.router instanceof Array)
            returnObject.router.concat(item.router);
        else
            returnObject.router.push(item.router);
        return returnObject;
    }, returnObject);
    return returnObject;
}
