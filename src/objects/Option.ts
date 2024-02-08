// TODO:
/* v8 ignore start */

import { Nullable } from '../types.js';
import { stringify } from './stringify.js';

/**
 * Represents a value that may or may not have a value.
 * This class considers the following types "not a value":
 * 
 * * `undefined`
 * * `null`
 * * `NaN`
 * 
 * This type is inspired by Rust's
 * [Option](https://doc.rust-lang.org/std/option/enum.Option.html)
 * type and promotes null correctness by making it more difficult to
 * use nullable values in an unsafe manner. However, as this is an instance
 * type, this comes at some performance cost (mainly when creating/disposing
 * a large number of Options in a short amount of time). In performance-critical
 * code, it is therefore recommended to use the available static methods instead
 * of creating instances of this type.
 */
export default class Option<T> {
    protected readonly value: Nullable<T>;

    public constructor(value?: Nullable<T>) {
        this.value = value;
    }

    /** 
     * If this Option has a value, returns it,
     * otherwise throws an error.
     */
    public unwrap(error: Error | string = 'Option unwrapped null value!'): T {
        if (Option.hasValue(this.value)) {
            return this.value;
        }

        if (typeof error === 'string') {
            throw new Error(error);
        }

        throw error;
    }

    /** Returns `true` if this Option contains a value. */
    public hasValue(): boolean;
    /** 
     * Returns `true` if this Option contains a value that matches
     * the given predicate.
     */
    public hasValue(predicate: (value: T) => boolean): boolean;
    public hasValue(predicate?: (value: T) => boolean): boolean {
        if (predicate == null) {
            return Option.hasValue(this.value);
        }

        return Option.hasValue(this.value) && predicate(this.value);
    }

    /** 
     * Returns `true` if the argument contains a value. For the context of
     * `Option`, values are all types except:
     * 
     * * `undefined`
     * * `null`
     * * `NaN`
     */
    public static hasValue<T>(value: Nullable<T>): value is NonNullable<T> {
        if (typeof value === 'number') {
            return !Number.isNaN(value);
        }

        return value != null;
    }

    /** 
     * Returns `true` if is Option contains `value`. This function compares
     * by reference. Use `Option.hasValue(value => ...)` to check for structural
     * equality.
     */
    public contains(value: T): boolean {
        return this.value === value;
    }

    /**
     * If this Option has a value, returns it,
     * otherwise returns the value passed to this function.
     */
    public or<U>(other: U): T | U {
        if (Option.hasValue(this.value)) {
            return this.value;
        }

        return other;
    }

    /**
     * If this Option has a value, returns it,
     * otherwise returns the result of the callback function.
     */
    public orElse<U>(callback: () => U): T | U {
        if (Option.hasValue(this.value)) {
            return this.value;
        }

        return callback();
    }

    /**
     * Creates an `Option<U>` from this `Option<T>` by mapping a non-empty
     * value using the passed transformer function and leaving an empty value
     * as-is.
     */
    public map<U>(mapFn: (value: T) => Nullable<U>): Option<U> {
        return new Option(Option.map(this.value, mapFn));
    }

    /**
     * Converts the passed `Nullable<T>` to a `Nullable<U>` by mapping a non-null
     * value using the passed transformer function and leaving an empty value
     * as-is.
     */
    public static map<T, U>(value: Nullable<T>, mapFn: (value: T) => Nullable<U>): Nullable<U> {
        if (!Option.hasValue(value)) {
            return value as null | undefined;
        }

        return mapFn(value);
    }

    /** Runs the passed callback if and only if this Option contains a value. */
    public run(callback: (value: T) => void): void {
        Option.run(this.value, callback);
    }

    /** Runs the passed callback if and only if the passed `Nullable<T>` is not empty. */
    public static run<T>(value: Nullable<T>, callback: (value: T) => void): void {
        if (Option.hasValue(value)) {
            callback(value);
        }
    }

    public toString(): string {
        if (Option.hasValue(this.value)) {
            return `Option(${stringify(this.value)})`;
        }

        return 'Option([empty])';
    }
}
