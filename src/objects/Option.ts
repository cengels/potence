import { Nullable } from '../types.js';
import { stringify } from './stringify.js';

const defaultUnwrapError = new Error('Option unwrapped null value!');

/**
 * Represents a value that may or may not be defined.
 */
export default class Option<T> {
    private readonly value: Nullable<T>;

    public constructor(value?: Nullable<T>) {
        this.value = value;
    }

    /** 
     * If this Option has a value, returns it,
     * otherwise throws an error.
     */
    public unwrap(error: Error | string = defaultUnwrapError): T {
        if (this.value != null) {
            return this.value;
        }

        if (typeof error === 'string') {
            throw new Error(error);
        }

        throw error;
    }

    /** Returns `true` if this Option contains a value. */
    public hasValue(): boolean {
        return this.value != null;
    }

    /**
     * If this Option has a value, returns it,
     * otherwise returns the value passed to this function.
     */
    public or<U = T>(other: U): T | U {
        return this.value ?? other;
    }

    /**
     * Converts this `Option<T>` to an `Option<T | U>` by applying a transformer
     * function to the value contained in this Option (if it contains a value).
     */
    public map<U = T>(mapFn: (value: T) => Nullable<U>): Option<T | U> {
        if (this.value == null) {
            return new Option(this.value);
        }

        return new Option(mapFn(this.value));
    }

    /** Runs the passed callback if and only if this Option contains a value. */
    public run(callback: (value: T) => void): void {
        if (this.value != null) {
            callback(this.value);
        }
    }

    public toString(): string {
        if (this.value != null) {
            return `Option(${stringify(this.value)})`;
        }

        return 'Option()';
    }
}
