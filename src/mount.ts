import { useDebugValue, useLayoutEffect, useRef } from "react"
import { useLayoutEfct } from "./layout-efct"

export const useMount = () => {
    const isMountedRef = useRef(false)
    useLayoutEfct(() => {
        isMountedRef.current = true
        return () => {
            isMountedRef.current = false
        }
    })
    useDebugValue(isMountedRef.current)
    return [isMountedRef.current, isMountedRef] as const
}