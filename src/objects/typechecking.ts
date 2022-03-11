import { ObjectLiteral, Structure, BaseType, Constructor, BaseToType, StructureValue, Equatable, primitive } from '../types';
import { stringify } from './stringify';

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

/** Checks if a given object is a primitive, i.e. if it is not a function, object, array, or instance. */
export function isPrimitive(object: unknown): object is primitive {
    return object !== null && typeof object !== 'object' && typeof object !== 'function';
}

/** Checks if an object implements `Equatable`. */
export function isEquatable(object: unknown): object is Equatable {
    return object != null && hasFunction(object, 'equals', 1);
}

/** Checks if an object implements `Iterable`. */
export function isIterable(object: unknown): object is Iterable<unknown> {
    return object != null && hasFunction(object, Symbol.iterator);
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

        return structure(actual, expected as ObjectLiteral<Structure['']>);
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
