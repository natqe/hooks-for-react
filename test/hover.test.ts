import { fireEvent, render, screen } from '@testing-library/react'
import { createElement, FC, useRef } from 'react'
import { useHover } from '../src/hover'

test(`Get a sense when a element dom get hovered`, () => {
    let hovered: boolean
    const Component: FC = () => {
        const [isHover, ref] = useHover()
        hovered = isHover
        return createElement(`button`, { ref }, `My button`)
    }
    render(createElement(Component))
    fireEvent.mouseOver(screen.getByRole(`button`))
    expect(hovered).toBe(true)
    fireEvent.mouseOut(screen.getByRole(`button`))
    expect(hovered).toBe(false)
})

test(`Disabled state`, () => {
    let hovered: boolean
    const Component: FC = () => {
        const [isHover, ref] = useHover({ enabled: false })
        hovered = isHover
        return createElement(`button`, { ref }, `My button`)
    }
    render(createElement(Component))
    fireEvent.mouseOver(screen.getByRole(`button`))
    expect(hovered).toBe(false)
})

test(`Should work with pre defined ref`, () => {
    let hovered: boolean
    const Component: FC = () => {
        const [isHover, ref] = useHover({ ref: useRef() })
        hovered = isHover
        return createElement(`button`, { ref }, `My button`)
    }
    render(createElement(Component))
    fireEvent.mouseOver(screen.getByRole(`button`))
    expect(hovered).toBe(true)
    fireEvent.mouseOut(screen.getByRole(`button`))
    expect(hovered).toBe(false)
})