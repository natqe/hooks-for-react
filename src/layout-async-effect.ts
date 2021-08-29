import { DependencyList, useDebugValue, useLayoutEffect, useRef } from "react"
import { useInitial } from "./initial"

export const useLayoutAsyncEffect = (effect: (onCleanup: (execute: () => void | Promise<void>) => void) => Promise<void>, deps?: DependencyList) => {
    const cleanUpExecuters = useInitial(() => Array<() => void>())
    const countRef = useRef(0)
    useLayoutEffect(
        () => {
            const count = ++countRef.current
            const handleCleanup = (execute: () => void) => {
               if(countRef.current === count) cleanUpExecuters.push(execute)
               else execute()
            }
            effect(handleCleanup)
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
}