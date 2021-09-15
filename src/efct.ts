import { DependencyList, useEffect } from "react"
import { efct, useEfctAbstract } from "./efct.abstract"

export const useEfct = <T extends efct>(effect: T, deps?: DependencyList) => useEfctAbstract(useEffect, effect, deps)