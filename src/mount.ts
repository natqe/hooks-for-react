import { useDebugValue } from "react"
import { useEfct } from "./efct"
import { useMountAbstract } from "./mount.abstract"

export const useMount = (callback: Parameters<typeof useEfct>[0]) => {
    useDebugValue(callback)
    useMountAbstract(useEfct, callback)
}