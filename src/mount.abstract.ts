import { useDebugValue } from "react"
import { useEfct } from "./efct"
import { efct } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useMountAbstract = (hook: typeof useEfct | typeof useLayoutEfct, callback: efct) => {
    hook(callback, [])
}