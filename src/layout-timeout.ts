import { DependencyList, useDebugValue, useLayoutEffect, useRef, useState } from "react"

export const useLayoutTimeout = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    const handle = useRef<ReturnType<typeof requestAnimationFrame>>()
    const [initialTimestamp] = useState(() => Date.now())
    const prevLoadTimestamp = useRef<Parameters<FrameRequestCallback>[0]>(initialTimestamp)
    const frameCallback = () => {
        handle.current = requestAnimationFrame(frameCallback)
        const now = Date.now()
        if (prevLoadTimestamp.current + ms <= now) {
            prevLoadTimestamp.current = now
            callback()
            cancelAnimationFrame(handle.current)
        }
    }
    useLayoutEffect(
        () => {
            handle.current = requestAnimationFrame(frameCallback)
            return () => cancelAnimationFrame(handle.current)
        },
        deps
    )
    useDebugValue(callback)
    return handle
}