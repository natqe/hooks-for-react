import { useDebugValue, useState } from "react"

export const useInitial = <S>(initialState: () => S) => {
    const [result] = useState(initialState)
    useDebugValue(result)
    return result
}