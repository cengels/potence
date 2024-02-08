import type { is } from '../fluent';
import type { ObjectLiteral, Predicate } from '../types.js';
import { isObject, isObjectLiteral } from './typechecking.js';

/**
 * An object structure that can be used in `Objects.structure()`.
 * The object must be keyed by the properties that should exist on the target.
 * Each property value must be either a predicate function that accepts a single
 * argument and returns a `boolean` or another {@link Structure}.
 * 
 * ```ts
 * enum MyEnum { A, B, C }
 * 
 * Objects.structure(obj, {
 *     a: (value) => typeof value === 'string',
 *     b: (value) => value === 1 || value === 2 || value === 3,
 *     c: (value) => Object.values(MyEnum).includes(value),
 *     d: (value) => value instanceof Date
 * })
 * ```
 * 
 * The {@link is} function and its corresponding matchers from the `fluent`
 * module can help eliminate the boilerplate code:
 * 
 * ```ts
 * Objects.structure(obj, {
 *     a: type('string'),
 *     b: oneOf(1, 2, 3),
 *     c: valueOf(MyEnum),
 *     d: instance(Date)
 * })
 * ```
 * 
 * Or, if you prefer, you can use the {@link is} function directly for a
 * more expressive syntax and the ability to use multiple matchers
 * (e.g. `is().matchesSome(type('string'), truthy())`). Using the `is()`
 * function without any arguments uses a *lazy* `is` instance, which
 * returns a predicate function instead of a boolean after calling
 * one of the available matchers:
 * 
 * ```ts
 * Objects.structure(obj, {
 *     a: is().type('string'),
 *     b: is().oneOf(1, 2, 3),
 *     c: is().valueOf(MyEnum),
 *     d: is().instance(Date)
 * })
 * ```
 */
export interface Structure {
    [property: string]: Predicate<unknown> | Structure;
}

function match(expected: Structure[''], actual: unknown): boolean {
    if (typeof expected === 'function') {
        return expected(actual);
    }

    if (isObjectLiteral(expected)) {
        if (!isObject(actual)) {
            return false;
        }

        return structure(actual, expected as ObjectLiteral<Structure['']>);
    }
    
    throw new Error(`Invalid type for 'expected': must be a predicate or a nested Structure but was: ${expected}`);
}

/**
 * Checks if the passed object conforms to the given structure.
 *
 * @param exhaustive If true, the check fails if {@link object} contains more
 * properties than {@link struct} defines. Otherwise superfluous properties
 * are simply ignored.
 */
 export function structure<T extends Structure>(object: unknown, struct: T, exhaustive: boolean = false): boolean {
    if (!isObject(object)) {
        return false;
    }

    if (!isObject(struct)) {
        throw new Error('Objects.structure(): struct must be an object!');
    }

    if (exhaustive && Object.keys(object).length > Object.keys(struct).length) {
        // If object has more props than struct, always fail.
        // If struct has more props than object, fail only if that property is
        // not defined as 'undefined' in struct (see match()).
        return false;
    }

    for (const property in struct) {
        const expected = struct[property];
        const actual = object[property];

        if (!match(expected, actual)) {
            return false;
        }
    }

    return true;
}
