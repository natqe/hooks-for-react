import { DependencyList, useEffect, useLayoutEffect, useRef, useState } from "react"

export const useAbstractInterval = (hook: typeof useEffect | typeof useLayoutEffect, callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    const handle = useRef<ReturnType<typeof requestAnimationFrame>>()
    const frameCallback = (initialTimestamp: number) => {
        const now = Date.now()
        if (initialTimestamp + ms <= now) initialTimestamp = now
        handle.current = requestAnimationFrame(() => frameCallback(initialTimestamp))
        if(initialTimestamp === now) callback()
    }
    hook(
        () => {
            handle.current = requestAnimationFrame(() => frameCallback(Date.now()))
            return () => cancelAnimationFrame(handle.current)
        },
        deps
    )
    return handle
}