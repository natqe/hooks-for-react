import { DependencyList, EffectCallback, useDebugValue } from "react"
import { useEfct } from "./efct"

declare const UNDEFINED_VOID_ONLY: unique symbol;
// Destructors are only allowed to return void.
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };

export const useUnmount = <T extends Destructor>(callback: T, deps: DependencyList = []) => {
    useDebugValue(callback)
    useEfct(() => callback as ReturnType<EffectCallback>, deps)
    return callback
}