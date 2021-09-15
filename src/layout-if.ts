import { useDebugValue } from "react"
import { efct } from "./efct.abstract"
import { useIf } from "./if"
import { useIfAbstract } from "./if.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useLayoutIf: typeof useIf = <T extends efct>(condition, callback: T) => {
    useDebugValue(!!condition)
    return useIfAbstract(useLayoutEfct, condition, callback)
}