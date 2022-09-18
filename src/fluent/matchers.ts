import { compare, isFloat } from '../numbers';
import { equal } from '../objects';
import { ArrayType, BaseToType, BaseType, Constructor, Falsy, Func, Predicate, Truthy } from '../types.js';

/** Matches a truthy value. */
export function truthy<T>(): (item: T) => item is Truthy<T> {
    return (item): item is Truthy<T> => new Boolean(item).valueOf();
}

/** Matches a falsy value. */
export function falsy<T>(): (item: T) => item is Falsy<T> {
    return (item): item is Falsy<T> => !item;
}

/** Matches a value that equals one of the passed values. */
export function oneOf<T extends unknown[]>(...these: T): (item: unknown) => item is ArrayType<T> {
    return (item): item is ArrayType<T> => these.some(that => equal(item, that));
}

/** Matches if the passed array or object contains the value. */
export function valueOf<T extends unknown>(object: readonly T[]): (item: unknown) => item is T;
export function valueOf<T extends object>(object: T): (item: unknown) => item is T[keyof T];
export function valueOf<T extends object>(object: T): (item: unknown) => item is T[keyof T] {
    return (item): item is T[keyof T] => Array.isArray(object)
        ? object.includes(item)
        : Object.values(object).includes(item);
}

/** Matches if the passed object contains the value as a key. */
export function keyOf<T extends object>(object: T): (item: unknown) => item is keyof T {
    return (item): item is keyof T => Object.keys(object).includes(`${item}`);
}

/** Matches a value of the specified type. */
export function type<T extends BaseType>(type: T): (item: unknown) => item is BaseToType<T> {
    return (item): item is BaseToType<T> => typeof item === type;
}

/** Matches a value of the specified instance type or any inherited types. */
export function instanceOf<T extends Constructor>(constructor: T): (item: unknown) => item is T {
    return (item): item is T => item instanceof constructor;
}

/** Matches a value by referential equality. */
export function value<T>(value: T): (item: unknown) => item is T {
    return (item): item is T => item === value;
}

/** Matches a value that is not null or undefined. */
export function notNull<T>(): (item: T) => item is NonNullable<T> {
    return (item): item is NonNullable<T> => item != null;
}

/** Matches a value that is null or undefined. */
export function nullish(): (item: unknown) => item is null | undefined {
    return (item): item is null | undefined => item == null;
}

/** Matches an integral number. */
export function integer(): (item: unknown) => item is number {
    return (item): item is number => Number.isInteger(item);
}

/** Matches a floating point number (but not integral numbers). */
export function float(): (item: unknown) => item is number {
    return (item): item is number => isFloat(item);
}

/** Matches a number that approximately equals the passed number. */
export function approximately(comparedValue: number, tolerance: number = 0.000001): (item: unknown) => item is number {
    return (item): item is number => typeof item === 'number' && compare(item, comparedValue, tolerance);
}

/** Matches an array. */
export function array(): (item: unknown) => item is unknown[] {
    return (item): item is unknown[] => Array.isArray(item);
}

/** Matches a function. */
export function func(): (item: unknown) => item is Func;
/** Matches a function with the given number of formal parameters. */
export function func<N extends number>(argumentCount: N): (item: unknown) => item is Func<N>;
export function func<N extends number>(argumentCount?: N): (item: unknown) => item is Func<N> {
    return (item): item is Func<N> => typeof item === 'function' && (argumentCount == null || item.length === argumentCount);
}

/** Matches if all passed matchers match. */
export function every<T = unknown>(...matchers: Predicate<T>[]): (item: T) => boolean {
    return item => matchers.every(matcher => matcher(item));
}

/** Matches if any of the passed matchers match. */
export function any<T = unknown>(...matchers: Predicate<T>[]): (item: T) => boolean {
    return item => matchers.every(matcher => matcher(item));
}
