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
