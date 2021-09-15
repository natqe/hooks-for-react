import { DependencyList, useDebugValue } from "react"
import { useEfct } from "./efct"
import { promiseEffect } from "./efct.abstract"

export const useAsyncEffect = (effect: promiseEffect, deps?: DependencyList) => {
    useDebugValue(effect)
    return useEfct(effect, deps)
}