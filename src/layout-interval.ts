import { useDebugValue, useRef, useState } from "react"
import { useLayoutEfct } from "./layout-efct"


export const useLayoutInterval = (callback: (args: void) => void, ms = 0) => {
    const handle = useRef<ReturnType<typeof requestAnimationFrame>>()
    const [initialTimestamp] = useState(() => Date.now())
    const prevLoadTimestamp = useRef<Parameters<FrameRequestCallback>[0]>(initialTimestamp)
    const frameCallback = () => {
        handle.current = requestAnimationFrame(frameCallback)
        const now = Date.now()
        if (prevLoadTimestamp.current + ms <= now) {
            prevLoadTimestamp.current = now
            callback()
        }
    }
    useLayoutEfct(() => {
        handle.current = requestAnimationFrame(frameCallback)
        return () => cancelAnimationFrame(handle.current)
    })
    useDebugValue(callback)
    return handle
}