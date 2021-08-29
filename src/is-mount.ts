import { useDebugValue, useLayoutEffect, useRef } from "react"

export const useIsMount = () => {
    const isMountedRef = useRef(false)
    useLayoutEffect(
        () => {
            isMountedRef.current = true
            return () => {
                isMountedRef.current = false
            }
        },
        []
    )
    useDebugValue(isMountedRef.current)
    return [isMountedRef.current, isMountedRef] as const
}