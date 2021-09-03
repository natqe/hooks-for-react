import { DependencyList, useDebugValue, useLayoutEffect } from "react"
import { useAbstractTimeout } from "./timeout.abstract"

export const useLayoutTimeout = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    useDebugValue(callback)
    return useAbstractTimeout(useLayoutEffect, callback, ms, deps)
}