import { DependencyList } from "react"

export const depsEqual = (newInputs: DependencyList, lastInputs: DependencyList) => {
    // no checks needed if the inputs length has changed
    if (newInputs.length !== lastInputs.length) return false
    // Using for loop for speed. It generally performs better than array.every
    for (let i = 0; i < newInputs.length; i++) if (newInputs[i] !== lastInputs[i]) return false
    return true
}