import * as Arrays from '../arrays/index.js';
import { swap } from '../objects/index.js';
import type { TypeofResult, Constructor, Nullable, Predicate } from '../types.js';
import type { SortFunction, SortOrder, TransformTo1DArray } from './index.js';
import PotentIterator from './PotentIterator.js';
import type ReadonlyList from './ReadonlyList.js';

/** 
 * Extends the built-in Array object with additional convenience methods.
 * 
 * Note that these methods can be applied to standard arrays by using their
 * free function variants in the `Arrays` module.
 */
export default class List<T> extends Array<T> implements ReadonlyList<T> {
    public get(index: number): T {
        if (this.hasElementAt(index)) {
            return this[index];
        }

        throw new Error(`Index was out of bounds at ${index}.`);
    }

    public clone(): List<T> {
        return new List(...this);
    }

    public first(): T | undefined {
        return Arrays.first(this);
    }

    public last(): T | undefined {
        return Arrays.last(this);
    }

    public lastIndex(): number {
        return Arrays.lastIndex(this);
    }

    public isInBounds(index: number): boolean {
        return Arrays.isInBounds(this, index);
    }

    /**
     * @example
     * const list = new List(5);  // contains 5 empty "slots"
     * list.isInBounds(2);        // -> true
     * list.hasElementAt(2);      // -> false
     */
    public hasElementAt(index: number): boolean {
        return Arrays.hasElementAt(this, index);
    }

    public nextIndex(fromIndex: number): number {
        return Arrays.nextIndex(this, fromIndex);
    }

    public next(fromIndex: number): T | undefined {
        return Arrays.next(this, fromIndex);
    }

    public previousIndex(fromIndex: number): number {
        return Arrays.previousIndex(this, fromIndex);
    }

    public previous(fromIndex: number): T | undefined {
        return Arrays.previous(this, fromIndex);
    }

    public isEmpty(): boolean {
        return Arrays.isEmpty(this);
    }

    public isNotEmpty(): boolean {
        return Arrays.isNotEmpty(this);
    }

    public equals(array2: readonly unknown[]): boolean {
        return Arrays.equal(this, array2);
    }

    /**
     * Removes the specified element(s) from the list and returns the list itself.
     *
     * If the list contains multiples of the specified element(s), all of them
     * are removed.
     * 
     * If the list does not contain one of the elements, throws an error.
     */
    public remove(...elements: T[]): this {
        Arrays.remove(this, ...elements);

        return this;
    }

    /**
     * Removes the element at the specified index from the list and returns the
     * list itself.
     * 
     * @param index The zero-based index of the element to be removed.
     *              If negative, iterates backwards from the end of the list.
     */
    public removeAt(index: number): this {
        Arrays.removeAt(this, index);

        return this;
    }

    /**
     * Replaces the specified element with another and returns this list.
     *
     * If the list contains multiples of the target element,
     * it will only replace the first occurrence.
     */
    public replace(element: T, replacement: T): this {
        Arrays.replace(this, element, replacement);

        return this;
    }

    /**
     * Replaces all elements in the list with those in the iterable.
     */
    public replaceAll(replacement: Iterable<T>): this {
        Arrays.replaceAll(this, replacement);

        return this;
    }

    /**
     * Inserts an element at the given index.
     */
    public insert(index: number, ...elements: T[]): this {
        Arrays.insert(this, index, ...elements);

        return this;
    }

    public type<T>(type: Constructor<T>): this is List<T>;
    public type<T>(type: Constructor<T>): this is ReadonlyList<T>;
    public type(type: 'bigint'): this is List<T>;
    public type(type: 'bigint'): this is ReadonlyList<bigint>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public type(type: 'function'): this is List<Function>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public type(type: 'function'): this is ReadonlyList<Function>;
    public type(type: 'object'): this is Array<Record<string, unknown> | null>;
    public type(type: 'object'): this is ReadonlyList<Record<string, unknown> | null>;
    public type(type: 'symbol'): this is List<symbol>;
    public type(type: 'symbol'): this is ReadonlyList<symbol>;
    public type(type: 'undefined'): this is List<undefined>;
    public type(type: 'undefined'): this is ReadonlyList<undefined>;
    public type(type: 'boolean'): this is List<boolean>;
    public type(type: 'boolean'): this is ReadonlyList<boolean>;
    public type(type: 'number'): this is List<number>;
    public type(type: 'number'): this is ReadonlyList<number>;
    public type(type: 'string'): this is List<string>;
    public type(type: 'string'): this is ReadonlyList<string>;
    public type(type: TypeofResult | Constructor): boolean {
        // Overloaded forwarding still hasn't been implemented
        // in TypeScript, so we have to make do.
        return Arrays.type(this, type as unknown as Constructor);
    }

