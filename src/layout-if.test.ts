import { render } from '@testing-library/react'
import { createElement, FC } from 'react'
import { useLayoutIf } from './layout-if'

test(`Run when condition is truthy`, () => {
    let conditionMatch: boolean
    const Component: FC = () => {
        useLayoutIf(10, ()=> {
            conditionMatch = true
        })
        return null
    }
    render(createElement(Component))
    expect(conditionMatch).toBe(true)
})

test(`Do NOT tun when condition is falsy`, () => {
    let conditionMatch: boolean
    const Component: FC = () => {
        useLayoutIf(0, ()=> {
            conditionMatch = true
        })
        return null
    }
    render(createElement(Component))
    expect(conditionMatch).toBeUndefined()
})