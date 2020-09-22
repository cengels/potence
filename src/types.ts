import * as Objects from './objects/index.js';

/** Represents a type that is nullable (i.e. may be null or undefined). */
export type Nullable<T = unknown> = T | undefined | null;

/** Extracts the type from an array. */
export type ArrayType<T> = T extends (infer U)[] ? U : T;

/** Represents the result of the `typeof` keyword. */
export type BaseType = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';

/**
 * A primitive (primitive value, primitive data type) is data that is not an object and has no methods.
 * There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`, `undefined`, and `symbol`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 */
export type primitive = string | number | bigint | boolean | undefined | symbol;

/** Checks if a given object is a primitive, i.e. if it is not a function, object, array, or instance. */
export function isPrimitive(object: unknown): object is primitive {
    return object !== null && typeof object !== 'object' && typeof object !== 'function';
}

/** Converts the string typeof result into an actual type. */
export type BaseToType<T extends BaseType> =
    T extends 'bigint' ? bigint
    : T extends 'boolean' ? boolean
    // eslint-disable-next-line @typescript-eslint/ban-types
    : T extends 'function' ? Function
    : T extends 'number' ? number
    : T extends 'object' ? Record<string | number | symbol, unknown>
    : T extends 'string' ? string
    : T extends 'symbol' ? symbol
    : undefined;

/**
 * Represents a class or constructor. Note that this type includes abstract constructors
 * as well. If you'd like to call `new ...` on the constructor, consider using the `Instantiable` type instead.
 *
 * Particularly useful for parameterized instanceof checks.
 *
 * @example
 *
 * import { Constructor } from 'potence';
 *
 * function checkType<T>(object: unknown, constructor: Constructor<T>): object is T {
 *     return object instanceof constructor;
 * }
 *
 * let value: unknown = new Date();
 *
 * if (checkType(value, Date)) {
 *     value.setDate(5);   // no error
 *     // ...
 * }
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor<T = unknown> = Function & { prototype: T };

/**
 * Represents a type that can be instantiated using the `new` keyword.
 * Particularly useful for factory functions.
 *
 * @template T The type to  be instantiated.
 * @template Args A [tuple](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple) of constructor arguments.
 */
export type Instantiable<T = unknown, Args extends ReadonlyArray<unknown> = []> = { new(...args: Args): T; };

/**
 * Represents an object literal with the given value type.
 * This is a shorthand for `Record<string | number | symbol, T>`.
 *
 * If you need an object literal without an index signature,
 * use `object`. Note that this will not allow you to access
 * arbitrary keys but *will* allow you to assign it any object type
 * (whereas ObjectLiteral requires an object with an index signature).
 *
 * For this reason, it is recommended that you only use this type
 * in covariant contexts, for example as the return type of a function.
 * Prefer the `object` type for parameters, as that will allow you to pass
 * in any object, even those without an index signature.
 */
export type ObjectLiteral<T = unknown> = Record<string | number | symbol, T>;

/**
 * An interface representing an object that can be equated to another.
 *
 * The reason that Equatable does not have a generic is because it is impossible
 * to check for generics in type constraints (i.e. `isEquatable()`), which would
 * cause potential uncaught runtime exceptions when calling `equals()` with an
 * unexpected object type.
 *
 * The `equals()` method is used by various comparisons in *potence*. If a function
 * uses Equatable, it is always explicitly mentioned in the function's documentation.
 */
export interface Equatable {
    /**
     * Compares this object with another by value.
     *
     * Any object can be passed to `equals()`, so you should always
     * check if the object has the correct type before comparing it.
     */
    equals(object: unknown): boolean;
}

/** Checks if an object implements `Equatable`. */
export function isEquatable(object: unknown): object is Equatable {
    return object != null && Objects.hasFunction(object, 'equals', 1);
}
