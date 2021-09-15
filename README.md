# **Hooks for React**
A Set of Must use Hooks necessary for daily work with `React`
## **Table of contents**
- [State](#state)
    - [useSuperState](#usesuperstate)
    - [useBindState](#usebindstate)
- [Callback](#callback)
    - [useSameCallback](#usesamecallback)
- [Ref](#ref)
    - [useSuperRef](#usesuperref)
    - [useBindRef](#usebindref)
    - [useInnerRef](#useinnerref)
- [Lifecycles](#lifecycles)
    - [useInitial](#useinitial)
    - [useRun](#userun)
    - [useAsyncEffect](#useasynceffect)
    - [useIf](#useif)
    - [useMount](#usemount)
    - [useIsMount](#useismount)
    - [useUnmount](#useunmount)
    - [useRender](#userender)
- [Dom](#dom)
    - [useClassName](#useclassname)
    - [useStyle](#usestyle)
    - [useHover](#usehover)
- [Timer](#timer)
    - [useTimeout](#usetimeout)
    - [useInterval](#useinterval)
- [Logger](#logger)
    - [useLog](#uselog)
## **State**
### **`useSuperState`**
---
Use a state with super powers.

This hook is like a combination of `useState`, `useMemo` and `useRef` hooks at once.

**Performance savings**: This hook gives you the ability to apply logic on the go, and saves you unnecessary component rendering by eliminating the need to use `React` `useEffect` to update the state in certain scenarios.

Returns a stateful value, and a function to update it + a ref to the state value.

**Definition**
```ts
<S>(factory: S | ((prev: S) => S), deps?: DependencyList): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
```
**Usage**

You can use it as you normally do with the `useState` hook.

```js
const [state, setState, stateRef] = useSuperState(/* Initial state */ 0)
const [state, setState, stateRef] = useSuperState(/* Initial state creator - run only once */ () => 0)
```
Or you can pass a factory function and a list of dependencies as you would do with the `useMemo` hook.

The state will be changed either by using `setState` or from outside when the list of dependencies changes.

**Note**: You have access to the previous state by the parameter passed to the factory function.

```js
const [state, setState, stateRef] = useSuperState(
    // State factory - run if the dependency list changed
    prevState => (prevState || 0) + props.count,
    // Dependency list
    [props.count]
)
```
### **`useBindState`**
---
Bind a state to an outside value.

When the outside value changes, the state will be updated with the new value.

Returns a stateful value and function to update it + ref to the state value.

**Definition**
```ts
<S>(value: S): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
```
**usage**

The `outsideValue` will create the initial state, and will also update the state when it changes.
```js
const [state, setState, stateRef] = useBindState(outsideValue)
```
## **Callback**
### **`useSameCallback`**
---

This hook is just like the `useCallback` hook with an empty array. This means that the callback will not change during the life of the component.

Returns a reference to the initial passed callback.

**Definition**
```ts
<T extends (...args: any[]) => any>(callback: T): T
```
**usage**
```js
const onClick = useSameCallback(() => console.log(exampleRef.current))
```
## **Ref**
### **`useSuperRef`**
---
Use a ref with super powers.

This hook is like a combination of `useMemo` and `useRef` hooks at once.

Returns a value, and a ref to the value.

**Definition**
```ts
<V>(factory: V | ((prev: V) => V), deps?: DependencyList): [V, MutableRefObject<V>]
```
**Usage**

You can use it as you normally do with the `useRef` hook.
```js
const [value, valueRef] = useSuperRef()
const [value, valueRef] = useSuperRef(/* Initial value */ 0)
```
Or you can pass an initializer function.
```js
const [value, valueRef] = useSuperRef(/* Initial value creator - only runs once */ () => 0)
```
Or you can pass a factory function and a list of dependencies as you would do with the `useMemo` hook.

The value will be changed either by using `useRef.current` or from outside when the list of dependencies changes.

**Note**: You have access to the previous value by the parameter passed to the factory function.
```js
const [value, valueRef] = useSuperRef(
    // ref value factory - run if the dependency list changed
    prevValue => (prevValue || 0) + props.count,
    // Dependency list
    [props.count]
)
```
### **`useBindRef`**
---
Bind a ref to an outside value.

When the outside value changes, the ref value will be updated to the new value.

Returns the ref object.

**Definition**
```ts
<V>(value: V): MutableRefObject<V>
```
**usage**

The `outsideValue` value will be the initial ref value and will also update the ref value when it changes.
```js
const myRef = useBindRef(outsideValue)
```
### **`useInnerRef`**
---
Convert `forwardedRef` to a new regular `React` ref object.

Useful when using `forwardedRef` and you want to use the ref as a regular ref within the component as well.

Returns the ref object.

**Definition**
```ts
<T>(ref: ForwardedRef<T>): MutableRefObject<T>
```
**usage**
```jsx
const ExampleComp = forwardedRef((props, ref)=> {
    const innerRef = useInnerRef(ref)
    useEffect(
        ()=> console.log(innerRef.current),
        [innerRef.current]
    )
    return <div ref={innerRef}></div>
})
```
## **Lifecycles**
### **`useInitial`**
---
Use the initial value returned by the create function, which is invoked when the component initialized.

This hook is basically a substitute for the behavior of the constructor in the class components.

Returns the initial value.

**Definition**
```ts
<V>(create: () => V) => V
```
**usage**
```js
const id = useInitial(() => Math.random())
```
### **`useRun`**
---
This hook will run **immediately** if the dependency list changes.

The main difference between this hook and the `React` lifecycles hooks is: this hook is called immediately but the `useEffect` hook for example run after processing the component.

Returns an isFirstRun indicator.

**Definition**
```ts
(callback: () => void, deps: DependencyList): { isFirstRun: boolean, isFirstRunRef: MutableRefObject<boolean> }
```
**usage**
```jsx
const ExampleComp = props => {
    const myRef = useRef(5)
    useRun(() => myRef.current += props.count, [props.count])
    return myRef.current > 10 && <div>Hello World!</div>
}
```
You also have additional data returns that can be useful in some cases.
```js
const { isFirstRun, isFirstRunRef } = useRun(() => console.log(`Dependencies change`), [...someDeps])
```
### **`useAsyncEffect`**
---
This hook is a modified version of `React` `useEffect` hook that adds a nice support for async callback effect.

You can achieve the same cleanup behavior as the native `useEffect` by accessing the effect argument and passing to it a callback. **Note:** You should call it above any async operation.

**Note**: Use `useLayoutAsyncEffect` for the layout effect version.

Returns indicator for the previous effect execution. This can help you to achieve ordered effects execution.

**Definition**
```ts
(effect: (onCleanup: (execute: () => void | Promise<void>) => void) => Promise<void>, deps?: DependencyList): void
```
**usage**
```js
useAsyncEffect(
    async () => {
        const user = await myApi.get('./user')
        setData(user)
    },
    []
)
```
With cleanup:
```js
useAsyncEffect(
    async (onCleanup)=> {
        const ac = new AbortController()
        // Call onCleanup above any async operation
        onCleanup(
            // cleanup callback
            () => ac.abort()
        )
        const res = await fetch('./my-api', { signal: ac.signal })
        const data = await res.json()
        setData(data)
        // onCleanup(() => ac.abort()) -> This is NOT OK!
    },
    [someDep]
)
```
Ordered async effects example:

**Note**: By default it has a bounce behavior, meaning it will skip the resolve of 'prevEffect' if the next effect arrives before the previous effect is completed.
```js
const prevEffect = useAsyncEffect(
    async () => {
        await prevEffect() // Wait until previous effect is completed.
        const users = await myApi.get(`./users?q=${searchValue}`)
        setData(users)
    },
    [searchValue]
)
```
Ordered async effects with the bounce behavior disabled.
```js
const prevEffect = useAsyncEffect(
    async () => {
        await prevEffect({ bounce: false })
        const users = await myApi.get(`./users?q=${searchValue}`)
        setData(users)
    },
    [searchValue]
)
```
### **`useIf`**
---
Run a effect callback when the first parameter is truthy.

**Note**: The Effect Callback can have a `React` `useEffect` Callback signature, or a [`useAsyncEffect`](useasynceffect) Callback signature.

**Note:** Use `useLayoutIf` for the layout effect version.

**Definition**
```ts
(condition: unknown, callback: EffectCallback): boolean
```
**usage**

Except a `React` `useEffect` callback.
```js
useIf(someValue === otherValue, () => {
    console.log(`It is equal`)
    // Cleanup
    return () => console.log(`Cleaned up`)
})
```
[`useAsyncEffect`](#useasynceffect) callback also will work.
```js
useIf(someValue === otherValue, async onCleanup => {
    onCleanup(() => console.log(`Cleaned up`)) // Always put it above any async operation.
    const data = await api.send(`It is equal`)
    console.log(data)
})
```
### **useMount**
---
Run a callback when the component is mounted.

**Note**: The Effect Callback can have a `React` `useEffect` Callback signature, or a [`useAsyncEffect`](useasynceffect) Callback signature.

**Note**: Use `useLayoutMount` for the layout effect version.

**Definition**
```ts
(callback: EffectCallback): void
```
**usage**

Except a `React` `useEffect` callback.
```js
useMount(() => {
    console.log(`It is equal`)
    // Cleanup
    return () => console.log(`Cleaned up`)
})
```
Callback signature for [`useAsyncEffect`](#useasynceffect) should also will work.
```js
useMount(async onCleanup => {
    onCleanup(() => console.log(`Cleaned up`)) // Always put it above any async operation.
    const data = await api.send(`It is equal`)
    console.log(data)
})
```
### **`useIsMount`**
---
Get to know the component current mounted state.

Returns a boolean and a ref to the boolean.

**Definition**
```ts
(): [boolean, MutableRefObject<boolean>]
```
**usage**
```js
const [isMount, isMountRef] = useIsMount()
```
### **`useUnmount`**
---
Run a callback when the component is unmounted.

Returns the callback that get passed.

**Definition**
```ts
<C extends (()=> void | Promise<void>>)>(callback: C): C
```
**usage**
```js
useUnmount(() => console.log(`Component unmounted`))
useUnmount(() => someSubscription.unsubscribe())
```
### **`useRender`**
---
Give you a option to force the component to be render.

Returns a render function that can be invoked to render the component when you need so.

**Definition**
```ts
(): () => void
```
**usage**
```js
const render = useRender()
useEffect(() => render(), [...someDeps]) // the component will render when the deps get changed.
```
## **Dom**
### **`useClassName`**
---
Join lists of dom element className to be one className string, and memoized it depending on dependency list.

Returns a string represents the combination of all className in the array list.

**Definition**
```ts
(factory: () => Array<string>, deps: DependencyList): string
```
**usage**
```jsx
const myClassName = useClassName(
    // Define a factory that returns array of classNames
    () => [
        `flex black`,
        someCondition && `some-class other-class`,
        secondCondition ? `new-class-list`: ``
    ],
    // List of dependencies go here
    [someCondition, secondCondition]
)
<div className={myClassName}>Hello world</div>
```
### **`useStyle`**
---
Create style and memoized it depending on dependency list.

Returns the created style object, ready for use as a property of html element.

**Definition**
```ts
(factory: () => CSSProperties, deps: DependencyList): CSSProperties
```
**usage**
```jsx
const myStyle = useStyle(
    // Define a Factory that returns style object
    () => ({
        backgroundColor: someCondition && `black`,
        color: someCondition ? `white`: `black`
    }),
    // List of dependencies go here
    [someCondition]
)
<div style={myStyle}>Hello world</div>
```
### **`useHover`**
---
Get a sense when a element dom get hovered.

**Note**: You can disabled the hook functionality by passing `false` to the enabled option.

**Note**: If you don't pass ref to the element by using the ref option, an ref will be created for you.

Returns a boolean represents the truthiness of the element hover state, and a ref to the element.

**Definition**
```ts
<T extends HTMLElement>({ ref, enabled }?: { ref?: MutableRefObject<T>, enabled?: boolean }): [boolean, MutableRefObject<T>]
```
**usage**
```jsx
const [isHover, btnRef] = useHover()
<button ref={btnRef}>Hover Me</button>
```
You have also some options you can pass to the hook.

Here is an example of using pre created ref.
```js
const btnRef = useRef()
const [isHover] = useHover({ ref: btnRef })
```
Also you can disabled the hover functionality and logic if you don`t need it right now.

**Note**: The default value for the enabled option is `true`.
```js
const isMobile = true
const [isHover, btnRef] = useHover({ enabled: !isMobile })
```
## **Timer**
### **`useTimeout`**
---
Use a callback on amount of time after the dependency list changes.

**Note**: If you don't pass an dependency list, the effect will stop and rerun after every completed render.

**Note**: This hook used `requestAnimationFrame` behind the scenes, for performance reason.

**Note:** Use `useLayoutTimeout` for the layout effect version.

Returns a ref to the current result of `requestAnimationFrame` call.

**Definition**
```ts
(callback: () => void, ms?: number, deps?: DependencyList): MutableRefObject<number>
```
**usage**
```js
const handleRef = useTimeout(
    /* callback */
    () => console.log(`DependencyList changes`),
    /* milliseconds */
    1000,
    /* Dependency List */
    [...someDeps]
)
```
And you can cancel the `requestAnimationFrame` like so.
```js
cancelAnimationFrame(handleRef.current)
```
### **`useInterval`**
---
Restart a interval on amount of time after the dependency list changes.

**Note**: If you don't pass an dependency list, the effect will rerun after every completed render.

**Note**: This hook used `requestAnimationFrame` behind the scenes, for performance reason.

**Note**: Use `useLayoutInterval` for the layout effect version.

Returns a ref to the current result of `requestAnimationFrame` call.

**Definition**
```ts
(callback: () => void, ms?: number, deps?: DependencyList): MutableRefObject<number>
```
**usage**
```js
const handleRef = useInterval(
    /* callback */
    () => console.log(`DependencyList changes`),
    /* milliseconds */
    1000,
    /* DependencyList */
    [...someDeps]
)
```
And you can cancel the `requestAnimationFrame` like so.
```js
cancelAnimationFrame(handleRef.current)
```
## **Logger**
### **`useLog`**
---
Log when parameters changed.

Returns a list holding the parameters that get passed.

**Definition**
```ts
<T>(...params: T): T
```
**usage**
```js
useLog(props.count, props.className)
// Log to the console a list with the current value of the parameters
```
If you pass only one object parameter, it will compares the object deeply for tracking a changes and log the new object to the console.
```js
useLog({ count: props.count, myState: state })
// Log the object when one of the properties changed.
```