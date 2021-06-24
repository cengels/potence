import { BaseToType, BaseType, Constructor, Equatable, Instantiable, isEquatable, isPrimitive, ObjectLiteral, Structure, StructureValue } from '../types.js';
import { stringify } from './stringify.js';
export * from './stringify.js';

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
export function isObject(value: unknown): value is ObjectLiteral {
    return value != null && (typeof value === 'object' || typeof value === 'function');
}

/**
 * Checks if a value is an object literal, i.e. an object whose direct prototype is `Object.prototype`.
 * Like `isObject()`, you can safely access the object's members via bracket syntax if this check succeeds.
 */
export function isObjectLiteral(value: unknown): value is ObjectLiteral {
    return value != null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype;
}

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

    if (typeof expected === 'function') {
        return actual instanceof expected;
    }
    
    throw new Error(`Invalid type for 'expected': must be a string, an object, an array, or a function but was: ${stringify(expected)}`);
}

/**
 * Checks if the passed object conforms to the given structure.
 *
 * @param exhaustive Whether this check should be exhaustive or not, that is
 *  whether it should fail if `object` contains more properties than `struct`.
 */
export function structure<T extends Structure>(object: unknown, struct: T, exhaustive: boolean = false): object is MappedStructure<T> {
    if (!isObject(object)) {
        return false;
    }

    if (!isObject(struct)) {
        throw new Error('Objects.structure(): must pass an object!');
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

type HasProperty<TKey extends string | number | symbol, T> = { [key in TKey]: T };
type HasPropertyReturnType<T extends BaseType | Constructor> =
      T extends BaseType ? BaseToType<T>
    : T extends Constructor<infer C> ? C
    : unknown;

/** 
 * Checks if an object has a property with the specified name.
 * Optionally checks if the property is the specified type.
 */
export function hasProperty<
    TKey extends string | number | symbol,
    T extends BaseType | Constructor
>(source: unknown, propertyName: TKey, type?: T): source is HasProperty<TKey, HasPropertyReturnType<T>> {
    if (source == null) {
        return false;
    }

    // We use the 'in' operator to distinguish between properties whose
    // value is undefined and properties that don't actually exist.
    // However, the 'in' operator can only be used on objects,
    // not primitives. But this is not a problem because primitives
    // don't have any properties whose value could be undefined.

    const object = source as ObjectLiteral;

    if (isPrimitive(source) ? object[propertyName] === undefined : !(propertyName in object)) {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (type == null || is(object[propertyName], type as any));
}

type Func = (...args: unknown[]) => unknown;

/**
 * Checks if an object has a function with the specified name and optionally the specified number of arguments.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function hasFunction<T extends string | number | symbol>(source: unknown, functionName: T, argumentCount?: number): source is HasProperty<T, Func> {
    return source != null
        && typeof (source as ObjectLiteral)[functionName] === 'function'
        && (argumentCount == null
            // eslint-disable-next-line @typescript-eslint/ban-types
            || ((source as ObjectLiteral)[functionName] as Function).length === argumentCount);
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
 * Checks if the passed object is of the specified type.
 * 
 * Depending on the type of the second argument, this function
 * will either call `typeof` or `instanceof`.
 */
export function is<T>(object: unknown, type: Constructor<T>): object is T;
export function is<TTypeOf extends BaseType>(object: unknown, type: TTypeOf): object is TTypeOf;
export function is(object: unknown, type: BaseType | Constructor): boolean {
    return typeof type === 'string' ? typeof object === type : object instanceof type;
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
 * Gets the constructor of `object` if `object` is an instantiable instance,
 * otherwise returns `undefined`.
 */
export function getConstructor<T>(object: T): Instantiable<T> | undefined {
    if (hasProperty(object, 'constructor')) {
        return (object as unknown as { constructor: Instantiable<T> }).constructor;
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

        try {
            newObject[key] = clonedValue;
        } catch {
            // We could use isWritable() here instead, but since it
            // travels all the way up the prototype chain, simply
            // suppressing any errors may be more performant.
        }
    }

    return newObject as T;
}
