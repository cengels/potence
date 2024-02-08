import { ObjectLiteral, TypeofResult, Constructor, Typeof, Equatable, primitive, Func } from '../types';

/** 
 * Checks if the passed object is of the specified type.
 * 
 * Depending on the type of the second argument, this function
 * will either call `typeof` or `instanceof`.
 */
export function is<T>(object: unknown, type: Constructor<T>): object is T;
export function is<TTypeOf extends TypeofResult>(object: unknown, type: TTypeOf): object is TTypeOf;
export function is(object: unknown, type: TypeofResult | Constructor): boolean {
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

type HasProperty<TKey extends string | number | symbol, T> = { [key in TKey]: T };
type HasPropertyReturnType<T extends TypeofResult | Constructor> =
      T extends TypeofResult ? Typeof<T>
    : T extends Constructor<infer C> ? C
    : unknown;

/** 
 * Checks if an object has a property with the specified name.
 * Optionally checks if the property is the specified type.
 */
export function hasProperty<
    TKey extends string | number | symbol,
    T extends TypeofResult | Constructor
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

/**
 * Checks if an object has a function with the specified name
 * and optionally the specified number of arguments.
 * 
 * Note that `argumentCount` corresponds to the function's *formal parameters*,
 * i.e. the exact number of parameters defined in the function signature,
 * excluding any rest parameters. This also includes *optional* parameters.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function hasFunction<T extends string | number | symbol>(source: unknown, functionName: T): source is HasProperty<T, Func>;
export function hasFunction<T extends string | number | symbol, N extends number>(source: unknown, functionName: T, argumentCount: N): source is HasProperty<T, Func<N>>;
export function hasFunction<T extends string | number | symbol, N extends number>(source: unknown, functionName: T, argumentCount?: N): source is HasProperty<T, Func<N>> {
    return source != null
        && typeof (source as ObjectLiteral)[functionName] === 'function'
        && (argumentCount == null
            // eslint-disable-next-line @typescript-eslint/ban-types
            || ((source as ObjectLiteral)[functionName] as Function).length === argumentCount);
}

/** 
 * Attempts to cast the object to the specified type. If the object is assignable
 * to the type, returns the object, otherwise returns `undefined`.
 */
export function cast<T>(object: unknown, type: Constructor<T>): T | undefined;
export function cast<TTypeOf extends TypeofResult>(object: unknown, type: TTypeOf): Typeof<TTypeOf> | undefined;
export function cast(object: unknown, type: TypeofResult | Constructor): unknown | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (is(object, type as any)) {
        return object;
    }

    return undefined;
}

/** 
 * Attempts to cast the object to the specified type. If the object is assignable
 * to the type, returns the object, otherwise throws an error.
 */
export function hardCast<T>(object: unknown, type: Constructor<T>): T;
export function hardCast<TTypeOf extends TypeofResult>(object: unknown, type: TTypeOf): Typeof<TTypeOf>;
export function hardCast(object: unknown, type: TypeofResult | Constructor): unknown {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (is(object, type as any)) {
        return object;
    }

    throw new Error(`Cast failed. ${object} is not assignable to type ${type}.`);
}
