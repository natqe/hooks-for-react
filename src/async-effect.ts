import { DependencyList, useDebugValue, useEffect } from "react"
import { useEfct } from "./efct"

export const useAsyncEffect = (effect: (onCleanup: (execute: () => void | Promise<void>) => void) => Promise<void>, deps?: DependencyList) => {
    useEfct(effect, deps)
    useDebugValue(effect)
}