import { DependencyList, EffectCallback, useDebugValue, useEffect } from "react"

type useEfct = {
    <T extends (() => Promise<void>)>(effect: T, deps?: DependencyList): T
    <T extends (() => ReturnType<EffectCallback>)>(effect: T, deps?: DependencyList): T
    <T extends (() => ReturnType<EffectCallback> | Promise<void>)>(effect: T, deps?: DependencyList): T
}

export const useEfct: useEfct = <T extends (() => ReturnType<EffectCallback> | Promise<void>)>(effect: T, deps: DependencyList = []) => {
    useEffect(
        () => {
            const result = effect()
            if (result && !result[`then`]) return result as ReturnType<EffectCallback>
        },
        deps
    )
    useDebugValue(effect)
    return effect
}