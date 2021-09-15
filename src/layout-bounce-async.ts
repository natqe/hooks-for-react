import { DependencyList, useDebugValue } from "react"
import { promiseEffect } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"
import { useBounceAsyncAbstract } from "./bounce-async.abstract"

export const useLayoutBounceAsync = (...args: [effect: promiseEffect, deps?: DependencyList]) => {
    useDebugValue(args[0])
    return useBounceAsyncAbstract(useLayoutEfct, ...args)
}