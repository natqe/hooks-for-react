import { DependencyList, useDebugValue, useEffect, useRef, useState } from "react"
import { useAbstractInterval } from "./interval.abstract"

export const useInterval = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    useDebugValue(callback)
    return useAbstractInterval(useEffect, callback, ms, deps)
}