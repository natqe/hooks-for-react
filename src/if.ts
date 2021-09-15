import { useDebugValue } from "react"
import { useEfct } from "./efct"
import { efct } from "./efct.abstract"
import { useIfAbstract } from "./if.abstract"

export const useIf = <T extends efct>(condition: unknown, callback: T) => {
    useDebugValue(!!condition)
    return useIfAbstract(useEfct, condition, callback)
}