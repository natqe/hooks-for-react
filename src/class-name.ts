import { DependencyList, useDebugValue, useMemo } from "react"
import { createClassName } from "./common/create-class-name"

export const useClassName = (factory: () => ReadonlyArray<string>, deps: DependencyList = []) => {
    const className = useMemo(() => createClassName(...factory()), deps)
    useDebugValue(className)
    return className
}