import { useDebugValue } from "react"
import { useSupperState } from "./supper-state"

export const useBindState = <T>(value: T) => {
    const result = useSupperState<T>(() => value, [value])
    useDebugValue(result[0])
    return result
}