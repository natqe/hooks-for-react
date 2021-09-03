import { createElement, FC, MutableRefObject } from 'react'
import { create } from 'react-test-renderer'
import { useBindState } from './bind-state'

test(`It bind`, () => {
    let refHolder: MutableRefObject<string>
    const Component: FC<{ named: string }> = ({ named }) => {
        const [, , stateRef] = useBindState(named)
        refHolder = stateRef
        return null
    }
    const renderWith = (named: string) => createElement(Component, { named })
    const component = create(renderWith(`foo`))
    component.update(renderWith(`bar`))
    expect(refHolder.current).toBe(`bar`)
})