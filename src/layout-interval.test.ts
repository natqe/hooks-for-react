import { render } from '@testing-library/react'
import { createElement, MutableRefObject, useRef } from 'react'
import { useLayoutInterval } from './layout-interval'

test(`Implement interval`, async () => {
    let ref: MutableRefObject<number>
    const Component = () => {
        ref = useRef(0)
        useLayoutInterval(() => void ++ref.current, 70, [])
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 210))
    expect(ref.current).toBeGreaterThan(1)
})

test(`Default values`, async () => {
    let ref: MutableRefObject<number>
    const Component = () => {
        ref = useRef(0)
        useLayoutInterval(() => void ++ref.current)
        return null
    }
    const component = render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 20))
    component.unmount()
    expect(ref.current).toBeTruthy()
})