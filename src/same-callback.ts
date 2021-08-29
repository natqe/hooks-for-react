import { useCallback, useDebugValue } from "react"

export const useSameCallback = <T extends (...args: any[]) => any>(callback: T): T => {
    const result = useCallback(callback, [])
    useDebugValue(result)
    return result
}