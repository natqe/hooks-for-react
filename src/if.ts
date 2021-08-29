import { useDebugValue } from "react"
import { useEfct } from "./efct"

export const useIf = (condition: unknown, callback: Parameters<typeof useEfct>[0]) => {
    useDebugValue(!!condition)
    useEfct(
        onCleanup => {
            if (condition) return callback(onCleanup)
        },
        [!!condition]
    )
    return !!condition
}