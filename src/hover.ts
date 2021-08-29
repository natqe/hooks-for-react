import { MutableRefObject, useDebugValue, useLayoutEffect, useRef } from "react"
import { useSuperState } from "./super-state"

type useHoverArgs<T extends HTMLElement> = {
    ref?: MutableRefObject<T>
    enabled?: boolean
}

export const useHover = <T extends HTMLElement>({ ref = useRef<T>(null), enabled = true }: useHoverArgs<T> = { ref: useRef<T>(null), enabled: true }) => {
    const [value, setValue] = useSuperState(false)
    useLayoutEffect(
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