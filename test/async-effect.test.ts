import { useAsyncEffect } from '../src/async-effect'
import { createElement, FC, useEffect, useState } from 'react'
import { act, render } from '@testing-library/react'
import { useLog, useSuperState } from '../src'

test(`Cleanup run on unmount`, done => {
    let cleanupCount = 0
    const Component: FC = () => {
        useAsyncEffect(
            async (onCleanup) => {
                onCleanup(() => void ++cleanupCount)
                onCleanup(() => void ++cleanupCount)
                cleanupCount = 0
                await new Promise(resolve => setTimeout(resolve))
            },
            []
        )
        return null
    }
    const component = render(createElement(Component))
    component.unmount()
    setTimeout(() => {
        expect(cleanupCount).toBe(2)
        done()
    })
})

test(`Cleanup runs immediately if called after unmount`, done => {
    let cleanupCount = 0
    const Component: FC = () => {
        useAsyncEffect(
            async (onCleanup) => {
                await new Promise(resolve => setTimeout(resolve, 100))
                onCleanup(() => void ++cleanupCount)
                if (cleanupCount === 1) cleanupCount = -1
            },
            []
        )
        return null
    }
    const component = render(createElement(Component))
    component.unmount()
    setTimeout(
        () => {
            expect(cleanupCount).toBe(-1)
            done()
        },
        200
    )
})