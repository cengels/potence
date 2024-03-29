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
 * if an error comes from an assertion, for instance like so:
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

import * as Arrays from '../arrays/index.js';
import * as Objects from '../objects/index.js';
import { StringifyOptions } from '../objects/index.js';
import * as Strings from '../strings/index.js';
import { TypeofResult, Typeof, Constructor, Falsy, Truthy } from '../types.js';

export class AssertionError extends Error {
    public constructor(message?: string) {
        super(message);

        this.name = 'AssertionError';
    }
}

interface AssertConfiguration {
    /**
     * If true, prefixes all assertion error messages with
     * "Assertion failed." to distinguish them from other errors.
     */
    prefixed?: boolean;
    /**
     * Determines options for how values should be stringified in assertion
     * failure messages.
     *
     * By default array and object contents are truncated. All other options
     * are left at their default.
     */
    stringifyOptions?: StringifyOptions;
}

/** Configures the assert module with the given options. */
export function configure(configuration: AssertConfiguration): void {
    if (configuration.prefixed != null) {
        prefixed = configuration.prefixed;
    }

    if (configuration.stringifyOptions != null) {
        stringifyOptions = configuration.stringifyOptions;
    }
}

export let prefixed: boolean = true;
export let stringifyOptions: StringifyOptions = {
    truncateContents: true
};

function assertionError(failureMessage?: string, ignoreCapitalization: boolean = false): AssertionError {
    if (prefixed) {
        return failureMessage != null
            ? new AssertionError(`Assertion failed: ${ignoreCapitalization ? failureMessage : Strings.uncapitalize(failureMessage)}`)
            : new AssertionError(`Assertion failed.`);
    }

    if (failureMessage == null || failureMessage.length === 0) {
        return new AssertionError('Assertion failed.');
    }

    return new AssertionError(failureMessage);
}

function throwIf(condition: boolean, value: unknown, what: string, name?: string): void {
    if (condition) {
        throw assertionError(name == null
            ? `Expected ${what} but got ${Objects.stringify(value, stringifyOptions)}`
            : `Expected ${name} to be ${what.replace(' value', '').replace('value ', '')} but was ${Objects.stringify(value, stringifyOptions)}`);
    }
}

/**
 * Throws a generic assertion error if the condition is not true and
 * optionally supplies the error with the given failure message.
 *
 * It is recommended to use one of the other assertion types for a more
 * expressive error message.
 */
export function that(condition: boolean, failureMessage?: string): asserts condition {
    // Using condition === false here to make sure
    // falsy-but-not-false values don't trigger the error.
    if (condition === false) {
        throw assertionError(failureMessage, true);
    }
}

/**
 * Throws an assertion error if the value does not equal the specified value.
 * This function compares by referential equality.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function equals<T>(actual: unknown, expected: T, name?: string): asserts actual is T {
    throwIf(actual !== expected, actual, Objects.stringify(expected, stringifyOptions), name);
}

/**
 * Throws an assertion error if the value equals the specified value.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function notEquals(actual: unknown, unexpected: unknown, name?: string): void {
    if (actual === unexpected) {
        const stringifiedUnexpected = Objects.stringify(unexpected, stringifyOptions);

        if (name == null) {
            name = 'value';
        }

        throw assertionError(`Expected ${name} not to equal ${stringifiedUnexpected}`);
    }
}

/**
 * Throws an assertion error if the value is not truthy.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function truthy<T>(value: T, name?: string): asserts value is Truthy<T> {
    throwIf(!value, value, 'truthy value', name);
}

/**
 * Throws an assertion error if the value is not falsy.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function falsy<T>(value: T, name?: string): asserts value is Falsy<T> {
    throwIf(Boolean(value), value, 'falsy value', name);
}

/**
 * Throws an assertion error if the value is null or undefined.
 * Useful for checking the existence of mandatory arguments.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function notNull<T>(value: T, name?: string): asserts value is NonNullable<T> {
    throwIf(value == null, value, 'non-null value', name);
}

/**
 * Throws an assertion error if the type of the value is not the specified type.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function type<T extends TypeofResult>(value: unknown, type: T, name?: string): asserts value is Typeof<T> {
    throwIf(typeof value !== type, value, `value of type ${type}`, name);
}

/**
 * Throws an assertion error if the type of the value is not the specified type.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function instanceOf<T>(value: unknown, constructor: Constructor<T>, name?: string): asserts value is T {
    throwIf(!(value instanceof constructor), value, `instance of ${constructor.name}`, name);
}

/**
 * Throws an assertion error if the iterable contains elements.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function empty(iterable: Iterable<unknown>, name?: string): void {
    if (Arrays.isNotEmpty(iterable)) {
        const count = Arrays.count(iterable);
        const suffix = count !== 1 ? 's' : '';

        throw assertionError(name != null
            ? `Expected ${name} to be empty but had ${count} element${suffix}`
            : `Expected empty iterable but got iterable with ${count} element${suffix}`);
    }
}

/**
 * Throws an assertion error if the iterable contains no elements.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function notEmpty(iterable: Iterable<unknown>, name?: string): void {
    if (Arrays.isEmpty(iterable)) {
        throw assertionError(name != null
            ? `Expected ${name} not to be empty but had 0 elements`
            : `Expected iterable not to be empty but had 0 elements`);
    }
}

/**
 * Iterates across the given array and calls the specified callback on each
 * array item. If any of the callbacks throw an assertion error, stops iterating
 * and propagates the assertion error with an expressive failure message
 * that shows which element failed the assertion.
 *
 * Note that, while returning a simple boolean (instead of using an assertion
 * function inside the callback) is not encouraged, it does generate an
 * appropriate assertion error.
 *
 * @param name If you're checking a named value (like a variable or property),
 *   you can enter its name here for a more expressive error message.
 */
export function every<T>(array: readonly T[], callback: (value: T, index: number) => void | boolean, name?: string): void {
    array.forEach((value, index) => {
        try {
            const returnValue = callback(value, index);

            if (typeof returnValue === 'boolean') {
                that(returnValue, `Callback returned false for ${Objects.stringify(value, stringifyOptions)}`);
            }
        } catch (e) {
            if (e instanceof AssertionError) {
                e.message = `${name ?? 'Array'} failed assertion. Element at index ${index} reported: "${e.message}"`;
            }

            throw e;
        }
    });
}
