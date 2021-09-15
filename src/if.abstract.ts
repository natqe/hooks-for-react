import { useEfct } from "./efct"
import { efct } from "./efct.abstract"
import { useLayoutEfct } from "./layout-efct"

export const useIfAbstract = <T extends efct>(hook: typeof useEfct | typeof useLayoutEfct, condition: unknown, callback: T) => hook<T>(
    ((onCleanup) => {
        if (condition) return callback(onCleanup)
    }) as any,
    [!!condition]
)