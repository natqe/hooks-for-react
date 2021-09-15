import { createElement, FC, useEffect } from "react"
import { useSuperState } from "../src/super-state"
import { useBounceAsync } from '../src/bounce-async'
import { act, render } from "@testing-library/react"

test(`Ensure prevEffect bounce`, async () => {
    let runCount = 0
    const Component: FC = () => {
        const [state, setState, stateRef] = useSuperState(0)
        useBounceAsync(
            async () => {
                const state = stateRef.current
                ++runCount
                if (state < 4) act(() => {
                    setState(v => ++v)
                })
                if (state === 1) await new Promise(resolve => setTimeout(resolve, 50))
            },
            [state]
        )
        useEffect(() => (state === 2 || state === 3) && setState(v => ++v), [state])
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(runCount).toEqual(3)
})