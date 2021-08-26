import { ForwardedRef, useDebugValue, useImperativeHandle, useRef } from "react"

export const useInnerRef = <T>(ref: ForwardedRef<T>) => {
    const innerRef = useRef<T>()
    useImperativeHandle(ref, () => innerRef.current)
    useDebugValue(innerRef.current)
    return innerRef
}