import { isFunction } from './common/is-function'
import { DependencyList, Dispatch, MutableRefObject, SetStateAction, useDebugValue, useRef } from 'react'
import { useRender } from "./render"
import { useRun } from "./run"
import { useInitial } from "./initial"
import { NonFunction } from './common/non-function.type'

type useSuperState = {
    <S = undefined>(): readonly [S | undefined, Dispatch<SetStateAction<S | undefined>>, MutableRefObject<S | undefined>]
    <S>(initialState: () => S): readonly [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
    <S>(initialState: NonFunction<S>): readonly [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
    <S>(factory: () => S, deps: DependencyList): readonly [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
    <S>(factory: (prev: S) => S, deps: DependencyList): readonly [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
}

export const useSuperState: useSuperState = <S>(factory: S | ((prev: S) => S) = () => void 0, deps: DependencyList = []) => {
    const render = useRender()
    const ref = useRef<S>()
    const setState = useInitial(() => (value?: SetStateAction<S>) => {
        const prev = ref.current
        ref.current = isFunction(value) ? value(prev) : value
        if (ref.current !== prev) render()
    })
    useRun(() => ref.current = isFunction(factory) ? factory(ref.current) : factory, deps)
    useDebugValue(ref.current)
    return <const>[ref.current, setState, ref]
}