export const isFunction = (value): value is (...args: any[]) => any => value && (Object.prototype.toString.call(value) === `[object Function]` || `function` === typeof value || value instanceof Function)
