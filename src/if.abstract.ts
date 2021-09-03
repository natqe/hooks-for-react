import { useEfct } from "./efct"
import { useLayoutEfct } from "./layout-efct"

export const useIfAbstract = (hook: typeof useEfct | typeof useLayoutEfct, condition: unknown, callback: Parameters<typeof useEfct>[0]) => {
    hook(
        onCleanup => {
            if (condition) return callback(onCleanup)
        },
        [!!condition]
    )
    return !!condition
}