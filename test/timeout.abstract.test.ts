import { render } from '@testing-library/react'
import { createElement, MutableRefObject, useEffect, useRef } from 'react'
import { useAbstractTimeout } from '../src/timeout.abstract'

test(`Implement timeout`, async () => {
    let ref: MutableRefObject<number>
    const Component = () => {
        ref = useRef(0)
        useAbstractTimeout(useEffect, () => void ++ref.current)
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(ref.current).toBe(1)
})