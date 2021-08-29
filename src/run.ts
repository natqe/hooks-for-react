import { DependencyList, useDebugValue, useEffect } from "react"
import { depsEqual } from "./common/deps-equal"
import { useInitial } from "./initial"
import { useValueRef } from "./value-ref"

export const useRun = (callback: () => void, deps: DependencyList) => {
    useInitial(callback)
    const [prevDeps, prevDepsRef] = useValueRef(deps)
    const [isFirstRun, isFirstRunRef] = useValueRef(true)
    if (!isFirstRun && !depsEqual(deps, prevDeps)) callback()
    prevDepsRef.current = deps
    useEffect(() => { isFirstRunRef.current = false }, [])
    useDebugValue(callback)
    return { isFirstRun, isFirstRunRef }
}