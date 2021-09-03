import { useDebugValue } from "react"
import { useSuperRef } from "."

export const useBindRef = <T>(value: T) => {
    const [, ref] = useSuperRef<T>(() => value, [value])
    useDebugValue(value)
    return ref
}