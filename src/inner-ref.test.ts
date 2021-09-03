import { render } from '@testing-library/react'
import { createElement, forwardRef, MutableRefObject, useRef } from 'react'
import { useInnerRef } from './inner-ref'

test(`Convert forwardedRef to a new regular React ref object`, () => {
    let ref: MutableRefObject<HTMLElement>
    const Component = forwardRef<HTMLElement>((_, outRef) => {
        ref = useInnerRef(outRef)
        return createElement(`button`, { ref }, `My button`)
    })
    render(createElement(Component))
    expect(ref.current).toBeDefined()
})

test(`Ref can be used in parent component`, () => {
    let ref: MutableRefObject<HTMLElement>
    const Component = forwardRef<HTMLElement>((_, outRef) => {
        const ref = useInnerRef(outRef)
        return createElement(`button`, { ref }, `My button`)
    })
    const ParentComponent = () => {
        ref = useRef()
        return createElement(Component, { ref })
    }
    render(createElement(ParentComponent))
    expect(ref.current).toBeDefined()
})