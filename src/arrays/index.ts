/**
 * @file Offers convenience methods on arrays.
 *
 * Note that unknown iterations use `Array.prototype.forEach()` and Co.
 * In older browsers, a simple `for` loop was significantly faster.
 * In modern browsers, that is still the case, but the difference
 * is now negligible. Even on arrays with a length of over 10,000,000,
 * the difference in performance makes up barely 30 ms.
 */

import * as Assert from '../assert/index.js';
import * as Objects from '../objects/index.js';
import { ArrayType, BaseType, Constructor, Predicate } from '../types.js';

/** 
 * Returns a copy of the specified array.
 * Note that only the array is copied, not the elements within.
 */
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
 * Returns true if the given index is in-bounds of the array, i.e. greater
 * than 0 and smaller than the array's length.
 * 
 * Note that this function does **not** check whether there is actually an
 * array element at the specified index, as in when an array is initialized
 * with empty slots (e.g. using `Array`'s length constructor).
 * Unless you have a good reason to use `isInBounds()`, you probably want to use
 * `Arrays.hasElementAt()` instead.
 */
export function isInBounds(array: readonly unknown[], index: number): boolean {
    return index >= 0 && index < array.length;
}

/**
 * Returns true if the given index refers to an actual element on the specified
 * array.
 * 
 * @example
 * const array = new Array(5);     // contains 5 empty "slots"
 * Arrays.isInBounds(array, 2);    // -> true
 * Arrays.hasElementAt(array, 2);  // -> false
 */
export function hasElementAt(array: readonly unknown[], index: number): boolean {
    return index in array;
}

/**
 * Gets the next element in the array, starting at the given index. If the index belongs to the
 * last element in the array, returns the first element. Returns undefined if the given index
 * is out of bounds or if there is only one element in the array.
 */
export function next<T>(array: readonly T[], fromIndex: number): T | undefined {
    if (!isInBounds(array, fromIndex)) {
        return undefined;
    }

    if (!isInBounds(array, fromIndex + 1) && fromIndex !== 0) {
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
    if (!isInBounds(array, fromIndex)) {
        return undefined;
    }

    if (!isInBounds(array, fromIndex - 1) && fromIndex !== array.length - 1) {
        return array[array.length - 1];
    }

    return array[fromIndex - 1];
}

/** Returns true if the given array is empty, otherwise false. */
export function isEmpty(array: readonly unknown[]): boolean {
    return array.length === 0;
}

/** Returns true if the given array is not empty, otherwise false. */
export function isNotEmpty(array: readonly unknown[]): boolean {
    return array.length > 0;
}

/** 
 * Compares the contents of two arrays for referential equality and returns true
 * if both arrays have the same elements in the same positions.
 */
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
 * 
 * If the array does not contain one of the elements, throws an error.
 */
export function remove<T extends unknown[]>(array: T, ...elements: T): T {
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
 * Removes the element at the specified index from the array
 * and returns the original array.
 * 
 * @param index The zero-based index of the element to be removed.
 *              If negative, iterates backwards from the end of the array.
 */
export function removeAt<T extends unknown[]>(array: T, index: number): T {
    if (!hasElementAt(array, index)) {
        throw new Error(`Failed to remove element: no element found at index ${index}.`);
    }

    array.splice(index, 1);

    return array;
}

/**
 * Replaces the specified element with another and returns the original array.
 *
 * If the array contains multiples of the target element, it will only replace the first occurrence.
 */
export function replace<T extends unknown[]>(array: T, element: ArrayType<T>, replacement: ArrayType<T>): T {
    const index = array.indexOf(element);

    if (index === -1) {
        throw new Error('Arrays.replace(): element not found in array!');
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

export type SortOrder = 'ascending' | 'descending';
export type SortFunction<T = unknown> = (a: T, b: T) => number;

/**
 * Sort an array by one or more sort functions. Later sort functions will only be used
 * if their predecessor does not return a conclusive result (i.e. returns zero).
 *
 * Sort functions follow the `Array.prototype.sort()` schema:
 *
 * * If it returns a number < 0, `a` comes before `b`.
 * * If it returns a number > 0, `b` comes before `a`.
 * * If it returns 0, the next sort function is used instead. If no sort functions remain,
 * the order is unchanged.
 *
 * In practice, this usually means that your sort function should be `(a, b) => a - b`
 * if you want an ascending sort (i.e. smallest element first) and `(a, b) => b - a`
 * if you want a descending sort (i.e. largest element first).
 */
export function sort<T extends unknown[]>(array: T, ...sortFns: SortFunction<ArrayType<T>>[]): T;
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
export function sort<T extends Array<string | Date | number>>(array: T, order?: SortOrder): T;
export function sort(array: unknown[], orderOrSortFn: SortOrder | SortFunction = 'ascending', ...sortFns: Array<SortFunction>): unknown[] {
    if (array.length <= 1) {
        // No sort necessary/possible.
        return array;
    }

    if (typeof orderOrSortFn === 'string') {
        const order: SortOrder = orderOrSortFn;

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

        throw new Error('Arrays.sort(): Can\'t use a default sort() on an array that is not composed of numbers, strings, or Dates. Please use Array.prototype.sort() for other data types or use Arrays.sort() with one or more sort functions.');
    }

    sortFns.push(orderOrSortFn);

    return array.sort((a, b) => {
        const results: number[] = sortFns.map(x => x(a, b));

        for (const result of results) {
            if (result !== 0) {
                return result;
            }
        }

        return 0;
    });
}

/** Clears all elements from the given array and returns the array. */
export function clear<T extends unknown[]>(array: T): T {
    array.length = 0;

    return array;
}

/** Removes all null or undefined elements from the array and returns the array. */
export function clearNull<T extends unknown[]>(array: T): T  {
    let i: number = 0;

    while (i < array.length) {
        if (array[i] == null) {
            array.splice(i, 1);
        } else {
            i++;
        }
    }

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

/**
 * Moves each array item by `by`. This method will wrap the array. As a result, there will never be a negative or unfilled index.
 */
export function moveAll<T extends unknown[]>(array: T, by: number): T {
    by = by % array.length;

    if (by === 0 || by === array.length) {
        return array;
    } else if (by > 0) {
        array.push(...array.splice(0, array.length - by));

        return array;
    } else {
        array.push(...array.splice(0, Math.abs(by)));

        return array;
    }
}

export type TransformTo1DArray<T extends unknown[]> = {
    [K in keyof T]: T[K] extends (infer U)[] ? U : T[K];
};

/**
 * Zips the selected arrays, creating a new nested array where the number of elements per level is equal to the number of passed arrays.
 * @example zip([0, 1, 2], [4, 5, 6]) => [[0, 4], [1, 5], [2, 6]]
 */
export function zip<T, Args extends Array<ReadonlyArray<unknown>>>(source: readonly T[], ...arrays: Args): Array<[T, ...TransformTo1DArray<Args>]> {
    if (arrays.some(x => x.length !== source.length)) {
        throw new Error(`Arrays are not of identical length! Expected length ${source.length}, but found ${arrays.map(x => x.length).join(', ')}.`);
    }

    return source.map((x, i) => [x, ...arrays.map(array => array[i])]) as Array<[T, ...TransformTo1DArray<Args>]>;
}

/**
 * Loops through multiple arrays at once, calling the specified callback
 * function with the corresponding element at that index for each array.
 * 
 * Note that all arrays must have the same size or the function fill throw.
 */
export function correlate<A, B, C, D, E, F, G, H, I, J>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], source9: readonly I[], source10: readonly J[], callback: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => void): void;
export function correlate<A, B, C, D, E, F, G, H, I>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], source9: readonly I[], callback: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => void): void;
export function correlate<A, B, C, D, E, F, G, H>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], callback: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => void): void;
export function correlate<A, B, C, D, E, F, G>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], callback: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => void): void;
export function correlate<A, B, C, D, E, F>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], callback: (a: A, b: B, c: C, d: D, e: E, f: F) => void): void;
export function correlate<A, B, C, D, E>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], callback: (a: A, b: B, c: C, d: D, e: E) => void): void;
export function correlate<A, B, C, D>(source1: readonly A[], source2: readonly B[], source3: readonly C[], source4: readonly D[], callback: (a: A, b: B, c: C, d: D) => void): void;
export function correlate<A, B, C>(source1: readonly A[], source2: readonly B[], source3: readonly C[], callback: (a: A, b: B, c: C) => void): void;
export function correlate<A, B>(source1: readonly A[], source2: readonly B[], callback: (a: A, b: B) => void): void;
export function correlate(...args: unknown[]): void {
    const callback = last(args);
    const arrays = args.slice(0, -1) as unknown[][];
    Assert.that(typeof callback === 'function', 'Last argument must be a callback function.');
    Assert.that(arrays.length > 1, 'Must specify at least two arrays.');
    Assert.every(arrays, array => Array.isArray(array) && array.length === arrays[0].length, 'All arguments except the last one must be arrays of the same length.');

    for (let i: number = 0; i < arrays[0].length; i++) {
        const callbackArguments = arrays.map(array => array[i]);
        callback(...callbackArguments);
    }
}

