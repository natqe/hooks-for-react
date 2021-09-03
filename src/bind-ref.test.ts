import { createElement, FC, MutableRefObject } from 'react'
import { create } from 'react-test-renderer'
import { useBindRef } from './bind-ref'

test(`It bind`, () => {
    let refHolder: MutableRefObject<string>
    const Component: FC<{ named: string }> = ({ named }) => {
        const ref = useBindRef(named)
        refHolder = ref
        return null
    }
    const renderWith = (named: string) => createElement(Component, { named })
    const component = create(renderWith(`foo`))
    component.update(renderWith(`bar`))
    expect(refHolder.current).toBe(`bar`)
})