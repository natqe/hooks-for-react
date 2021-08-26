import { useDebugValue, useEffect } from "react"
import { useEfct } from "./efct"

export const useIf = (condition: unknown, callback: Parameters<typeof useEffect>[0]) => {
    useDebugValue(!!condition)
    useEfct(
        () => {
            if (condition) return callback()
        },
        [!!condition]
    )
    return !!condition
}