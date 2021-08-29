import { DependencyList, useDebugValue, useEffect, useRef, useState } from "react"

export const useTimeout = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
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
    useEffect(
        () => {
            handle.current = requestAnimationFrame(frameCallback)
            return () => cancelAnimationFrame(handle.current)
        },
        deps
    )
    useDebugValue(callback)
    return handle
}