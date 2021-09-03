import { DependencyList, useDebugValue, useEffect, useRef } from "react"
import { depsEqual } from "./common/deps-equal"
import { useInitial } from "./initial"

export const useRun = (callback: () => void, deps: DependencyList) => {
    useInitial(callback)
    const prevDepsRef = useRef(deps)
    const prevDeps = prevDepsRef.current
    const isFirstRunRef = useRef(true)
    const isFirstRun = isFirstRunRef.current
    if (!isFirstRun && !depsEqual(deps, prevDeps)) callback()
    prevDepsRef.current = deps
    useEffect(() => { isFirstRunRef.current = false }, [])
    useDebugValue(callback)
    return { isFirstRun, isFirstRunRef }
}