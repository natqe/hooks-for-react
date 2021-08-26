import { DependencyList, EffectCallback, useDebugValue, useLayoutEffect } from "react"
import { useEfct } from "./efct"

export const useLayoutEfct: typeof useEfct = <T extends (() => ReturnType<EffectCallback> | Promise<void>)>(effect: T, deps: DependencyList = []): T => {
    useLayoutEffect(
        () => {
            const result = effect()
            if (result && !result[`then`]) return result as ReturnType<EffectCallback>
        },
        deps
    )
    useDebugValue(effect)
    return effect
}