import { DependencyList, useDebugValue, useEffect } from "react"
import { useEfctAbstract } from "./efct.abstract"

type useEfct = {
    <T extends ((onCleanup: (execute: () => void) => void) => Promise<void>)>(effect: T, deps?: DependencyList): T
    <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void))>(effect: T, deps?: DependencyList): T
    <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(effect: T, deps?: DependencyList): T
}

export const useEfct: useEfct = <T extends ((onCleanup: (execute: () => void) => void) => void | (() => void) | Promise<void>)>(effect: T, deps?: DependencyList) => {
    return useEfctAbstract(useEffect, effect, deps)
}