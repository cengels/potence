import { compare, isFloat } from '../numbers';
import { equal } from '../objects';
import { ArrayType, BaseToType, BaseType, Constructor, Falsy, Predicate, Truthy } from '../types.js';

export function truthy<T>(): (item: T) => item is Truthy<T> {
    return (item): item is Truthy<T> => new Boolean(item).valueOf();
}

export function falsy<T>(): (item: T) => item is Falsy<T> {
    return (item): item is Falsy<T> => !item;
}

export function oneOf<T extends unknown[]>(...these: T): (item: unknown) => item is ArrayType<T> {
    return (item): item is ArrayType<T> => these.some(that => equal(item, that));
}

export function valueOf<T extends unknown>(object: readonly T[]): (item: unknown) => item is T;
export function valueOf<T extends object>(object: T): (item: unknown) => item is T[keyof T];
export function valueOf<T extends object>(object: T): (item: unknown) => item is T[keyof T] {
    return (item): item is T[keyof T] => Array.isArray(object)
        ? object.includes(item)
        : Object.values(object).includes(item);
}

export function keyOf<T extends object>(object: T): (item: unknown) => item is keyof T {
    return (item): item is keyof T => Object.keys(object).includes(`${item}`);
}

export function type<T extends BaseType>(type: T): (item: unknown) => item is BaseToType<T> {
    return (item): item is BaseToType<T> => typeof item === type;
}

export function instanceOf<T extends Constructor>(constructor: T): (item: unknown) => item is T {
    return (item): item is T => item instanceof constructor;
}

export function value<T>(value: T): (item: unknown) => item is T {
    return (item): item is T => item === value;
}

export function notNull<T>(): (item: T) => item is NonNullable<T> {
    return (item): item is NonNullable<T> => item != null;
}

export function nullish(): (item: unknown) => item is null | undefined {
    return (item): item is null | undefined => item == null;
}

export function integer(): (item: unknown) => item is number {
    return (item): item is number => Number.isInteger(item);
}

export function float(): (item: unknown) => item is number {
    return (item): item is number => isFloat(item);
}

export function approximately(comparedValue: number, tolerance: number = 0.000001): (item: unknown) => item is number {
    return (item): item is number => typeof item === 'number' && compare(item, comparedValue, tolerance);
}

export function array(): (item: unknown) => item is unknown[] {
    return (item): item is unknown[] => Array.isArray(item);
}

export function all<T = unknown>(...matchers: Predicate<T>[]): (item: T) => boolean {
    return item => matchers.every(matcher => matcher(item));
}

export function any<T = unknown>(...matchers: Predicate<T>[]): (item: T) => boolean {
    return item => matchers.every(matcher => matcher(item));
}
