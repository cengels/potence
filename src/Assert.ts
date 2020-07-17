/**
 * @file Offers assertion functions on a variety of data types.
 *
 * Assertions are boolean conditionals that should always return true.
 * If they return false, it is indicative of a logic error, not a user error.
 * They are commonly used to make sure an argument is in the valid range of values.
 *
 * By default, assertion errors are prefixed with "Assertion failed" to distinguish
 * them from other errors. To disable this behaviour, set `Assert.prefixed = false`.
 *
 * All assertions inherit from a custom `AssertionError`. This allows you to check
 * if an error comes from an assertion by checking the `Error.name` property.
 *
 * @example
 *
 * try {
 *      Assert.that(false, 'Assertion error');
 *
 *      throw new Error('Another error.');
 * } catch (e) {
 *      if (e.name === 'AssertionError') {
 *          // ...
 *      } else {
 *          // ...
 *      }
 * }
 */

class AssertionError extends Error {
    public constructor(message?: string) {
        super(message);

        this.name = 'AssertionError';
    }
}

/**
 * If true, prefixes all assertion error messages with
 * "Assertion failed." to distinguish them from other errors.
 */
export let prefixed: boolean = true;

function assertionError(failureMessage?: string, prefix: string = 'Assertion failed'): AssertionError {
    if (prefixed) {
        return failureMessage != null
            ? new AssertionError(`${prefix}: ${failureMessage}`)
            : new AssertionError(`${prefix}.`);
    }

    return new AssertionError(failureMessage);
}

/**
 * Throws an assertion error if the condition is not true and
 * optionally supplies the error with the given failure message.
 */
export function that(condition: boolean, failureMessage?: string): void {
    // Using condition === false here to make sure
    // falsy-but-not-false values don't trigger the error.
    if (condition === false) {
        throw assertionError(failureMessage);
    }
}

/**
 * Throws an assertion error if the condition is not truthy and
 * optionally supplies the error with the given failure message.
 */
export function truthy(condition: any, failureMessage: string = 'expression was not truthy.'): void {
    if (!condition) {
        throw assertionError(failureMessage);
    }
}

/**
 * Throws an assertion error if the condition is not falsy and
 * optionally supplies the error with the given failure message.
 */
export function falsy(condition: any, failureMessage: string = 'expression was not falsy.'): void {
    if (condition) {
        throw assertionError(failureMessage);
    }
}

/**
 * Throws an assertion error if any of the array elements
 * did not meet the specified condition and optionally supplies
 * the error with the given failure message.
 */
export function every<T>(array: T[], predicate: (value: T) => boolean, failureMessage?: string): void {
    array.forEach((value, index) => {
        if (!predicate(value)) {
            throw assertionError(failureMessage, `Assertion failed at index ${index}`);
        }
    });
}
