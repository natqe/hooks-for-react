import { useDebugValue } from "react"
import { useLayoutEfct } from "./layout-efct"

export const useLayoutIf = (condition, callback: Parameters<typeof useLayoutEfct>[0]) => {
    useDebugValue(!!condition)
    useLayoutEfct(
        () => {
            if (condition) return callback()
        },
        [!!condition]
    )
    return !!condition
}