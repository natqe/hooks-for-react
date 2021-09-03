import { render } from '@testing-library/react'
import { createElement } from 'react'
import { useMount } from './mount'
import { useRender } from './render'
import { useUnmount } from './unmount'

test(`Force the component to be render`, async () => {
    let renderCount = 0
    const Component = () => {
        ++renderCount
        const render = useRender()
        useMount(render)
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 10))
    expect(renderCount).toBe(2)
})

test(`Don't render when the component is unmounted`, async () => {
    let renderCount = 0
    const Component = () => {
        ++renderCount
        const render = useRender()
        useUnmount(render)
        return null
    }
    render(createElement(Component))
    await new Promise(resolve => setTimeout(resolve, 10))
    expect(renderCount).toBe(1)
})