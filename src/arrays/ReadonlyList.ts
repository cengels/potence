import { TransformTo1DArray } from './index.js';
import { Constructor } from '../types.js';
import List from './List.js';

/** A readonly variant of `List`. */
export default interface ReadonlyList<T> extends ReadonlyArray<T> {
    /**
     * Gets the item at the specified index.
     * 
     * Unlike bracket syntax (`this[index]`), this function throws an error
     * if there is no element at the given index, meaning that the return
     * value of this function can never be `undefined` (unless `undefined`
     * is part of `T`).
     */
    get(index: number): T;

    /** 
     * Returns a copy of this list.
     * 
     * Note that only the list is copied, not the elements within.
     */
    clone(): List<T>;

    /** Gets the first element in the list, or undefined if the list is empty. */
    first(): T | undefined;

    /** Gets the last element in the list, or undefined if the list is empty. */
    last(): T | undefined;

    /**
     * Returns true if the given index is in-bounds of the list, i.e. greater
     * than 0 and smaller than the list's length.
     * 
     * Note that this function does **not** check whether there is actually a
     * list element at the specified index, as in when a list is initialized
     * with empty slots (e.g. using `List`'s length constructor).
     * Unless you have a good reason to use `isInBounds()`, you probably want to use
     * `hasElementAt()` instead.
     */
    isInBounds(index: number): boolean;

    /**
     * Returns true if the given index refers to an actual element.
     */
    hasElementAt(index: number): boolean;

    /**
     * Gets the next element in the list, starting at the given index. If the index belongs to the
     * last element in the list, returns the first element. Returns undefined if the given index
     * is out of bounds or if there is only one element in the list.
     */
    next(fromIndex: number): T | undefined;

    /**
     * Gets the previous element in the list, starting at the given index. If the index belongs to the
     * first element in the list, returns the last element. Returns undefined if the given index
     * is out of bounds or if there is only one element in the array.
     */
    previous(fromIndex: number): T | undefined;

    /** Returns true if the list is empty, otherwise false. */
    isEmpty(): boolean;

    /** Returns true if the list is not empty, otherwise false. */
    isNotEmpty(): boolean;

    /** 
     * Compares the contents of this list with another list or array
     * for referential equality and returns true if both lists/arrays
     * have the same elements in the same positions.
     */
    equals(array: readonly unknown[]): boolean;

    /**
     * Checks if the list is composed of the given type and only of the given type.
     *
     * Since this is a type guard, TypeScript users can afterwards use the array
     * as if it were of the specified type without the necessity of an additional cast.
     */
    type<T>(type: Constructor<T>): this is List<T>;
    type<T>(type: Constructor<T>): this is ReadonlyList<T>;
    type(type: 'bigint'): this is List<T>;
    type(type: 'bigint'): this is ReadonlyList<bigint>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    type(type: 'function'): this is List<Function>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    type(type: 'function'): this is ReadonlyList<Function>;
    type(type: 'object'): this is Array<Record<string, unknown> | null>;
    type(type: 'object'): this is ReadonlyList<Record<string, unknown> | null>;
    type(type: 'symbol'): this is List<symbol>;
    type(type: 'symbol'): this is ReadonlyList<symbol>;
    type(type: 'undefined'): this is List<undefined>;
    type(type: 'undefined'): this is ReadonlyList<undefined>;
    type(type: 'boolean'): this is List<boolean>;
    type(type: 'boolean'): this is ReadonlyList<boolean>;
    type(type: 'number'): this is List<number>;
    type(type: 'number'): this is ReadonlyList<number>;
    type(type: 'string'): this is List<string>;
    type(type: 'string'): this is ReadonlyList<string>;

    /**
     * Out of all the items in the array, returns the item whose callback function returns the number
     * closest to the given target number.
     *
     * If the array is empty, returns the target number.
     */
    closest(callback: (item: T) => number, target: number): T;

    /**
     * Zips the selected arrays with this list, creating a new nested
     * array where the number of elements per level is equal
     * to the number of passed arrays.
     */
    zip<Args extends Array<ReadonlyArray<unknown>>>(...arrays: Args): Array<[T, ...TransformTo1DArray<Args>]>;

    /**
     * Loops through multiple arrays at once, calling the specified callback
     * function with the corresponding element at that index for each array.
     * 
     * Note that all arrays must have the same size or the function fill throw.
     */
    correlate<B, C, D, E, F, G, H, I, J>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], source9: readonly I[], source10: readonly J[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => void): void;
    correlate<B, C, D, E, F, G, H, I>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], source9: readonly I[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => void): void;
    correlate<B, C, D, E, F, G, H>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], source8: readonly H[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => void): void;
    correlate<B, C, D, E, F, G>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], source7: readonly G[], callback: (a: T, b: B, c: C, d: D, e: E, f: F, g: G) => void): void;
    correlate<B, C, D, E, F>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], source6: readonly F[], callback: (a: T, b: B, c: C, d: D, e: E, f: F) => void): void;
    correlate<B, C, D, E>(source2: readonly B[], source3: readonly C[], source4: readonly D[], source5: readonly E[], callback: (a: T, b: B, c: C, d: D, e: E) => void): void;
    correlate<B, C, D>(source2: readonly B[], source3: readonly C[], source4: readonly D[], callback: (a: T, b: B, c: C, d: D) => void): void;
    correlate<B, C>(source2: readonly B[], source3: readonly C[], callback: (a: T, b: B, c: C) => void): void;
    correlate<B>(source2: readonly B[], callback: (a: T, b: B) => void): void;

    /**
     * Groups the values in the array by the return value of the property callback.
     *
     * If the return value of the `property` callback implements `Equatable`, this
     * function will call `equals()` to group the objects.
     */
    groupBy(property: (item: T) => unknown): T[][];

    /**
     * Returns a new list with all duplicate elements removed.
     *
     * Note that this function only compares values for value types,
     * otherwise it compares references.
     *
     * Prefer using
     * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
     * instead of this function to avoid unnecessary memory allocation.
     */
    distinct(): List<T>;

    /**
     * Returns true if the list contains duplicate values.
     *
     * Note that this function only compares values for value types,
     * otherwise it compares references.
     */
    hasDuplicates(): boolean;

    /**
     * Returns `true` if the list contains multiple of the specified value.
     *
     * Note that this function only compares values for value types,
     * otherwise it compares references.
     */
    hasMultiple(value: T): boolean;

    /**
     * Returns the indices for all objects that match the predicate in the array.
     * This function is parallel to `Array.prototype.findIndex()`, but whereas `findIndex()`
     * only returns the first matching index, this function returns all of them.
     */
    findIndices(predicate: (object: T) => boolean): number[];
    /**
     * Returns all indices for the matching object in the array.
     * This function is parallel to `Array.prototype.indexOf()`, but whereas `indexOf()`
     * only returns the first matching index, this function returns all of them.
     */
    findIndices(object: T): number[];

    /** 
     * Creates a new array with the elements from all the given arrays.
     * This function differs from `Array.prototype.concat()` in how it handles
     * duplicates: `concat()` will simply concatenate two arrays regardless of
     * duplication. This function will only add an element if it was not already
     * added by one of the other arrays.
     */
    union(...arrays: readonly T[][]): T[];
    
    /** 
     * Creates a new array with only the elements common to all the given arrays.
     */
    intersection(...arrays: readonly T[][]): T[];

    /** 
     * Creates a new array with only the elements that are unique to one of the
     * given arrays. In other words: the resulting array will contain all elements
     * except those shared by multiple of the given arrays.
     */
    difference(...arrays: readonly T[][]): T[];
}
