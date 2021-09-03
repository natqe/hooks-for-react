import { render } from '@testing-library/react'
import { createElement, MutableRefObject, useRef } from 'react'
import { useLayoutMount } from './layout-mount'

test(`Run a callback when the component is mounted`, async () => {
    let ref: MutableRefObject<number>
    const Component = () => {
        ref = useRef(0)
        useLayoutMount(() => void ++ref.current)
        return null
    }
    render(createElement(Component)).unmount()
    expect(ref.current).toBe(1)
})