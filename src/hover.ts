import { MutableRefObject, useDebugValue, useRef, useState } from "react"
import { useLayoutEfct } from "./layout-efct"
import { useSupperState } from "./supper-state"

type useHoverArgs<T extends HTMLElement> = {
    ref?: MutableRefObject<T>
    enabled?: boolean
}

export const useHover = <T extends HTMLElement>({ ref = useRef<T>(null), enabled = true }: useHoverArgs<T> = { ref: useRef<T>(null), enabled: true }) => {
    const [value, setValue] = useSupperState(false)
    useLayoutEfct(
        () => {
            const { current } = ref
            if (enabled && current) {
                const handleMouseOver = () => setValue(true)
                const handleMouseOut = () => setValue(false)
                current.addEventListener(`mouseover`, handleMouseOver)
                current.addEventListener(`mouseout`, handleMouseOut)
                return () => {
                    current.removeEventListener(`mouseover`, handleMouseOver)
                    current.removeEventListener(`mouseout`, handleMouseOut)
                }
            }
        },
        [ref.current, enabled]
    )
    useDebugValue(value)
    return <const>[value, ref]
}