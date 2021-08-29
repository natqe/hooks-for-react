import { useDebugValue, useReducer } from "react"
import { useInitial } from "./initial"
import { useIsMount } from "./is-mount"

export const useRender = () => {
    const [count, dispatch] = useReducer((prev: number) => prev + 1, 0)
    const [, isMountRef] = useIsMount()
    const render = useInitial(() => () => {
        if (isMountRef.current) dispatch()
    })
    useDebugValue(count)
    return render
}