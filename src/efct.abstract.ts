import { DependencyList, useDebugValue, useEffect, useLayoutEffect } from "react"

export const useEfctAbstract = <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(hook: typeof useEffect | typeof useLayoutEffect, effect: T, deps?: DependencyList) => {
    hook(
        () => {
            let cleanUpExecuters = Array<() => void>()
            const handleCleanup = (execute: () => void) => cleanUpExecuters?.push(execute) || execute()
            const result = effect(handleCleanup)
            if (result && !result[`then`]) handleCleanup(result as () => void)
            return () => {
                for (const cleanUp of cleanUpExecuters) cleanUp()
                cleanUpExecuters = null
            }
        },
        deps
    )
    return effect
}