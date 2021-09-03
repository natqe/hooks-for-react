import { useDebugValue } from "react"
import { useIfAbstract } from "./if.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useLayoutIf = (condition, callback: Parameters<typeof useLayoutEfct>[0]) => {
    useDebugValue(!!condition)
    return useIfAbstract(useLayoutEfct, condition, callback)
}