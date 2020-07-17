/**
 * @file Offers convenience methods on arrays.
 *
 * Note that any iterations use `Array.prototype.forEach()` and Co.
 * In older browsers, a simple `for` loop was significantly faster.
 * In modern browsers, that is still the case, but the difference
 * is now negligible. Even on arrays with a length of over 10,000,000,
 * the difference in performance makes up barely 30 ms.
 */

import { BaseType, Constructor } from '../types';

/** Returns a copy of the specified array. */
export function clone<T>(array: readonly T[]): T[] {
    return array.slice();
}

/** Compares the contents of two arrays for referential equality. */
export function compare(array1: readonly any[], array2: readonly any[]): boolean {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i: number = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Removes the specified element(s) from the array and returns the original array.
 *
 * If the array contains multiples of the specified element(s), all of them
 * are removed.
 */
export function remove<T>(array: T[], ...elements: T[]): T[] {
    for (const element of elements) {
        let index = array.indexOf(element);

        if (index === -1) {
            throw new Error('Arrays.remove(): element not found in array!');
        }

        while (index !== -1) {
            array.splice(index, 1);
            index = array.indexOf(element);
        }
    }

    return array;
}

/** Replaces the specified element with another and returns the original array. */
export function replace<T>(array: T[], element: T, replacement: T): T[] {
    const index = array.indexOf(element);

    if (index === -1) {
        throw new Error('Arrays.remove(): element not found in array!');
    }

    array.splice(index, 1, replacement);

    return array;
}

/**
 * Checks if the array is composed of the given type and only of the given type.
 *
 * Since this is a type guard, TypeScript users can afterwards use the array
 * as if it were of the specified type without the necessity of an additional cast.
 */
export function type<T>(array: any[], type: Constructor<T>): array is T[];
export function type<T>(array: readonly any[], type: Constructor<T>): array is readonly T[];
export function type(array: any[], type: 'bigint'): array is bigint[];
export function type(array: readonly any[], type: 'bigint'): array is readonly bigint[];
export function type(array: any[], type: 'function'): array is Function[];
export function type(array: readonly any[], type: 'function'): array is readonly Function[];
export function type(array: any[], type: 'object'): array is object[];
export function type(array: readonly any[], type: 'object'): array is readonly object[];
export function type(array: any[], type: 'symbol'): array is symbol[];
export function type(array: readonly any[], type: 'symbol'): array is readonly symbol[];
export function type(array: any[], type: 'undefined'): array is undefined[];
export function type(array: readonly any[], type: 'undefined'): array is readonly undefined[];
export function type(array: any[], type: 'boolean'): array is boolean[];
export function type(array: readonly any[], type: 'boolean'): array is readonly boolean[];
export function type(array: any[], type: 'number'): array is number[];
export function type(array: readonly any[], type: 'number'): array is readonly number[];
export function type(array: any[], type: 'string'): array is string[];
export function type(array: readonly any[], type: 'string'): array is readonly string[];
export function type(array: readonly any[], type: BaseType | Constructor): boolean {
    if (typeof type === 'string') {
        return array.every(item => typeof item === type);
    }

    return array.every(item => item instanceof type);
}

/**
 * Sorts the array in the standard way according to the data type contained within.
 * Unsupported data types (like object literals or arrays) will throw an error.
 *
 * This function is meant to be a shorthand to avoid having to type out a sorting
 * function every time and remember which of the two arguments subtracts from which.
 *
 * | Data type    | Sorting algorithm |
 * | ------------ | ----------------- |
 * | `string`     | Alphabetical      |
 * | `number`     | Hexadecimal       |
 * | `Date`       | Chronological     |
 *
 * @param descending If true, the sort will be in descending order (largest first).
 * If false, the sort will be in ascending order (smallest first). Default is false.
 */
export function sort(array: number[], descending: boolean): number[];
export function sort(array: string[], descending: boolean): string[];
export function sort(array: Date[], descending: boolean): Date[];
export function sort(array: any[], descending: boolean = false): any[] {
    if (array.length <= 1) {
        // No sort necessary/possible.
        return array;
    }

    if (type(array, 'number')) {
        return array.sort((a, b) => descending ? b - a : a - b);
    }

    if (type(array, 'string')) {
        array.sort();

        if (descending) {
            array.reverse();
        }

        return array;
    }

    if (type(array, Date)) {
        return array.sort((a, b) => descending ? b.getTime() - a.getTime() : a.getTime() - b.getTime());
    }

    throw new Error('Arrays.sort(): Can\'t use sort() on an array that is not composed of numbers, strings, or Dates. Please use Array.prototype.sort() for other data types.');
}
