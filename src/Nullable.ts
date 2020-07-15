export type Nullable<T = any> = T | undefined | null;

namespace Nullable {
    /** Gets the  */
    export function get<T>(value: Nullable<T>): NonNullable<T> {
        if (value == null) {
            throw new Error('Nullable.get() called on a null value!');
        }

        return value as NonNullable<T>;
    }

    /** Returns true if the passed value is not null or undefined. */
    export function exists<T>(value: Nullable<T>): value is NonNullable<T> {
        return value != null;
    }

    /**
     * Returns the passed value if it isn't null or undefined, else returns the alternative value.
     *
     * Note that this function is functionally identical to the
     * [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator),
     * so if your targeted browser supports it or if you transpile your JavaScript,
     * you should use that instead of this function.
     */
    export function or<T>(value: Nullable<T>, alternative: T): NonNullable<T> {
        return (exists(value) ? value : alternative) as NonNullable<T>;
    }
}

export default Nullable;
