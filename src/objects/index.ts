import { Constructor, Equatable } from '../types.js';
import { hasFunction, hasProperty, isEquatable, isObject, isObjectLiteral, isPrimitive } from './typechecking.js';

type RecursionMode = 'shallow' | 'deep';

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
export function compare(object1: unknown, object2: unknown, comparisonMode: RecursionMode = 'shallow'): boolean {
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

type MappedType<T, U> = {
    [key in keyof T]: U;
};

/** 
 * Creates a new object literal that maps each property of the original object
 * with a transform function.
 */
export function map<T extends object, U>(object: T, callback: (value: T[typeof key], key: keyof T) => U): MappedType<T, U> {
    const target: MappedType<T, U> = {} as MappedType<T, U>;

    for (const key in object) {
        target[key] = callback(object[key], key);
    }

    return target;
}

/** 
 * Creates a new object literal with only the properties that match the given
 * predicate.
 */
export function filter<T extends object>(object: T, predicate: (value: T[typeof key], key: keyof T) => boolean): Partial<T> {
    const target: Partial<T> = {};

    for (const key in object) {
        const value = object[key];

        if (predicate(value, key)) {
            target[key] = value;
        }
    }

    return target;
}

/** 
 * Creates a new object literal with the given keys removed.
 * This is analogous to TypeScript's `Omit<T>` type.
 */
export function omit<T extends object, Keys extends keyof T>(object: T, ...which: Keys[]): Omit<T, Keys> {
    return filter(object, (_, key) => !which.includes(key as Keys)) as Omit<T, Keys>;
}

/** 
 * Creates a new object literal with only the given keys from the source object.
 * This is analogous to TypeScript's `Pick<T>` type.
 */
export function pick<T extends object, Keys extends keyof T>(object: T, ...which: Keys[]): Pick<T, Keys> {
    return filter(object, (_, key) => which.includes(key as Keys)) as Pick<T, Keys>;
}

/** 
 * Gets the property's property descriptor if it exists on the object
 * or somewhere along its prototype chain, else `undefined`.
 * 
 * Contrast
 * [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor),
 * which only searches the object itself without considering its prototype.
 */
export function getPropertyDescriptor(object: unknown, property: string | number | symbol): PropertyDescriptor | undefined {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(object, property);

    if (propertyDescriptor != null) {
        return propertyDescriptor;
    }

    const prototype = Object.getPrototypeOf(object);

    if (prototype != null) {
        return getPropertyDescriptor(prototype, property);
    }

    return undefined;
}

/** 
 * Returns true if the property exists on the target object and
 * can be written to (i.e. is not read-only).
 */
export function isWritable<Key extends string | number | symbol>(object: unknown, property: Key): object is { [key in Key]: unknown; } {
    const propertyDescriptor = getPropertyDescriptor(object, property);

    return propertyDescriptor != null && (propertyDescriptor.writable === true || propertyDescriptor.set != null);
}

/** 
 * Gets the constructor of `object` if `object` is a class instance,
 * otherwise returns `undefined`.
 * 
 * Note that primitives, object literals, and basic arrays will all
 * return `undefined`.
 */
export function getConstructor<T>(object: T): Constructor<T> | undefined {
    if (isObject(object)) {
        const constructor = (object as unknown as { constructor: Constructor<T> }).constructor;

        if (constructor !== (Array as Constructor) && constructor !== (Object as Constructor)) {
            return constructor;
        }
    }

    return undefined;
}

/**
 * Clones the passed object. This algorithm will attempt, in order:
 *
 * 1. If `object` is a primitive or `null`, returns `object`.
 * 2. If `object` has a `clone()` function, calls it and returns the result.
 * 3. If `object` is an array, clones the array. If `mode` is "deep", calls
 *    `clone()` on each array item.
 * 4. Creates a new object literal and assigns all properties of `object`
 *    to it before returning it. If `mode` is "deep", calls `clone()` on
 *    each property value first.
 * 
 * Note that this function can throw an error, for instance if `object`
 * or one of its properties is an instance of a class constructor.
 * In that case you probably want to implement a `clone()` function
 * on the type.
 */
export function clone<T>(object: T, mode: RecursionMode = 'shallow'): T {
    if (object == null || isPrimitive(object)) {
        return object;
    }

    if (hasFunction(object, 'clone')) {
        return object.clone() as T;
    }

    if (Array.isArray(object)) {
        if (mode === 'shallow') {
            return object.slice() as unknown as T;
        }

        return (object as Array<unknown>).map(item => clone(item, mode)) as unknown as T;
    }

    if (!isObjectLiteral(object)) {
        const constructor = getConstructor(object);
    
        if (constructor != null) {
            throw new Error(`Failed to clone(): found a constructed type (${constructor.name}). Implement a clone() function to describe how to clone this type.`);
        }
    }

    const newObject: Partial<T> = {};

    // tslint:disable-next-line: forin
    for (const key in object) {
        // We don't want to catch errors during the clone,
        // only during the write afterwards.

        const clonedValue = mode === 'shallow' ? object[key] : clone(object[key], mode);

        newObject[key] = clonedValue;
    }

    return newObject as T;
}

export * from './stringify.js';
export * from './typechecking.js';
export * from './structure.js';
