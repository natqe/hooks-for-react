import { DependencyList, useDebugValue, useEffect, useRef, useState } from "react"
import { useAbstractTimeout } from "./timeout.abstract"

export const useTimeout = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    useDebugValue(callback)
    return useAbstractTimeout(useEffect, callback, ms, deps)
}