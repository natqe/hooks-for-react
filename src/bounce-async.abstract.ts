import { DependencyList, useRef } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useBounceAsyncAbstract = (hook: typeof useEfct | typeof useLayoutEfct, effect: promiseEffect, deps?: DependencyList) => {
    const prevEffectRef = useRef<Promise<void>>()
    hook(
        (...args) => {
            const runEffect = async () => {
                const prevEffect = prevEffectRef.current
                await prevEffect
                if (prevEffect === prevEffectRef.current) await effect(...args)
            }
            const effectResult = runEffect()
            return () => {
                prevEffectRef.current = effectResult
            }
        },
        deps
    )
}