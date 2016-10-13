/**
 * Created by arShown on 2016/10/13.
 */
//@flow
import Constant from './Constant';
import type {MemberDataType} from './Type';

export function add(data:MemberDataType):{type:string,data:MemberDataType} {
    return {
        type: Constant.FLOW_INSERT,
        data
    }
}

export function remove(id:number):{type:string,id:number} {
    return {
        type: Constant.FLOW_REMOVE,
        id
    }
}