import { DependencyList, useDebugValue, useRef } from "react"
import { useRun } from "./run"

export const useMemoRef = <T>(factory: (prev: T) => T, deps: DependencyList) => {
    const ref = useRef<T>()
    useRun(() => ref.current = factory(ref.current), deps)
    useDebugValue(ref.current)
    return <const>[ref.current, ref]
}

export { useMemoRef as useStableMemo }