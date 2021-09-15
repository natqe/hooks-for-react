import { DependencyList, useDebugValue } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"
import { useOrderedAsyncAbstract } from "./ordered-async.abstract"

export const useOrderedAsync = (...args: [effect: promiseEffect, deps?: DependencyList]) => {
    useDebugValue(args[0])
    return useOrderedAsyncAbstract(useEfct, ...args)
}