import { MutableRefObject, useDebugValue, useRef, useState } from "react"

type useValueRef = {
    <S>(): readonly [S | undefined, MutableRefObject<S | undefined>]
    <S>(initialState: () => S): readonly [S, MutableRefObject<S>]
    <S>(initialState: S): readonly [S, MutableRefObject<S>]
}

export const useValueRef: useValueRef = <S>(factory?: S | (() => S)) => {
    const ref = useRef(useState<S>(factory)[0])
    useDebugValue(ref.current)
    return <const>[ref.current, ref]
}