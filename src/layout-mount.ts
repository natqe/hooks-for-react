import { useDebugValue } from "react"
import { useLayoutEfct } from "./layout-efct"
import { useMountAbstract } from "./mount.abstract"

export const useLayoutMount = (callback: Parameters<typeof useLayoutEfct>[0]) => {
    useDebugValue(callback)
    useMountAbstract(useLayoutEfct, callback)
}