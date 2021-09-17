import { DependencyList, useEffect, useLayoutEffect, useRef } from "react"

declare const UNDEFINED_VOID_ONLY: unique symbol

type voidOnly = void | {
    [UNDEFINED_VOID_ONLY]: never
}

type onCleanup = (execute: () => void) => void

export type promiseEffect = (onCleanup: onCleanup) => Promise<voidOnly>

export type regularEffect = (onCleanup: onCleanup) => voidOnly

export type regularEffectWithCleanup = (onCleanup: onCleanup) => () => voidOnly

export type efct = promiseEffect | regularEffectWithCleanup | regularEffect

type useEfctAbstract = <T extends efct>(hook: typeof useEffect | typeof useLayoutEffect, effect: T, deps?: DependencyList) => void

export const useEfctAbstract: useEfctAbstract = (hook: typeof useEffect | typeof useLayoutEffect, effect: efct, deps?: DependencyList) => {
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
}