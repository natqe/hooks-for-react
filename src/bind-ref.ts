import { useDebugValue, useRef } from "react"
import { useRun } from "./run"

export const useBindRef = <T>(value: T) => {
    const ref = useRef<T>()
    useRun(() => ref.current = value, [value])
    useDebugValue(ref.current)
    return ref
}