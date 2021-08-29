import { useDebugValue } from "react"
import { useLayoutEfct } from "./layout-efct"

export const useLayoutIf = (condition, callback: Parameters<typeof useLayoutEfct>[0]) => {
    useDebugValue(!!condition)
    useLayoutEfct(
        onCleanup => {
            if (condition) return callback(onCleanup)
        },
        [!!condition]
    )
    return !!condition
}