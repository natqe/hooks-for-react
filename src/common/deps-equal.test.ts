import { depsEqual } from './deps-equal'

test(`Implement timeout`, () => {
    expect(depsEqual([1], [1])).toBe(true)
    expect(depsEqual([1], [2])).toBe(false)
    expect(depsEqual([1], [1, 2])).toBe(false)
})