import { createElement, FC } from 'react'
import { create } from 'react-test-renderer'
import { useClassName } from './class-name'

test(`Join lists of className to be one className string`, () => {
    let classNameReferrer: string
    const Component: FC<{ className: string }> = ({ className }) => {
        const innerClassName = useClassName(
            ()=> [`flex`, className],
            [className]
        )
        classNameReferrer = innerClassName
        return null
    }
    const renderWith = (className: string) => createElement(Component, { className })
    const component = create(renderWith(``))
    component.update(renderWith(`bar`))
    expect(classNameReferrer).toBe(`flex bar`)
})