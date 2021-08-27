import { useDebugValue, useEffect } from "react"
import { isObject } from "./common/is-object"

export const useLog = <T extends Parameters<typeof console['log']>>(...param: T) => {
    const deps = [...param]
    if (param.length === 1 && isObject(param[0])) {
        var objectValue = param[0]
        deps[0] = JSON.stringify(param[0])
    }
    useDebugValue(param)
    useEffect(
        () => {
            if (objectValue) console.log(objectValue)
            else console.log(...param)
        },
        deps
    )
    return param
}