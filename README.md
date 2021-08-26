# **Hooks for React**
A set of must use hooks necessary for daily work with react
## **Table of contents**
- [State](#state)
    - [useSupperState](#usesupperstate)
    - [useBindState](#usebindstate)
- [Lifecycles](#lifecycles)
- [Timer](#timer)
- [Dom](#dom)
## **State**
### **useSupperState**
Use a state with supper powers.

This hook is like a combination of useState, useMemo and useRef hooks at once.

**Definition**
```ts
<S>(factory: S | ((prev: S) => S), deps?: DependencyList): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
```
**Usage**

You can use it as you normally do with the useState hook.

Returns a stateful value, and a function to update it + a ref to the stateful value.

```js
const [state, setState, stateRef] = useSupperState(/* initial state */ 0)
const [state, setState, stateRef] = useSupperState(/* initial state creator */ () => 0)
```
Or you can pass a factory function and a list of dependencies as you would do with the useMemo hook.

The state will be changed either by using setState or from outside when the list of dependencies changes.

Note: you have a access to the previous state by getting it from the parameter passed to the factory function.
```js
const [state, setState, stateRef] = useSupperState(
    /* state factory */ prevState => (prevState || 0) + props.count,
    /* deps */ [props.count]
)
```
Also you can change the state without triggering a new rendering, by just changing the stateRef value.
```js
stateRef.current = newValue
```
### **useBindState**

Bind a state with an outside value.

When the outside value changes, the state will be updated with the new value.

**Definition**
```ts
<S>(value: S): [S, Dispatch<SetStateAction<S>>, MutableRefObject<S>]
```