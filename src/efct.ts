import { DependencyList, useDebugValue, useEffect, useRef } from "react"
import { useInitial } from "./initial"

type useEfct = {
    <T extends ((onCleanup: (execute: () => void) => void) => Promise<void>)>(effect: T, deps?: DependencyList): T
    <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void))>(effect: T, deps?: DependencyList): T
    <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(effect: T, deps?: DependencyList): T
}

export const useEfct: useEfct = <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(effect: T, deps: DependencyList) => {
    const cleanUpExecuters = useInitial(() => Array<() => void>())
    const countRef = useRef(0)
    useEffect(
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
    useEffect(
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