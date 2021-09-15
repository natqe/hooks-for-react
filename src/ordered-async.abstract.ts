import { DependencyList, useDebugValue } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useOrderedAsyncAbstract = (hook: typeof useEfct | typeof useLayoutEfct, effect: promiseEffect, deps?: DependencyList) => {
    const prevEffect = hook(
        async (onCleanup) => {
            await prevEffect({ bounce: false })
            return effect(onCleanup)
        },
        deps
    )
}