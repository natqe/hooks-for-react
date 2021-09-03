import { useDebugValue } from "react"
import { useEfct } from "./efct"
import { useIfAbstract } from "./if.abstract"

export const useIf = (condition: unknown, callback: Parameters<typeof useEfct>[0]) => {
    useDebugValue(!!condition)
    return useIfAbstract(useEfct, condition, callback)
}