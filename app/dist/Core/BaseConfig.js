//@flow
export class Base {
    reducers:Object;
    router:Object;

    constructor() {
        this.reducers = {};
        this.router = {};
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
    let returnObject:Base = Object.assign(new Base(), structor);
    arg.reduce((returnObject:Base, item:Structor)=> {
        returnObject.reducers = Object.assign(returnObject.reducers, item.reducers || {});
        returnObject.router = Object.assign(returnObject.router, item.router || {});
        return returnObject;
    }, returnObject);
    return returnObject;
}
