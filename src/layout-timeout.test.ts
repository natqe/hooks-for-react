import { render } from '@testing-library/react'
import { createElement, MutableRefObject, useRef } from 'react'
import { useLayoutTimeout } from './layout-timeout'

test(`Implement timeout`, async () => {
    let ref: MutableRefObject<number>
    const Component = () => {
        ref = useRef(0)
        useLayoutTimeout(() => void ++ref.current, 10, [])
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(ref.current).toBe(1)
})

test(`Default values`, async () => {
    let ref: MutableRefObject<number>
    const Component = () => {
        ref = useRef(0)
        useLayoutTimeout(() => void ++ref.current)
        return null
    }
    const component = render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 20))
    component.unmount()
    expect(ref.current).toBe(1)
})