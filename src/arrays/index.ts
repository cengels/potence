/**
 * @file Offers convenience methods on arrays.
 *
 * Note that unknown iterations use `Array.prototype.forEach()` and Co.
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

/** Gets the first element in the array, or undefined if the array is empty. */
export function first<T>(array: readonly T[]): T | undefined {
    return array[0];
}

/** Gets the last element in the array, or undefined if the array is empty. */
export function last<T>(array: readonly T[]): T | undefined {
    return array[array.length - 1];
}

/**
 * Returns true if the given index is in-bounds of the array, i.e. if it corresponds to an
 * actual array element, or false otherwise.
 */
export function inBounds<T>(array: readonly T[], index: number): boolean {
    return index >= 0 && index < array.length;
}

/**
 * Gets the next element in the array, starting at the given index. If the index belongs to the
 * last element in the array, returns the first element. Returns undefined if the given index
 * is out of bounds or if there is only one element in the array.
 */
export function next<T>(array: readonly T[], fromIndex: number): T | undefined {
    if (!inBounds(array, fromIndex)) {
        return undefined;
    }

    if (!inBounds(array, fromIndex + 1) && fromIndex !== 0) {
        return array[0];
    }

    return array[fromIndex + 1];
}

/**
 * Gets the previous element in the array, starting at the given index. If the index belongs to the
 * first element in the array, returns the last element. Returns undefined if the given index
 * is out of bounds or if there is only one element in the array.
 */
export function previous<T>(array: readonly T[], fromIndex: number): T | undefined {
    if (!inBounds(array, fromIndex)) {
        return undefined;
    }

    if (!inBounds(array, fromIndex - 1) && fromIndex !== array.length - 1) {
        return array[array.length - 1];
    }

    return array[fromIndex - 1];
}

/** Returns true if the given array is empty, else false. */
export function empty(array: readonly unknown[]): boolean {
    return array.length === 0;
}

/** Returns true if the given array is not empty, else false. */
export function notEmpty(array: readonly unknown[]): boolean {
    return array.length > 0;
}

/** Compares the contents of two arrays for referential equality. */
export function equal(array1: readonly unknown[], array2: readonly unknown[]): boolean {
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

/**
 * Replaces the specified element with another and returns the original array.
 *
 * If the array contains multiples of the target element, it will only replace the first occurrence.
 */
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
export function type<T>(array: unknown[], type: Constructor<T>): array is T[];
export function type<T>(array: readonly unknown[], type: Constructor<T>): array is readonly T[];
export function type(array: unknown[], type: 'bigint'): array is bigint[];
export function type(array: readonly unknown[], type: 'bigint'): array is readonly bigint[];
// eslint-disable-next-line @typescript-eslint/ban-types
export function type(array: unknown[], type: 'function'): array is Function[];
// eslint-disable-next-line @typescript-eslint/ban-types
export function type(array: readonly unknown[], type: 'function'): array is readonly Function[];
export function type(array: unknown[], type: 'object'): array is Array<Record<string, unknown> | null>;
export function type(array: readonly unknown[], type: 'object'): array is ReadonlyArray<Record<string, unknown> | null>;
export function type(array: unknown[], type: 'symbol'): array is symbol[];
export function type(array: readonly unknown[], type: 'symbol'): array is readonly symbol[];
export function type(array: unknown[], type: 'undefined'): array is undefined[];
export function type(array: readonly unknown[], type: 'undefined'): array is readonly undefined[];
export function type(array: unknown[], type: 'boolean'): array is boolean[];
export function type(array: readonly unknown[], type: 'boolean'): array is readonly boolean[];
export function type(array: unknown[], type: 'number'): array is number[];
export function type(array: readonly unknown[], type: 'number'): array is readonly number[];
export function type(array: unknown[], type: 'string'): array is string[];
export function type(array: readonly unknown[], type: 'string'): array is readonly string[];
export function type(array: readonly unknown[], type: BaseType | Constructor): boolean {
    if (typeof type === 'string') {
        return array.every(item => typeof item === type);
    }

    return array.every(item => item instanceof type);
}

type SortOrder = 'ascending' | 'descending';

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
 * @param order The order to sort in. Possible values are 'descending' (largest first)
 * and 'ascending' (smallest first). Default is 'ascending'.
 */
export function sort(array: number[], order?: SortOrder): number[];
export function sort(array: string[], order?: SortOrder): string[];
export function sort(array: Date[], order?: SortOrder): Date[];
export function sort(array: unknown[], order: SortOrder = 'ascending'): unknown[] {
    if (array.length <= 1) {
        // No sort necessary/possible.
        return array;
    }

    if (type(array, 'number')) {
        return array.sort((a, b) => order === 'descending' ? b - a : a - b);
    }

    if (type(array, 'string')) {
        array.sort();

        if (order === 'descending') {
            array.reverse();
        }

        return array;
    }

    if (type(array, Date)) {
        return array.sort((a, b) => order === 'descending' ? b.getTime() - a.getTime() : a.getTime() - b.getTime());
    }

    throw new Error('Arrays.sort(): Can\'t use sort() on an array that is not composed of numbers, strings, or Dates. Please use Array.prototype.sort() for other data types.');
}

/** Clears all elements from the given array and returns the original array. */
export function clear<T>(array: T[]): T[] {
    array.length = 0;

    return array;
}

/** Removes all null or undefined elements from the array *in-place* and returns the original array. */
export function clearNull<T>(array: T[]): T[] {
    let i: number = 0;

    clone(array).forEach(item => {
        if (item == null) {
            array.splice(i, 1);
        } else {
            i++;
        }
    });

    return array;
}

/**
 * Out of all the numbers in the array, returns the number closest to the given target number.
 *
 * If the array is empty, returns the target number.
 */
export function closest(array: readonly number[], target: number): number;
/**
 * Out of all the items in the array, returns the item whose callback function returns the number
 * closest to the given target number.
 *
 * If the array is empty, returns the target number.
 */
export function closest<T>(array: readonly T[], callback: (item: T) => number, target: number): T;
export function closest<T>(array: readonly T[], callbackOrTarget: ((item: T) => number) | number, target?: number): number | T {
    const usesCallback = typeof callbackOrTarget === 'function';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const referenceNumber = usesCallback ? target! : callbackOrTarget as number;

    if (array.length === 0) {
        return referenceNumber;
    }

    if (usesCallback) {
        const callback = callbackOrTarget as (item: T) => number;
        return clone(array).sort((a, b) => Math.abs(referenceNumber - callback(a)) - Math.abs(referenceNumber - callback(b)))[0];
    }

    if (!type(array, 'number')) {
        throw new Error('If the array is not an array of numbers, a callback must be specified that returns a number for each item in the array.');
    }

    return clone(array).sort((a, b) => Math.abs(referenceNumber - a) - Math.abs(referenceNumber - b))[0];
}
