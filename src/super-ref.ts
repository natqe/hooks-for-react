import { DependencyList, MutableRefObject, useDebugValue, useRef, useMemo } from 'react'
import { isFunction } from './common/is-function'
import { NonFunction } from './common/non-function.type'
import { useRun } from "./run"

type useSuperRef = {
    <V = undefined>(): readonly [V | undefined, MutableRefObject<V | undefined>]
    <V>(initialValue: () => V): readonly [V, MutableRefObject<V>]
    <V>(initialValue: NonFunction<V>): readonly [V, MutableRefObject<V>]
    <V>(factory: () => V, deps: DependencyList): readonly [V, MutableRefObject<V>]
    <V>(factory: (prev: V) => V, deps: DependencyList): readonly [V, MutableRefObject<V>]
}

export const useSuperRef: useSuperRef = <V>(factory?: V | ((prev: V) => V), deps: DependencyList = []) => {
    const ref = useRef<V>()
    useRun(() => ref.current = isFunction(factory) ? factory(ref.current) : factory, deps)
    useDebugValue(ref.current)
    return <const>[ref.current, ref]
}