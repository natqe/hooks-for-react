import { DependencyList, useDebugValue, useLayoutEffect, useRef, useState } from "react"

export const useLayoutInterval = (callback: () => void | Promise<void>, ms = 0, deps?: DependencyList) => {
    const handle = useRef<ReturnType<typeof requestAnimationFrame>>()
    const [initialTimestamp] = useState(() => Date.now())
    const prevLoadTimeStamp = useRef<Parameters<FrameRequestCallback>[0]>(initialTimestamp)
    const frameCallback = () => {
        handle.current = requestAnimationFrame(frameCallback)
        const now = Date.now()
        if (prevLoadTimeStamp.current + ms <= now) {
            prevLoadTimeStamp.current = now
            callback()
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