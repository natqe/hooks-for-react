import { DependencyList, useDebugValue, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useAbstractInterval } from "./interval.abstract"

export const useLayoutInterval = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    useDebugValue(callback)
    return useAbstractInterval(useLayoutEffect, callback, ms, deps)
}