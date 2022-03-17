/** 
 * Represents the result of an operation.
 * Possible values are `Success`, in which case the Result
 * contains a value, or `Failure`, in which case the Result
 * contains an error object or string.
 */
export default class Result<T = void, TError extends Error | string = Error | string> {
    private readonly value: T | TError;
    private readonly success: boolean;

    private constructor(value: TError, isSuccess: false);
    private constructor(value: T, isSuccess: true);
    private constructor(value: T | TError, isSuccess: boolean) {
        this.value = value;
        this.success = isSuccess;
    }

    /** Returns `true` if the Result contains a success. */
    public ok(): boolean {
        return this.success;
    }

    /** Returns `true` if the Result contains a failure. */
    public nok(): boolean {
        return !this.success;
    }

    /** 
     * Gets the contained value if this Result represents a success,
     * otherwise throws the contained error.
     */
    public unwrap(): T {
        if (this.success) {
            return this.value as T;
        }

        throw this.value;
    }

    /**
     * Gets the contained value if this Result represents a success,
     * otherwise returns the passed fallback value.
     */
    public or(fallback: T): T {
        if (this.success) {
            return this.value as T;
        }

        return fallback;
    }

    /**
     * Maps this `Result<T>` to a `Result<U>` by applying a transformer
     * function on a successful value.
     * 
     * The transformer function can either return the new value directly or
     * another `Result` which contains either the new value or an error.
     */
    public map<U, UError extends Error | string = TError>(mapFn: (value: T) => U | Result<U, UError>): Result<U, TError | UError> {
        if (this.success) {
            const result = mapFn(this.value as T);

            if (result instanceof Result) {
                return new Result<U, UError>(result.value as UError, result.success as false)
            }

            return new Result<U, UError>(result, true);
        }

        return new Result(this.value as TError, false);
    }

    /** Creates a new successful Result from a value. */
    public static ok<TError extends Error | string = Error | string>(): Result<void, TError>;
    public static ok<TError extends Error | string = Error | string, T = void>(value: T): Result<T, TError>;
    public static ok<TError extends Error | string = Error | string, T = void>(value?: T): Result<T, TError> {
        return new Result<T, TError>(value as unknown as T, true);
    }

    /** Creates a new failed Result from an error. */
    public static nok<T = void, TError extends Error | string = Error | string>(error: TError): Result<T, TError> {
        return new Result<T, TError>(error, false);
    }

    /**
     * If all the given `Result`s are successes, returns a new successful
     * `Result` without a value.
     * 
     * If any of the given `Result`s are failures, returns a new failed `Result`
     * with the given error.
     */
    public static all<TError extends Error | string>(...args: [...results: Result[], error: TError]): Result<void, TError> {
        if (args.length < 3) {
            throw new Error(`Not enough arguments supplied to Result.all(). Expected at least 3 arguments but got: ${args.length}`);
        }

        const results = args.slice(0, -1) as Result[];

        if (results.every(result => result.ok())) {
            return Result.ok<TError>();
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
    public static any<TError extends Error | string>(...args: [...results: Result[], error: TError]): Result<void, TError> {
        if (args.length < 3) {
            throw new Error(`Not enough arguments supplied to Result.all(). Expected at least 3 arguments but got: ${args.length}`);
        }

        const results = args.slice(0, -1) as Result[];

        if (results.some(result => result.ok())) {
            return Result.ok<TError>();
        }

        const error = args[args.length - 1] as TError;

        return Result.nok(error);
    }
}
