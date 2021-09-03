import { DependencyList, useDebugValue, useLayoutEffect } from "react"
import { useEfct } from "./efct"
import { useEfctAbstract } from "./efct.abstract"

export const useLayoutEfct: typeof useEfct = <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(effect: T, deps?: DependencyList): T => {
    return useEfctAbstract(useLayoutEffect, effect, deps)
}