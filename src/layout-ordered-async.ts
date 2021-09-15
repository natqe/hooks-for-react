import { DependencyList, useDebugValue } from "react"
import { promiseEffect } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"
import { useOrderedAsyncAbstract } from "./ordered-async.abstract"

export const useLayoutOrderedAsync = (...args: [effect: promiseEffect, deps?: DependencyList]) => {
    useDebugValue(args[0])
    return useOrderedAsyncAbstract(useLayoutEfct, ...args)
}