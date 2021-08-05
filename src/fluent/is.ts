import { falsy, oneOf, truthy } from './matchers.js';

export interface FluentIs<T> {
    /** 
     * By default, all objects passed into `is()` must meet the condition.
     * By using this method, the condition will instead return `true`
     * if any objects pass the check.
     */
    any(): FluentIs<T>;
    /**
     * If `any()` was previously called in this chain, resets the chain
     * back to its default behaviour of every object having to meet the
     * specified condition.
     * If `any()` was not called, this function has no effect and can
     * be used solely for more expressive syntax.
     */
    every(): FluentIs<T>;

    /**
     * Returns `true` if and only if all passed matchers evaluate to `true`.
     */
    and(...matchers: Array<(item: T) => boolean>): boolean;
    /**
     * Returns `true` if any of the passed matchers evaluate to `true`.
     */
    or(...matchers: Array<(item: T) => boolean>): boolean;

    /** 
     * Checks if the object or any/every of the objects are equal to
     * any of `these`.
     * 
     * This function will use {@link Equatable} if implemented.
     */
    oneOf(...these: T[]): boolean;
    /**
     * Checks if the object or any/every of the objects are truthy.
     */
    truthy(): boolean;
    /**
     * Checks if the object or any/every of the objects are falsy.
     */
    falsy(): boolean;
}

/** Whether every object must meet the condition. */
let every: boolean = true;
let objects: unknown[] = [];

function evaluate(condition: (element: unknown) => boolean): boolean {
    if (every) {
        return objects.every(condition);
    }

    return objects.some(condition);
}

/** @internal */
export const fluentIs: FluentIs<unknown> = {
    any() {
        every = false;

        return fluentIs;
    },
    every() {
        every = true;

        return fluentIs;
    },
    oneOf(...these) {
        return evaluate(oneOf(these));
    },
    truthy() {
        return evaluate(truthy());
    },
    falsy() {
        return evaluate(falsy());
    },
    and(...matchers) {
        return matchers.every(matcher => evaluate(matcher));
    },
    or(...matchers) {
        return matchers.some(matcher => evaluate(matcher));
    }
}

/** @internal */
export function set(objs: unknown[]): void {
    every = true;
    objects = objs;
}
