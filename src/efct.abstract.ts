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

type useEfctAbstract = <T extends efct>(hook: typeof useEffect | typeof useLayoutEffect, effect: T, deps?: DependencyList) => T extends promiseEffect ? ({ bounce }: { bounce: boolean }) => Promise<void> : void

export const useEfctAbstract: useEfctAbstract = (hook: typeof useEffect | typeof useLayoutEffect, effect: efct, deps?: DependencyList) => {
    const prevEffectRef = useRef<Promise<void>>()
    const resolved = useRef<typeof prevEffectRef['current']>()
    hook(
        () => {
            let cleanUpExecuters = Array<() => void>()
            const handleCleanup = (execute: () => void) => cleanUpExecuters?.push(execute) || execute()
            const result = effect(handleCleanup)
            if (result && !result[`then`]) handleCleanup(result as () => void)
            return () => {
                if (result && result[`then`]) prevEffectRef.current = prevEffectRef.current === resolved.current ? result as Promise<void> : Promise.resolve()
                for (const cleanUp of cleanUpExecuters) cleanUp()
                cleanUpExecuters = null
            }
        },
        deps
    )
    const orderControl: any = async ({ bounce }: { bounce: boolean }) => {
        resolved.current = null
        const prevEffect = prevEffectRef.current
        if (prevEffect) {
            await prevEffect
            resolved.current = prevEffect
            if (bounce && prevEffectRef.current !== prevEffect) await new Promise(() => { })
        }
    }
    return orderControl
}