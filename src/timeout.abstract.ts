import { DependencyList, useEffect, useLayoutEffect, useRef, useState } from "react"

export const useAbstractTimeout = (
    hook: typeof useEffect | typeof useLayoutEffect,
    callback: () => void | Promise<void>,
    ms = 0,
    deps?: DependencyList
) => {
    const handle = useRef<ReturnType<typeof requestAnimationFrame>>()
    const frameCallback = (initialTimestamp: number) => {
        handle.current = requestAnimationFrame(() => frameCallback(initialTimestamp))
        if (initialTimestamp + ms <= Date.now()) {
            callback()
            cancelAnimationFrame(handle.current)
        }
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