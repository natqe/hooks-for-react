import { DependencyList, useDebugValue } from "react"
import { depsEqual } from "./common/deps-equal"
import { useEfct } from "./efct"
import { useInitial } from "./initial"
import { useValueRef } from "./value-ref"

export const useRun = <T>(callback: () => T, deps: DependencyList) => {
    useInitial<T>(callback)
    const [prevDeps, prevDepsRef] = useValueRef(deps)
    const [isFirstRun, isFirstRunRef] = useValueRef(true)
    if (!isFirstRun && !depsEqual(deps, prevDeps)) callback()
    prevDepsRef.current = deps
    useEfct(() => { isFirstRunRef.current = false })
    useDebugValue(callback)
    return { isFirstRun, isFirstRunRef }
}