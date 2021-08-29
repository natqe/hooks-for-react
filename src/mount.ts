import { useDebugValue } from "react"
import { useEfct } from "./efct"

export const useMount = (callback: Parameters<typeof useEfct>[0]) => {
    useDebugValue(callback)
    useEfct(callback, [])
}