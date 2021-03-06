import { DependencyList, useDebugValue, useLayoutEffect } from "react"
import { useLayoutEfct } from "./layout-efct"

export const useLayoutAsyncEffect = (effect: (onCleanup: (execute: () => void | Promise<void>) => void) => Promise<void>, deps?: DependencyList) => {
    useDebugValue(effect)
    useLayoutEfct(effect, deps)
}