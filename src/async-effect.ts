import { DependencyList, useDebugValue, useEffect, useRef } from "react"
import { useInitial } from "./initial"

export const useAsyncEffect = (effect: (onCleanup: (execute: () => void | Promise<void>) => void) => Promise<void>, deps?: DependencyList) => {
    const cleanUpExecuters = useInitial(() => Array<() => void>())
    const countRef = useRef(0)
    useEffect(
        () => {
            const count = ++countRef.current
            const handleCleanup = (execute: () => void) => {
                if (countRef.current === count) cleanUpExecuters.push(execute)
                else execute()
            }
            effect(handleCleanup)
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
}