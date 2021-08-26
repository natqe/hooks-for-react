import { DependencyList, useCallback, useDebugValue } from "react"

export const useCB = <T extends (...args: any[]) => any>(callback: T, deps: DependencyList = []): T => {
    const result = useCallback(callback, deps)
    useDebugValue(result)
    return result
}