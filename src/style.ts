import { CSSProperties, DependencyList, useDebugValue, useMemo } from "react"

export const useStyle = (factory: () => CSSProperties, deps: DependencyList) => {
    const result = useMemo(factory, deps)
    useDebugValue(result)
    return result
}