import type { TypeofResult, Constructor, Predicate } from '../types.js';
import { every, any, approximately, array, falsy, float, func, instanceOf, integer, keyOf, notNull, nullish, oneOf, truthy, type as isType, value as isValue, valueOf } from './matchers.js';

type ReturnType<T> = boolean | ((...objects: T[]) => boolean);

interface FluentIs<T, U extends ReturnType<T> = boolean> {
    /** 
     * By default, all objects passed into `is()` must meet the condition.
     * By using this method, the condition will instead return `true`
     * if any objects pass the check.
     */
    any(): FluentIs<T, U>;
    /**
     * If `any()` was previously called in this chain, resets the chain
     * back to its default behaviour of every object having to meet the
     * specified condition.
     * If `any()` was not called, this function has no effect and can
     * be used solely for more expressive syntax.
     */
    every(): FluentIs<T, U>;
    /** Inverts the condition of this `is()` expression. */
    get not(): FluentIs<T, U>;

    /**
     * Returns `true` if and only if all passed matchers evaluate to `true`.
     */
    matching(...matchers: Array<Predicate<T>>): U;
    /**
     * Returns `true` if any of the passed matchers evaluate to `true`.
     */
    matchingSome(...matchers: Array<Predicate<T>>): U;

    /** @see {@link oneOf} */
    oneOf(...these: T[]): U;
    /** @see {@link truthy} */
    truthy(): U;
    /** @see {@link falsy} */
    falsy(): U;
    /** @see {@link valueOf} */
    valueOf<T extends unknown>(object: readonly T[]): U;
    valueOf<T extends object>(object: T): U;
    /** @see {@link keyOf} */
    keyOf<T extends object>(object: T): U;
    /** @see {@link type} */
    type<T extends TypeofResult>(type: T): U;
    /** @see {@link instanceOf} */
    instanceOf<T extends Constructor>(constructor: T): U;
    /** @see {@link value} */
    value<T>(value: T): U;
    /** @see {@link notNull} */
    notNull(): U;
    /** @see {@link nullish} */
    nullish(): U;
    /** @see {@link integer} */
    integer(): U;
    /** @see {@link float} */
    float(): U;
    /** @see {@link approximately} */
    approximately(comparedValue: number, tolerance?: number): U;
    /** @see {@link array} */
    array(): U;
    /** @see {@link func} */
    func(argumentCount?: number): U;
}

export type EagerFluentIs<T> = FluentIs<T, boolean>;
export type LazyFluentIs<T> = FluentIs<T, (...objects: T[]) => boolean>;

/** Whether every object must meet the condition. */
let _every: boolean = true;
let not: boolean = false;
let objects: unknown[] = [];

function evaluate<T>(objects: T[], inverted: boolean, every: boolean, condition: Predicate<T>): boolean {
    const result = every
        ? objects.every(o => condition(o))
        : objects.some(o => condition(o));
        
    return inverted ? !result : result;
}

function evaluateLazy<T>(inverted: boolean, every: boolean, condition: Predicate<T>): (...objects: T[]) => boolean {
    return (...objects: T[]) => evaluate(objects, inverted, every, condition) as boolean;
}

function makeFluentIs<T, U extends ReturnType<T>>(evaluator: (matcher: Predicate<T>) => U): FluentIs<T, U> {
    return {
        any() {
            _every = false;
    
            return this;
        },
        every() {
            _every = true;
    
            return this;
        },
        get not() {
            not = true;
    
            return this;
        },
        oneOf(...these) {
            return evaluator(oneOf(...these));
        },
        truthy() {
            return evaluator(truthy());
        },
        falsy() {
            return evaluator(falsy());
        },
        matching(...matchers) {
            return evaluator(every(...matchers));
        },
        matchingSome(...matchers) {
            return evaluator(any(...matchers));
        },
        keyOf<T extends object>(object: T): U {
            return evaluator(keyOf(object));
        },
        valueOf<T extends object>(object: T): U {
            return evaluator(valueOf(object));
        },
        type<T extends TypeofResult>(type: T): U {
            return evaluator(isType(type));
        },
        instanceOf<T extends Constructor<unknown, unknown[]>>(constructor: T): U {
            return evaluator(instanceOf(constructor));
        },
        value<T>(value: T): U {
            return evaluator(isValue(value));
        },
        notNull(): U {
            return evaluator(notNull());
        },
        nullish(): U {
            return evaluator(nullish());
        },
        integer(): U {
            return evaluator(integer());
        },
        float(): U {
            return evaluator(float());
        },
        approximately(comparedValue: number, tolerance?: number): U {
            return evaluator(approximately(comparedValue, tolerance));
        },
        array(): U {
            return evaluator(array());
        },
        func(argumentCount?: number): U {
            return evaluator(func(argumentCount as number));
        }
    }
}

/** @internal */
export const fluentIs: EagerFluentIs<unknown> = makeFluentIs(matcher => evaluate(objects, not, _every, matcher));

/** @internal */
export const fluentIsLazy: LazyFluentIs<unknown> = makeFluentIs(matcher => evaluateLazy(not, _every, matcher));

/** @internal */
export function set(objs: unknown[]): void {
    _every = true;
    not = false;
    objects = objs;
}
