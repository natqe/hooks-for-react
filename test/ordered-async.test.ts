import { act, render } from "@testing-library/react"
import { createElement, FC, useEffect, useState } from "react"
import { useOrderedAsync } from '../src/ordered-async'
import { useSuperState } from "../src/super-state"

test(`Run in order`, async () => {
    const orderOfExecution = []
    const Component: FC = () => {
        const [state, setState] = useState(0)
        useOrderedAsync(
            async () => {
                const currentState = state
                orderOfExecution.push(currentState)
                if (currentState < 2) act(() => {
                    setState(v => ++v)
                })
                if (currentState === 1) await new Promise(resolve => setTimeout(resolve, 10))
            },
            [state]
        )
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(orderOfExecution).toEqual([0, 1, 2])
})

test(`Ensure prevEffect not bounce`, async () => {
    let runCount = 0
    const Component: FC = () => {
        const [state, setState, stateRef] = useSuperState(0)
        useOrderedAsync(
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
        useEffect(() => state === 2 && setState(v => ++v), [state])
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(runCount).toEqual(5)
})