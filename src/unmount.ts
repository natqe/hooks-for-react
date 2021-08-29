import { useDebugValue, useEffect } from "react"

export const useUnmount = <C extends (() => void | Promise<void>)>(callback: C) => {
    useDebugValue(callback)
    useEffect(() => () => void callback(), [])
    return callback
}