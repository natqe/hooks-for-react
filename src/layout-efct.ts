import { DependencyList, useDebugValue, useLayoutEffect } from "react"
import { useEfct } from "./efct"
import { efct, useEfctAbstract } from "./efct.abstract"

export const useLayoutEfct: typeof useEfct = <T extends efct>(effect: T, deps?: DependencyList) => useEfctAbstract(useLayoutEffect, effect, deps)