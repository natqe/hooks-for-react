import { render } from '@testing-library/react'
import { createElement } from 'react'
import { useLog } from './log'

beforeAll(() => console.log = jest.fn())
afterAll(() => jest.resetAllMocks())

test(`Log when parameters changed`, async () => {
    const prop = `hello`
    const Component = ({ prop }) => {
        useLog(prop)
        return null
    }
    render(createElement(Component)).rerender(createElement(Component, { prop }))
    await new Promise(resolve => setTimeout(resolve, 10))
    expect(console.log).toHaveBeenCalledWith(prop)
})

test(`Compares the object deeply for tracking a changes and log the new object`, async () => {
    const prop = { innerValue: `hello` }
    const Component = ({ prop }) => {
        useLog(prop)
        return null
    }
    render(createElement(Component, { prop: {} })).rerender(createElement(Component, { prop }))
    await new Promise(resolve => setTimeout(resolve, 10))
    expect(console.log).toHaveBeenCalledWith(prop)
})