import { useAsyncEffect } from '../src/async-effect'
import { createElement, FC, useEffect, useState } from 'react'
import { act, render } from '@testing-library/react'
import { useLog, useSuperState } from '../src'

test(`Cleanup run on unmount`, done => {
    let cleanupCount = 0
    const Component: FC = () => {
        useAsyncEffect(
            async (onCleanup) => {
                onCleanup(() => void ++cleanupCount)
                onCleanup(() => void ++cleanupCount)
                cleanupCount = 0
                await new Promise(resolve => setTimeout(resolve))
            },
            []
        )
        return null
    }
    const component = render(createElement(Component))
    component.unmount()
    setTimeout(() => {
        expect(cleanupCount).toBe(2)
        done()
    })
})

test(`Cleanup runs immediately if called after unmount`, done => {
    let cleanupCount = 0
    const Component: FC = () => {
        useAsyncEffect(
            async (onCleanup) => {
                await new Promise(resolve => setTimeout(resolve, 100))
                onCleanup(() => void ++cleanupCount)
                if (cleanupCount === 1) cleanupCount = -1
            },
            []
        )
        return null
    }
    const component = render(createElement(Component))
    component.unmount()
    setTimeout(
        () => {
            expect(cleanupCount).toBe(-1)
            done()
        },
        200
    )
})

test(`Ensure prevEffect will not stuck the process`, async () => {
    let tracker = 0
    const Component: FC = () => {
        const prevEffect = useAsyncEffect(
            async () => {
                await prevEffect()
                await prevEffect({ bounce: false })
                ++tracker
            },
            []
        )
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve))
    expect(tracker).toBe(1)
})

test(`Run in order`, async () => {
    const orderOfExecution = []
    const Component: FC = () => {
        const [state, setState] = useState(0)
        const prevEffect = useAsyncEffect(
            async () => {
                const currentState = state
                await prevEffect({})
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

test(`Ensure prevEffect bounce`, async () => {
    let runCount = 0
    const Component: FC = () => {
        const [state, setState, stateRef] = useSuperState(0)
        const prevEffect = useAsyncEffect(
            async () => {
                await prevEffect()
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

test(`Ensure prevEffect not bounce`, async () => {
    let runCount = 0
    const Component: FC = () => {
        const [state, setState, stateRef] = useSuperState(0)
        const prevEffect = useAsyncEffect(
            async () => {
                await prevEffect({ bounce: false })
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