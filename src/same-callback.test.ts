import { render } from '@testing-library/react'
import { createElement } from 'react'
import { useSameCallback } from './same-callback'

test(`Is same callback`, async () => {
    let isSameCallback: boolean
    let callbackHolder: () => void
    const Component = () => {
        const callback = useSameCallback(() => void 0)
        isSameCallback = callback === callbackHolder
        callbackHolder = callback
        return null
    }
    render(createElement(Component)).rerender(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(isSameCallback).toBe(true)
})