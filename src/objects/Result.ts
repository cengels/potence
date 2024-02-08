// TODO:
/* v8 ignore start */

import { func } from '../fluent/matchers.js';
import Option from './Option.js';
import { stringify } from './stringify.js';
import { structure, Structure } from './structure.js';

/** 
 * Represents the result of an operation.
 * Possible values are `Success`, in which case the Result
 * contains a value, or `Failure`, in which case the Result
 * contains an error object or string.
 * 
 * Loosely inspired by Rust's
 * [https://doc.rust-lang.org/std/result/enum.Result.html](Result)
 * type.
 */
interface Result<T = void> {
    /** Returns `true` if the Result contains a success. */
    ok(): this is OkResult<T>;
    /** Returns `true` if the Result contains a failure. */
    nok(): this is ErrorResult<T>;
    /** 
     * Gets the contained value if this Result represents a success,
     * otherwise throws the contained error.
     */
    unwrap(): T;
    /**
     * Gets the contained value if this Result represents a success,
     * otherwise returns the passed fallback value.
     */
    or(fallback: T): T;
    /**
     * Maps this `Result<T>` to a `Result<U>` by applying a transformer
     * function on a successful value.
     * 
     * The transformer function can either return the new value directly or
     * another `Result` which contains either the new value or an error.
     */
    map<U>(mapFn: (value: T) => U | Result<U>): Result<U>;
    /** Converts this {@link Result}\<T> to an {@link Option}\<T>. */
    toOption(): Option<T>;
    /** Converts this {@link Result}\<T> to a string. */
    toString(): string;
}

const struct: Structure = {
    ok: func(),
    nok: func(),
    unwrap: func(),
    or: func(),
    map: func(),
    toOption: func(),
    toString: func()
}

namespace Result {
    /** Creates a new successful Result from a value. */
    export function ok(): OkResult;
    export function ok<T = void>(value: T): OkResult<T>;
    export function ok<T = void>(value?: T): OkResult<T> {
        return new OkResult<T>(value as T);
    }

    /** Creates a new failed Result from an error. */
    export function nok<T = void>(error: Error | string): ErrorResult<T> {
        return new ErrorResult(error);
    }

    /** 
     * Attempts to execute a callback and wraps its result in a new `Result`.
     * The `Result` will contain an error if the callback threw an error.
     * 
     * Note that, if the callback throws a non-error value, it will be coerced
     * to a string and wrapped in a new `Error`.
     */
    export function from<T>(callback: () => T): Result<T> {
        try {
            return Result.ok(callback());
        } catch (e) {
            const error = e instanceof Error ? e : new Error(stringify(e));

            return Result.nok<T>(error);
        }
    }

    /**
     * If all the given `Result`s are successes, returns a new successful
     * `Result` without a value.
     * 
     * If any of the given `Result`s are failures, returns a new failed `Result`
     * with the given error.
     */
    export function all<TError extends Error | string>(...args: [...results: Result[], error: TError]): Result<void> {
        if (args.length < 2) {
            throw new Error(`Not enough arguments supplied to Result.all(). Expected at least 2 arguments but got: ${args.length}`);
        }

        const results = args.slice(0, -1) as Result[];

        if (results.every(result => result.ok())) {
            return Result.ok();
        }

        const error = args[args.length - 1] as TError;

        return Result.nok(error);
    }

    /**
     * If any the given `Result`s are successes, returns a new successful
     * `Result` without a value.
     * 
     * If all of the given `Result`s are failures, returns a new failed `Result`
     * with the given error.
     */
    export function any<TError extends Error | string>(...args: [...results: Result[], error: TError]): Result<void> {
        if (args.length < 2) {
            throw new Error(`Not enough arguments supplied to Result.all(). Expected at least 2 arguments but got: ${args.length}`);
        }

        const results = args.slice(0, -1) as Result[];

        if (results.some(result => result.ok())) {
            return Result.ok();
        }

        const error = args[args.length - 1] as TError;

        return Result.nok(error);
    }

    /** Returns `true` if the passed value is a `Result`. */
    export function is<T>(value: unknown): value is Result<T>;
    export function is(value: unknown): value is Result;
    export function is<T>(value: unknown): value is Result<T> {
        return structure(value, struct);
    }
}

class OkResult<T = void> implements Result<T> {
    private readonly value: T;

    public constructor(value: T) {
        this.value = value
    }

    public ok(): boolean {
        return true;
    }

    public nok(): boolean {
        return false;
    }

    public unwrap(): T {
        return this.value;
    }

    public or(): T {
        return this.value;
    }

    public map<U>(mapFn: (value: T) => U | Result<U>): Result<U> {
        const result = mapFn(this.value as T);

        if (Result.is(result)) {
            return result;
        }

        return new OkResult<U>(result);
    }

    public toOption(): Option<T> {
        return new Option<T>(this.value);
    }

    public toString(): string {
        return `Success(${stringify(this.value)})`;
    }
}

class ErrorResult<T = void> implements Result<T> {
    private readonly error: Error;

    public constructor(value: Error | string) {
        this.error = value instanceof Error ? value : new Error(value);
    }

    public ok(): boolean {
        return false;
    }

    public nok(): boolean {
        return true;
    }

    public unwrap(): never {
        throw this.error;
    }

    public or(fallback: T): T {
        return fallback;
    }

    public map<U>(): Result<U> {
        return this as unknown as Result<U>;
    }

    public toOption(): Option<T> {
        return new Option<T>();
    }

    public toString(): string {
        return `Failure(${this.error.message})`;
    }
}

export default Result;
