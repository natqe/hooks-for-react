import { useDebugValue } from "react"
import { useSuperState } from "./super-state"

export const useBindState = <T>(value: T) => {
    const result = useSuperState<T>(() => value, [value])
    useDebugValue(result[0])
    return result
}