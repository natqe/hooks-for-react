import { DependencyList, useRef } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useOrderedAsyncAbstract = (hook: typeof useEfct | typeof useLayoutEfct, effect: promiseEffect, deps?: DependencyList) => {
    const prevEffectRef = useRef<Promise<void>>()
    hook(
        (...args) => {
            prevEffectRef.current = (async () => {
                await prevEffectRef.current
                await effect(...args)
            })()
        },
        deps
    )
}