/**
 * Groups the values in the array by the return value of the property callback.
 *
 * If the return value of the `property` callback implements `Equatable`, this
 * function will call `equals()` to group the objects.
 */
export function groupBy<T>(array: readonly T[], property: (item: T) => unknown): T[][] {
    return array.reduce<T[][]>((acc, item) => {
        const result = property(item);
        const found = acc.find(childArray => Objects.equal(result, property(childArray[0])));

        if (found != null) {
            found.push(item);
        } else {
            acc.push([item]);
        }

        return acc;
    }, []);
}

/**
 * Returns a new array with all duplicate elements removed.
 *
 * Note that this function only compares values for value types,
 * otherwise it compares references.
 *
 * Prefer using
 * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * instead of this function to avoid unnecessary memory allocation.
 */
export function distinct<T>(array: readonly T[]): T[] {
    return Array.from(new Set(array));
}

/**
 * Returns `true` if the array contains duplicate values.
 *
 * Note that this function only compares values for value types,
 * otherwise it compares references.
 */
export function hasDuplicates(array: readonly unknown[]): boolean {
    return new Set(array).size !== array.length;
}

/** 
 * Generates an array of numbers between the specified boundaries.
 * Note that both boundaries are inclusive, meaning they will be included
 * in the range as well.
 * 
 * Note that if the step size or the boundaries are floating point numbers,
 * the array will be filled until the next number would be greater than `to`,
 * regardless of whether or not `to` itself is included in the array.
 * 
 * @param step The step between each number in the generated range. `1` by default.
 */
