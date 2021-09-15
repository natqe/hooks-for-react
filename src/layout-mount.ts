import { useDebugValue } from "react"
import { efct } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"
import { useMountAbstract } from "./mount.abstract"

export const useLayoutMount = (callback: efct) => {
    useDebugValue(callback)
    useMountAbstract(useLayoutEfct, callback)
}