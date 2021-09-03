import { render } from '@testing-library/react'
import { createElement } from 'react'
import { useSuperRef } from './super-ref'

test(`The value stay the same if not explicitly changed`, async () => {
    let count: number
    const Component = ({ prop }) => {
        const [otherValue] = useSuperRef(prop)
        const [value] = useSuperRef(() => prop)
        count = value || otherValue
        return null
    }
    render(createElement(Component, { prop: 0 })).rerender(createElement(Component, { prop: 1 }))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(count).toBe(0)
})