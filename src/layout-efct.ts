import { DependencyList, useDebugValue, useLayoutEffect, useRef } from "react"
import { useInitial } from "./initial"
import { useEfct } from "./efct"

export const useLayoutEfct: typeof useEfct = <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(effect: T, deps: DependencyList): T => {
    const cleanUpExecuters = useInitial(() => Array<() => void>())
    const countRef = useRef(0)
    useLayoutEffect(
        () => {
            const count = ++countRef.current
            const handleCleanup = (execute: () => void) => {
               if(countRef.current === count) cleanUpExecuters.push(execute)
               else execute()
            }
            const result = effect(handleCleanup)
            if (result && !result[`then`]) handleCleanup(result as () => void)
        },
        deps
    )
    useLayoutEffect(
        () => {
            return () => {
                while (cleanUpExecuters.length) cleanUpExecuters.pop()()
            }
        },
        [countRef.current]
    )
    useDebugValue(effect)
    return effect
}