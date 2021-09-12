import { render } from '@testing-library/react'
import { createElement, CSSProperties, useRef } from 'react'
import { useStyle } from '../src/style'

test(`Return same object`, async () => {
    let isSameStyle: boolean
    const Component = ({ prop }) => {
        const styleHolder = useRef<CSSProperties>()
        const componentStyle = useStyle(() => ({ height: 100 }), [prop])
        if (styleHolder.current) isSameStyle = styleHolder.current === componentStyle
        styleHolder.current = componentStyle
        return null
    }
    render(createElement(Component, { prop: `some value` })).rerender(createElement(Component, { prop: `some value` }))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(isSameStyle).toBe(true)
})