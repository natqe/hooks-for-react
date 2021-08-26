import { useDebugValue, useEffect } from "react"
import { isObject } from "./common/is-object"

type useLog = {
    <T extends Parameters<typeof console['log']>>(...param: T): T
    <T extends object>(param: T): T
}

export const useLog: useLog = (...param: Parameters<typeof console['log']>) => {
    if (param.length === 1 && isObject(param[0])) {
        var objectValue = param[0]
        param[0] = JSON.stringify(param[0])
    }
    useDebugValue(param)
    useEffect(
        () => {
            if (objectValue) console.log(objectValue)
            else console.log(...param)
        },
        param
    )
    return objectValue ? [objectValue]: param
}