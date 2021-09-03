import { render } from '@testing-library/react'
import { createElement, useEffect } from 'react'
import { useSuperState } from './super-state'

test(`The value stay the same if not explicitly changed`, async () => {
    let count: number
    const Component = ({ prop }) => {
        const [otherValue] = useSuperState(prop)
        const [value] = useSuperState(() => prop)
        count = value || otherValue
        return null
    }
    render(createElement(Component, { prop: 0 })).rerender(createElement(Component, { prop: 1 }))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(count).toBe(0)
})

test(`Prevents render if value not change`, async () => {
    let count = 0
    const Component = () => {
        const [, setState] = useSuperState(0)
        ++count
        useEffect(
            () => {
                setState(0)
                setState(() => 0)
            },
            []
        )
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(count).toBe(1)
})