    /**
     * Sorts the list in the standard way according to the data type contained within.
     *
     * This function is meant to be a shorthand to avoid having to type out a sorting
     * function every time and remember which of the two arguments subtracts from which.
     *
     * | Data type    | Sorting algorithm |
     * | ------------ | ----------------- |
     * | `string`     | Alphabetical      |
     * | `number`     | Hexadecimal       |
     * | `Date`       | Chronological     |
     * | any other    | according to stringified code point value |
     *
     * @param order The order to sort in. Possible values are 'descending' (largest first)
     * and 'ascending' (smallest first). Default is 'ascending'.
     */
     public sort(order: SortOrder): this;
     public sort(): this;
    /**
     * Sorts the list by one or more sort functions. Later sort functions will only be used
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
    public sort(...sortFns: SortFunction<T>[]): this;
    public sort(orderOrSortFn: SortOrder | SortFunction<T> | undefined = 'ascending', ...sortFns: Array<SortFunction<T>>): this {
        if (typeof orderOrSortFn === 'function' && sortFns.length === 0) {
            // Without this branch we'll have infinite recursion on our hands
            // as Arrays.sort() calls Array.prototype.sort(), which will call
            // List.sort() on Lists, which would call Arrays.sort() again.
            return super.sort(orderOrSortFn);
        }

        try {
            Arrays.sort(this, orderOrSortFn as SortFunction, ...sortFns);
        } catch {
            // Original function fails if type isn't string, Date, or number.
            super.sort();
        }

        return this;
    }

    /** Clears all elements from the list and returns it. */
    public clear(): this {
        Arrays.clear(this);

        return this;
    }

    /** Removes all null or undefined elements from the list and returns it. */
    public clearNull(): this {
        Arrays.clearNull(this);

        return this;
    }

    /** Swaps the elements at the specified indices. */
    public swap(index1: number, index2: number): this {
        swap(this, index1, index2);

        return this;
    }

    public closest(callback: (item: T) => number, target: number): T {
        return Arrays.closest(this, callback, target);
    }

    /**
     * Moves each array item by `by`. This method will wrap the array.
     * As a result, there will never be a negative or unfilled index.
     */
    public moveAll(by: number): this {
        Arrays.moveAll(this, by);

        return this;
    }

    /**
     * @example new List(0, 1, 2).zip([4, 5, 6]) => [[0, 4], [1, 5], [2, 6]]
     */
    public zip<Args extends Array<ReadonlyArray<unknown>>>(...arrays: Args): List<[T, ...TransformTo1DArray<Args>]> {
        return List.from(Arrays.zip(this, ...arrays));
    }

    public filterMap<U>(mapFn: (object: T) => Nullable<U>): List<U> {
        return Arrays.filterMap(this, mapFn) as unknown as List<U>;
    }

    public correlate<B, C, D, E, F, G, H, I, J>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], source9: readonly I[], source10: readonly J[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => void): void;
    public correlate<B, C, D, E, F, G, H, I>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], source9: readonly I[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => void): void;
    public correlate<B, C, D, E, F, G, H>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => void): void;
    public correlate<B, C, D, E, F, G>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G) => void): void;
    public correlate<B, C, D, E, F>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], callback: (a: T, b: B, c: C, d: D, e: E, f: F) => void): void;
    public correlate<B, C, D, E>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], callback: (a: T, b: B, c: C, d: D, e: E) => void): void;
    public correlate<B, C, D>(source2: readonly B[], source3: readonly C[], source4: readonly D[], callback: (a: T, b: B, c: C, d: D) => void): void;
    public correlate<B, C>(source2: readonly B[], source3: readonly C[], callback: (a: T, b: B, c: C) => void): void;
    public correlate<B>(source2: readonly B[], callback: (a: T, b: B) => void): void;
    public correlate(...args: unknown[]): void {
        // @ts-expect-error  TypeScript cannot "see" the base function, so it will always throw an error.
        return Arrays.correlate(this, ...args);
    }

    public groupBy(property: (item: T) => unknown): T[][];
    public groupBy<U, Result>(property: (item: T) => U, mapGroup: (property: U, items: readonly T[]) => Result): Result[];
    public groupBy<U, Result>(property: (item: T) => U, mapGroup?: (property: U, items: readonly T[]) => Result): Result[] {
        return Arrays.groupBy(this, property, mapGroup as unknown as (property: U, items: readonly T[]) => Result);
    }

    public distinct(): List<T> {
        return List.from(new Set(this));
    }

    public hasDuplicates(): boolean {
        return Arrays.hasDuplicates(this);
    }

    public hasMultiple(value: T): boolean {
        return Arrays.hasMultiple(this, value);
    }

    public findIndices(predicate: Predicate<T>): List<number>;
    public findIndices(object: T): List<number>;
    public findIndices(objectOrPredicate: T | Predicate<T>): List<number> {
        return List.from(Arrays.findIndices(this, objectOrPredicate));
    }

    public union(...arrays: readonly T[][]): List<T> {
        return List.from(Arrays.union(this, ...arrays));
    }
    
     public intersection(...arrays: readonly T[][]): List<T> {
        return List.from(Arrays.intersection(this, ...arrays));
    }

     public difference(...arrays: readonly T[][]): List<T> {
        return List.from(Arrays.difference(this, ...arrays));
    }

    public iterator(): PotentIterator<T> {
        return new PotentIterator(this);
    }

    public toJSON(): T[] {
        return [...this];
    }

    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    public static from<T, U = T>(iterable: Iterable<T> | ArrayLike<T>, mapfn?: (v: T, k: number) => U, thisArg?: unknown): List<U> {
        return super.from(iterable, mapfn as (v: T, k: number) => U, thisArg) as unknown as List<U>;
    }

    /**
     * Returns a new array from a set of elements.
     * @param items A set of elements to include in the new array object.
     */
    public static of<T>(...items: T[]): List<T> {
        return super.of(...items) as unknown as List<T>;
    }
}
