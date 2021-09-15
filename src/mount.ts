import { useDebugValue } from "react"
import { useEfct } from "./efct"
import { efct } from "./efct.abstract"
import { useMountAbstract } from "./mount.abstract"

export const useMount = (callback: efct) => {
    useDebugValue(callback)
    useMountAbstract(useEfct, callback)
}