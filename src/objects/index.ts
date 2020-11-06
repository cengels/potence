import { BaseToType, BaseType, Constructor, Equatable, isEquatable, ObjectLiteral, Structure, StructureValue } from '../types.js';

type DistributeStructureValue<T> = T extends StructureValue ? MappedStructureValue<T> : never;

type MappedStructureValue<T extends StructureValue | readonly StructureValue[]> =
    T extends Structure ? MappedStructure<T>
    : T extends Constructor<infer C> ? C
    : T extends readonly [infer ArrayType] ? DistributeStructureValue<ArrayType>[]
    : T extends ReadonlyArray<infer OrType> ? DistributeStructureValue<OrType>
    : T extends 'null' ? null
    // This error is unavoidable because TypeScript doesn't understand
    // that T cannot be anything other than BaseType here.
    // @ts-expect-error
    : BaseToType<T>;

type MappedStructure<T extends Structure> = {
    [P in keyof T]: MappedStructureValue<T[P]>
}

/**
 * Checks if a value is an object, excluding `null` but including arrays and functions.
 * If this check succeeds, you can safely access the object's members via bracket syntax.
 */
export function isObject(object: unknown): object is ObjectLiteral {
    return object != null && (typeof object === 'object' || typeof object === 'function');
}

/**
 * Checks if a value is an object literal, i.e. an object whose direct prototype is `Object.prototype`.
 * Like `isObject()`, you can safely access the object's members via bracket syntax if this check succeeds.
 */
export function isObjectLiteral(object: unknown): object is ObjectLiteral {
    return object != null && typeof object === 'object' && Object.getPrototypeOf(object) === Object.prototype;
}

type ComparisonMode = 'shallow' | 'deep';

/**
 * Performs a shallow or deep comparison of the two objects and returns a value
 * indicating whether the two objects are equal.
 *
 * This is really only meant for literals, but you can technically pass any
 * value here. It'll automatically fall back to a standard `===` comparison if
 * either of the values are not true objects.
 *
 * @param comparisonMode What kind of comparison to apply. Possible values are
 * 'shallow' (only compares the first level of keys and values; compares nested
 * objects by reference only) and 'deep' (recursively compares all levels of
 * keys and values, meaning it properly compares nested objects as well).
 * Default is 'shallow'.
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

function match(expected: Structure[''], actual: unknown): boolean {
    if (typeof expected === 'string') {
        switch (expected) {
            case 'array': return Array.isArray(actual);
            case 'null': return actual === null;
            case 'undefined': return actual === undefined;
            default: return typeof actual === expected;
        }
    }

    if (isObjectLiteral(expected)) {
        if (!isObject(actual)) {
            return false;
        }

        return structure(actual, expected);
    }

    if (Array.isArray(expected)) {
        switch (expected.length) {
            case 0: throw new Error('Objects.structure(): must pass an array with at least one element!');
            case 1: return Array.isArray(actual) && actual.every(element => match(expected[0], element));
            default: return expected.some(orType => match(orType, actual));
        }
    }

    if (isObject(expected)) {
        return actual instanceof expected;
    }

    return false;
}

/**
 * Checks if the passed object conforms to the given structure.
 *
 * Note that this check is *exhaustive*, that is it will fail if `object`
 * contains more properties than defined by `struct`.
 */
export function structure<T extends Structure>(object: object, struct: T): object is MappedStructure<T> {
    if (!isObject(object) || !isObject(struct)) {
        throw new Error('Objects.structure(): must pass an object!');
    }

    if (Object.keys(object).length > Object.keys(struct).length) {
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

/**
 * Swaps the values `source[from]` and `source[to]` and returns the original object.
 * Note that this will invoke setters.
 */
export function swap<T extends object>(source: T, from: keyof T, to: keyof T): T {
    const temp = source[from];
    source[from] = source[to];
    source[to] = temp;

    return source;
}

/**
 * Compares any object (including primitives) with one or multiple others and returns true if all are equal.
 *
 * This function will use `Equatable` to check for equality if the source object implements it, otherwise
 * this function will use a simple referential equality check (or structural equality check in the case of value types).
 */
export function equal(source: unknown, ...others: unknown[]): boolean {
    if (isEquatable(source)) {
        return others.every(other => source.equals(other));
    }

    return others.every(other => source === other);
}

/**
 * Attempts to inject a default `equals()` function into the specified object that iterates through all
 * its keys and compares it with the target object.
 *
 * Do not use this function with prototyped objects. This function does not compare inherited
 * properties or functions.
 *
 * The object must be extensible for this function to succeed. If it is not, this function will
 * throw an error.
 *
 * This function does nothing if the target object already contains an `equals` function.
 * If the target object contains an `equals` property that is not a function, this function
 * will throw an error.
 *
 * @returns The original object cast with `Equatable` implemented.
 */
export function equatable<T extends object>(source: T): Equatable & T {
    if (isEquatable(source)) {
        return source as Equatable & T;
    }

    if (!Object.isExtensible(source)) {
        throw new Error('Cannot inject equals() into object: object is not extensible!');
    }

    if (hasProperty(source, 'equals')) {
        throw new Error('Object already contains a definition for "equals".');
    }

    Object.defineProperty(source, 'equals', {
        enumerable: false,
        writable: false,
        value: function(target: unknown): boolean {
            // We have to cast to any here because TypeScript still doesn't allow
            // indexing with symbols (even though object keys can be symbols).
            return isObject(target) && Reflect.ownKeys(source).every(key => {
                const sourceValue = source[key as keyof T];

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
