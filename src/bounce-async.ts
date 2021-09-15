import { DependencyList, useDebugValue } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"
import { useBounceAsyncAbstract } from "./bounce-async.abstract"

export const useBounceAsync = (...args: [effect: promiseEffect, deps?: DependencyList]) => {
    useDebugValue(args[0])
    return useBounceAsyncAbstract(useEfct, ...args)
}