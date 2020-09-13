import { BaseType, BaseToType, Constructor, ObjectLiteral, isEquatable } from '../types.js';

export interface Structure {
    [property: string]: Structure | Constructor | Exclude<BaseType, 'object' | 'undefined'> | 'array';
}

export type MappedStructure<T extends Structure> = {
    [P in keyof T]: T[P] extends Structure ? MappedStructure<T[P]>
        : T[P] extends Constructor<infer C> ? C
        // This error is unavoidable since type guards
        // do not work on array values.
        // @ts-expect-error
        : BaseToType<T[P]>;
}

/** Checks if a value is an object, excluding `null` but including arrays and functions. */
export function isObject(object: unknown): object is Record<string | number | symbol, unknown> {
    return object != null && (typeof object === 'object' || typeof object === 'function');
}

/** Checks if a value is an object literal, i.e. an object whose direct prototype is `Object.prototype`. */
export function isObjectLiteral(object: unknown): object is Record<string | number | symbol, unknown> {
    return object != null && typeof object === 'object' && Object.getPrototypeOf(object) === Object.prototype;
}

type ComparisonMode = 'shallow' | 'deep';

/**
 * Does a shallow or deep compare of the two objects and returns a value indicating whether the two objects are equal.
 *
 * This is really only meant for literals, but you can technically pass any value here. It'll automatically fall back
 * to a standard `===` comparison if either of the values are not true objects.
 *
 * @param comparisonMode What kind of a comparison to apply. Possible values are 'shallow' (only compares the first level
 * of keys and values; compares nested objects by reference only) and 'deep' (recursively compares all levels of keys and
 * values, meaning it properly compares nested objects as well). Default is 'shallow'.
 */
export function compare(object1: unknown, object2: unknown, comparisonMode: ComparisonMode = 'shallow'): boolean {
    if (object1 == null || object2 == null || !isObject(object1) || !isObject(object2)) {
        return object1 === object2;
    }

    // We store a list of the keys we found in object1
    // so that we can then check to make sure that object2
    // does not contain any additional keys that object1
    // doesn't have. This should not perform any worse
    // than the alternative Object.keys(object1).length === keys.length check.

    const keys: string[] = [];
    for (const key in object1) {
        if (typeof object1[key] === 'object' && typeof object2[key] === 'object' && comparisonMode === 'deep') {
            if (!compare(object1[key], object2[key], comparisonMode)) {
                return false;
            }
        } else if (object1[key] !== object2[key]) {
            return false;
        }

        keys.push(key);
    }

    for (const key in object2) {
        if (!keys.includes(key)) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if the passed object literal conforms to the given structure.
 */
export function structure<T extends Structure>(object: ObjectLiteral, struct: T): object is MappedStructure<T> {
    if (!isObjectLiteral(object) || !isObjectLiteral(struct)) {
        throw new Error('Objects.structure(): must pass an object!');
    }

    for (const property in object) {
        const objectValue = object[property];
        const expectedType = struct[property];

        if (expectedType == null) {
            return false;
        } else if (typeof expectedType === 'string') {
            if (expectedType === 'array') {
                if (!Array.isArray(objectValue)) {
                    return false;
                }
            } else if (typeof objectValue !== expectedType) {
                return false;
            }
        } else if (isObjectLiteral(objectValue)) {
            if (!structure(objectValue, expectedType as Structure)) {
                return false;
            }
        } else if (expectedType.prototype != null) {
            if (!(objectValue instanceof (expectedType as Constructor))) {
                return false;
            }
        }  else {
            return false;
        }
    }

    return true;
}

/**
 * Swaps the values `source[from]` and `source[to]` and returns the original object.
 * Note that this will invoke setters.
 */
export function swap<T extends ObjectLiteral>(source: T, from: keyof T, to: keyof T): T {
    const temp = source[from];
    source[from] = source[to];
    source[to] = temp;

    return source;
}

/**
 * Compares any object (including primitives) with one or multiple others and returns true if all are equal.
 *
 * This function will use `Equatable` to check for equality if the source object implements it. Otherwise
 * this function will compare objects by comparing each key value individually (shallow comparison), value types
 * by value, and reference types by reference.
 */
export function equals(source: unknown, ...others: unknown[]): boolean {
    if (isEquatable(source)) {
        return others.every(other => source.equals(other));
    }

    return others.every(other => compare(source, other));
}

/**
 * Injects a default `equals()` function into the specified object that iterates through all
 * its keys and compares it with the target object.
 *
 * Do not use this function with prototyped objects. This function does not compare inherited
 * properties or functions.
 *
 * The object must be extensible for this function to succeed. If it is not, this function will
 * throw an error.
 *
 * @returns The original object cast with `Equatable` implemented.
 */
export function equatable<T extends Record<string | number | symbol, unknown>>(source: T): Equatable & T {
    if (source['equals'] != null) {
        return source as Equatable & T;
    }

    if (!Object.isExtensible(source)) {
        throw new Error('Cannot inject equals() into object: object is not extensible!');
    }

    Object.defineProperty(source, 'equals', {
        enumerable: false,
        writable: false,
        value: function(target: unknown): boolean {
            // We have to cast to any here because TypeScript still doesn't allow
            // indexing with symbols (even though object keys can be symbols).
            return isObject(target) && Reflect.ownKeys(source).every(key => {
                const sourceValue = source[key as string];

                if (typeof sourceValue === 'function') {
                    // There are some cases (like the strategy pattern) where it makes
                    // sense to compare functions, but in this very simple Equatable
                    // mix-in, it is more likely that comparing functions is not intended.
                    return true;
                }

                return sourceValue === target[key as string];
            });
        }
    });

    return source as Equatable & T;
}

/** Checks if an object has a property with the specified name and optionally the specified `typeof` type. */
export function hasProperty(source: unknown, propertyName: string, type?: BaseType | Constructor): boolean {
    return source != null
        && isObject(source)
        && propertyName in source
        && (type == null || (typeof type === 'string' ? typeof source[propertyName] === type : source[propertyName] instanceof type));
}

/**
 * Checks if an object has a function with the specified name and optionally the specified number of arguments.
 */
export function hasFunction(source: unknown, functionName: string, argumentCount?: number): boolean {
    // tslint:disable-next-line: no-unsafe-any
    return source != null
        && isObject(source)
        && typeof source[functionName] === 'function'
        && (argumentCount == null
            // eslint-disable-next-line @typescript-eslint/ban-types
            || (source[functionName] as Function).length === argumentCount);
}
