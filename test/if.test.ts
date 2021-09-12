import { render } from '@testing-library/react'
import { createElement, FC } from 'react'
import { useIf } from '../src/if'

test(`Run when condition is truthy`, async () => {
    let conditionMatch: boolean
    const Component = ({ prop }) => {
        useIf(prop, () => {
            return () => conditionMatch = true
        })
        return null
    }
    render(createElement(Component, { prop: 2 })).rerender(createElement(Component, { prop: 0 }))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(conditionMatch).toBe(true)
})

test(`Do NOT tun when condition is falsy`, () => {
    let conditionMatch: boolean
    const Component: FC = () => {
        useIf(0, () => {
            conditionMatch = true
        })
        return null
    }
    render(createElement(Component))
    expect(conditionMatch).toBeUndefined()
})