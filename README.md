# **Hooks for React**
A Set of Must use Hooks necessary for daily work with `React`
## **Table of contents**
- [State](#state)
    - [useSupperState](#usesupperstate)
    - [useBindState](#usebindstate)
- [Memo](#memo)
    - [useMemoRef](#usememoref)
    - [useStableMemo](#useStableMemo)
- [Callback](#callback)
    - [useCB](#usecb)
- [Ref](#ref)
    - [useValueRef](#usevalueref)
    - [useBindRef](#usebindref)
    - [useInnerRef](#useinnerref)
- [Lifecycles](#lifecycles)
    - [useInitial](#useinitial)
    - [useRun](#userun)
    - [useEfct](#useEfct)
    - [useLayoutEfct](#uselayoutefct)
    - [useIf](#useif)
    - [useLayoutIf](#uselayoutif)
    - [useMount](#usemount)
    - [useUnmount](#useunmount)
    - [useRender](#userender)
- [Dom](#dom)
    - [useClassName](#useclassname)
    - [useStyle](#usestyle)
    - [useHover](#usehover)
- [Timer](#timer)
    - [useTimeout](#usetimeout)
    - [useLayoutTimeout](#uselayouttimeout)
    - [useInterval](#useinterval)
    - [useLayoutInterval](#uselayoutinterval)
- [Logger](#logger)
    - [useLog](#uselog)
## **State**
### **`useSupperState`**
---
Use a state with supper powers.

This hook is like a combination of `useState`, `useMemo` and `useRef` hooks at once.

Returns a stateful value, and a function to update it + a ref to the state value.

**Definition**
```ts
<S>(factory: S | ((prev: S) => S), deps?: DependencyList): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
```
**Usage**

You can use it as you normally do with the `useState` hook.

```js
const [state, setState, stateRef] = useSupperState(/* Initial state */ 0)
const [state, setState, stateRef] = useSupperState(/* Initial state creator */ () => 0)
```
Or you can pass a factory function and a list of dependencies as you would do with the `useMemo` hook.

The state will be changed either by using `setState` or from outside when the list of dependencies changes.

**Note**: you have a access to the previous state by getting it from the parameter passed to the factory function.
```js
const [state, setState, stateRef] = useSupperState(
    /* State factory */ prevState => (prevState || 0) + props.count,
    /* Deps */ [props.count]
)
```
Also you can change the state without triggering a new rendering, by just changing the `stateRef` value.
```js
stateRef.current = newValue
```
### **`useBindState`**
---
Bind a state with an outside value.

When the outside value changes, the state will be updated with the new value.

Returns a stateful value, and a function to update it + a ref to the state value.

**Definition**
```ts
<S>(value: S): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
```
**usage**

The `outsideValue` will create the initial state, and also update the state when he will be changed.
```js
const [state, setState, stateRef] = useBindState(outsideValue)
```
## **Memo**
### **`useMemoRef`**
---
Add the `useRef` power to the `useMemo` hook.

This hook is like a combination of `useMemo` and `useRef` hooks at once.

Returns the memo value and the ref object.

**Note**: you have a access to the previous value by getting it from the parameter passed to the factory function.

**Definition**
```ts
<V>(factory: (prev: V) => V, deps?: DependencyList): [V, MutableRefObject<T>]
```
**usage**
```js
const [value, valueRef] = useMemoRef(
    /* Factory */ prevValue => (prevValue || 0) + props.count,
    /* Dependencies */ [props.count]
)
```
### **`useStableMemo`**
---
It is a section in [React docs](https://reactjs.org/docs/hooks-reference.html#usememo) that say that you can't rely on the stability of the return value of the `useMemo` hook.
> You may rely on useMemo as a performance optimization, **not as a semantic guarantee**. In the future, **React may choose to “forget” some previously memoized values** and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.

So for stability purpose we choose to use our implementation that replaces the original `useMemo`.

**Note**: This hook is just a alias for [`useMemoRef`](#usememoref) hook.

**Definition**

See [`useMemoRef`](#usememoref) definition.

**usage**

See [`useMemoRef`](#usememoref) usage.

## **Callback**
### **`useCB`**
---
This hook is just like `useCallback` hook, except that the dependencies array is not required.

Returns the callback passed by.

**Note**: If you do not pass a dependency list, to the second argument, the hook will be called only once.

**Definition**
```ts
<T extends (...args: any[]) => any>(callback: T, deps?: DependencyList): T
```
**usage**

In this example we doesn't pass a dependency list. so onClick will be the same function reference during the life of the component.
```js
const onClick = useCB(() => console.log(exampleRef.current))
```
And here is an example with a dependency list in the second parameter.
```js
const onClick = useCB(() => console.log(exampleValue), [exampleValue])
```
## **Ref**
### **`useValueRef`**
---
This hook get advantage of `useRef` hook and returns also the actual value of the reference.

Returns the current value of the reference and the object reference itself.

**Note**: You have an extra option that gives you the opportunity to pass a creator function for the initial value.

**Definition**
```ts
<V>(value?: V | (() => V)): [V, MutableRefObject<V>]
```
**usage**
```js
const [value, valueRef] = useValueRef()
```
Or you can pass to it an initial value
```js
const [value, valueRef] = useValueRef(initialValue)
```
Or if you choose you can pass to it an creator for the initial value
```js
const [value, valueRef] = useValueRef(() => initialValue)
```
### **`useBindRef`**
---
Bind a ref with an outside value.

When the outside value changes, the ref value will be updated with the new value.

Returns the ref object.

**Definition**
```ts
<V>(value: V): MutableRefObject<V>
```
**usage**

The `outsideValue` will be the initial ref value, and also update the ref value when he will be changed.
```js
const myRef = useBindRef(outsideValue)
```
### **`useInnerRef`**
---
Convert a ForwardedRef to a new regular `React` ref object.

Useful when using `forwardedRef` and you also want to use the ref as a regular ref inside the component.

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

This hook is actually like a replacement to the constructor behavior in class components.

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
This hook will be run a callback **immediately** if a dependency list changes.

The main difference between this hook to `React` lifecycles hooks is: this hook call immediately but the `useEffect` hook for example run after react finished processing the component.

Returns isFirstRun indicator.

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
Also you have a extra data returns from this hook that can be useful in some cases.
```js
const { isFirstRun, isFirstRunRef } = useRun(() => console.log(`Dependencies change`), [...someDeps])
```
### **`useEfct`**
---
This hook take advantage of `React` `useEffect` hook and turn it to be better.

**Note:** Tf the dependency list will not provided the hook will run only once.

**Note:** You can return a promise from the effect callback without getting any warning.

Returns the effect callback that passed to the hook.

**Definition**
```ts
<E extends (EffectCallback | (() => Promise<void>))>(effect: E, deps?: DependencyList): E
```
**usage**

This will work without any warning.
```js
useEfct(async () => {/* Do some async operation */}, [...someDeps])
```
This will be run only once, and NOT like `React` `useEffect` hook that in this case will on every component render.
```js
useEfct(() => {/* Do something */})
```
Also you can get the effect callback reference like so.
```js
const log = useEfct(() => console.log('effect called')) // output 'effect called' after the first render.
log() // output 'effect called'
log() // output again 'effect called'
```
### **`useLayoutEfct`**
---
This hook is just like [`useEfct`](#useefct) hook except that it take advantage of `React` `useLayoutEffect` hook.

**Definition**

See [`useEfct`](#useefct) definition.

**usage**

See [`useEfct`](#useefct) usage.
### **`useIf`**
---
Run a effect callback when the first parameter is truthy.

**Note**: This hook uses the `React` `useEffect` behind the scenes.

Returns the truthiness of the condition passed in the first parameter.

**Definition**
```ts
(condition: unknown, callback: EffectCallback): boolean
```
**usage**
```js
useIf(someValue === otherValue, () => console.log(`It is equal`))
```
And also you can hold the truthiness of the condition like so.
```js
const conditionPass = useIf(someValue === otherValue, () => console.log(`It is equal`))
```
### **`useLayoutIf`**
---
This hook is just like [`useIf`](#useif) hook except that it take advantage of `React` `useLayoutEffect` hook.

**Definition**

See [`useIf`](#useif) definition.

**usage**

See [`useIf`](#useif) usage.
### **`useMount`**
---
Get to know when the component is mounted.

Returns a boolean and object ref to the boolean.

**Definition**
```ts
(): [boolean, MutableRefObject<boolean>]
```
**usage**
```js
const [isMount, isMountRef] = useMount()
```
### **`useUnmount`**
---
Run a callback when the component is getting unmounted.

Returns the callback function that get passed.

**Definition**
```ts
<C extends Destructor>(callback: C, deps?: DependencyList): C
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

**Note**: If you do not pass a dependency list, the factory function will be called only once.

Returns string represents a combination of className list.

**Definition**
```ts
(factory: () => Array<string>, deps?: DependencyList): string
```
**usage**
```jsx
const myClassName = useClassName(
    /* Factory that returns array of classNames */ () => [
        `flex black`,
        someCondition && `some-class other-class`,
        secondCondition ? `new-class-list`: ``
    ],
    /* List of dependencies */[someCondition, secondCondition]
)
<div className={myClassName}>Hello world</div>
```
### **`useStyle`**
---
Create style and memoized it depending on dependency list.

**Note**: If you do not pass a dependency list, the factory function will be called only once.

Returns the created style object, ready for use as a property of html element.

**Definition**
```ts
(factory: () => CSSProperties, deps?: DependencyList): CSSProperties
```
**usage**
```jsx
const myStyle = useStyle(
    /* Factory that returns style object */ () => ({
        backgroundColor: someCondition && `black`,
        color: someCondition ? `white`: `black`
    }),
    /* List of dependencies */[someCondition]
)
<div style={myStyle}>Hello world</div>
```
### **`useHover`**
---
Get a sense when a element dom get hovered.

**Note**: You can disabled the hook functionality by passing `false` to the enabled option.

**Note**: If you do not pass an ref to the element by using the ref option, an ref will be created for you.

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

**Note**: This hook used `requestAnimationFrame` behind the scenes, for performance reason.

**Note**: If you do not pass a dependency list, the callback function will be called only once.

Returns a ref to the current result of `requestAnimationFrame` call.

**Definition**
```ts
(callback: () => void, ms?: number, deps?: DependencyList): MutableRefObject<number>
```
**usage**
```js
const handleRef = useTimeout(
    /* callback */ () => console.log(`DependencyList changes`),
    /* milliseconds */ 1000,
    /* DependencyList */[...someDeps]
)
```
And you can cancel the `requestAnimationFrame` like so.
```js
cancelAnimationFrame(handleRef.current)
```
### **`useLayoutTimeout`**
---
This hook is just like [`useTimeout`](#usetimeout) hook except that it take advantage of `React` `useLayoutEffect` hook.

**Definition**

See [`useTimeout`](#usetimeout) definition.

**usage**

See [`useTimeout`](#usetimeout) usage.
### **`useInterval`**
---
Restart a interval on amount of time after the dependency list changes.

**Note**: This hook used `requestAnimationFrame` behind the scenes, for performance reason.

Returns a ref to the current result of `requestAnimationFrame` call.

**Definition**
```ts
(callback: () => void, ms?: number, deps?: DependencyList): MutableRefObject<number>
```
**usage**
```js
const handleRef = useInterval(
    /* callback */ () => console.log(`DependencyList changes`),
    /* milliseconds */ 1000,
    /* DependencyList */[...someDeps]
)
```
And you can cancel the `requestAnimationFrame` like so.
```js
cancelAnimationFrame(handleRef.current)
```
### **`useLayoutInterval`**
---
This hook is just like [`useInterval`](#useinterval) hook except that it take advantage of `React` `useLayoutEffect` hook.

**Definition**

See [`useInterval`](#useinterval) definition.

**usage**

See [`useInterval`](#useinterval) usage.
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