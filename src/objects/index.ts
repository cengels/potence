import { BaseType, BaseToType, Constructor, ObjectLiteral } from '../types';

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
    if (object1 == null || object2 == null) {
        return object1 == null && object2 == null;
    }

    if (!isObject(object1) || !isObject(object2)) {
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
        } else if (expectedType.prototype != null) {
            if (!(objectValue instanceof (expectedType as Constructor))) {
                return false;
            }
        } else if (isObjectLiteral(objectValue)) {
            if (!structure(objectValue, expectedType as Structure)) {
                return false;
            }
        } else {
            return false;
        }
    }

    return true;
}
