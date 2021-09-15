import { DependencyList, useDebugValue } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useBounceAsyncAbstract = (hook: typeof useEfct | typeof useLayoutEfct, effect: promiseEffect, deps?: DependencyList) => {
    const prevEffect = hook(
        async (...args) => {
            await prevEffect({ bounce: true })
            return effect(...args)
        },
        deps
    )
}