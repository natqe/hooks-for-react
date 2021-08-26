import { useDebugValue, useReducer } from "react"
import { useInitial } from "."
import { useMount } from "./mount"

export const useRender = () => {
    const [count, dispatch] = useReducer((prev: number) => prev + 1, 0)
    const [, isMountRef] = useMount()
    const render = useInitial(() => () => {
        if (isMountRef.current) dispatch()
    })
    useDebugValue(count)
    return render
}