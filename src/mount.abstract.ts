import { useDebugValue } from "react"
import { useEfct } from "./efct"
import { useLayoutEfct } from "./layout-efct"

export const useMountAbstract = (hook: typeof useEfct | typeof useLayoutEfct, callback: Parameters<typeof useEfct>[0]) => {
    hook(callback, [])
}