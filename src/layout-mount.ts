import { useDebugValue } from "react"
import { useLayoutEfct } from "./layout-efct"

export const useLayoutMount = <C extends Parameters<typeof useLayoutEfct>[0]>(callback: C) => {
    useDebugValue(callback)
    useLayoutEfct(callback, [])
    return callback
}