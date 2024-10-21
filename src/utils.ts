import { ApiPool } from './core/store'
/**
 * @description 格式化请求头
 */
export async function formatHeaderParams(__Config: any) {
    for (const i in __Config.headers) {
        if (typeof __Config.headers[i] == 'function')
            __Config.headers[i] = await __Config.headers[i]()
    }
    for (const i in __Config.params) {
        if (typeof __Config.params[i] == 'function') {
            __Config.params[i] = await __Config.params[i]()
        }
    }
    return {
        headers: __Config.headers,
        params: __Config.params
    }
}
/** 
 * @description 删除缓冲池中的标识 
 * */
export function removeUrlInApiPool(name: string) {
    ApiPool.delete(name)
}

export function deepClone(obj: any) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    let copy = Array.isArray(obj) ? [] : {} as any
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key as any]);
        }
    }
    return copy;
}