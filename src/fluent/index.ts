import { FluentIs, fluentIs, set as setIs } from './is.js';

/** 
 * Returns a fluent checker for the given object,
 * allowing you to check if the object fulfills one
 * or multiple conditions.
 * 
 * Note that the returned object is a **singleton**,
 * not a new instance. This ensures that calling this function
 * avoids the cost of constructing new objects or of garbage collection,
 * but it means that you cannot store the object returned by this function
 * in a local variable.
 */
export function is<T>(...objects: T[]): FluentIs<T> {
    setIs(objects);

    return fluentIs as FluentIs<T>;
}

/**
 * Maps one or multiple objects to a result.
 * 
 * This function is useful to compress multiple lines into one, especially
 * for results based on multiple or repeated values, e.g.:
 * 
 * @example
 * // get penultimate element of array
 * // would otherwise require you to store myArray
 * // in a local variable
 * map(getMyArray(), array => array[array.length - 2]);
 */
export function map<T extends unknown[], U>(...args: [...objects: T, callback: (...objects: T) => U]): U {
    const callback = args[args.length - 1] as (...objects: T) => U;

    return callback(...args.slice(0, -1) as T);
}