export function range(from: number, to: number, step: number = 1): number[] {
    Assert.notEquals(step, 0, 'step');

    const inverted = to < from;
    const normalizedStep = Math.abs(step);
    let length = Math.abs(to - from) / normalizedStep;
    length = Math.trunc(length) === length ? length + 1 : Math.ceil(length);
    const array: number[] = new Array(length);

    for (let i: number = 0; i < length; i++) {
        array[i] = from + (inverted ? -i : i) * normalizedStep;
    }

    return array;
}

/**
 * Returns the indices for all objects that match the predicate in the array.
 * This function is parallel to `Array.prototype.findIndex()`, but whereas `findIndex()`
 * only returns the first matching index, this function returns all of them.
 */
export function findIndices<T>(array: T[], predicate: (object: T) => boolean): number[];
/**
 * Returns all indices for the matching object in the array.
 * This function is parallel to `Array.prototype.indexOf()`, but whereas `indexOf()`
 * only returns the first matching index, this function returns all of them.
 */
export function findIndices<T>(array: T[], object: T): number[];
export function findIndices<T>(array: T[], objectOrPredicate: T | Predicate<T>): number[] {
    const predicate: Predicate<T> = typeof objectOrPredicate === 'function' && objectOrPredicate.length === 1
        ? objectOrPredicate as Predicate<T>
        : (object: T) => object === objectOrPredicate;

    return array.reduce<number[]>((acc, value, index) => {
        if (predicate(value)) {
            return acc.concat(index);
        }

        return acc;
    }, []);
}
