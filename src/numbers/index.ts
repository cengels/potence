/**
 * @file Provides helper methods related to operations on numbers.
 *
 * Note that all range-related functions (like `clamp()`) internally use a `Range`.
 * There is no noticeable difference in performance between a function that does not
 * use a custom class, a function that instantiates a new Range every time it is called,
 * and a function that uses a cached Range every time it is called.
 */

import Range from './Range.js';

interface Configuration {
    /**
     * The default tolerance to use in functions that compare floating point numbers.
     * The default tolerance is `0.0000001`.
     */
    defaultTolerance?: number;
}

export function configure(configuration: Configuration): void {
    if (configuration.defaultTolerance != null) {
        defaultTolerance = configuration.defaultTolerance;
    }
}

const DEFAULT_TOLERANCE = 0.0000001 as const;
let defaultTolerance: number = DEFAULT_TOLERANCE;

/**
 * Accurately compares two integral or floating point numbers with the given tolerance.
 *
 * The tolerance determines how big the difference between the two numbers may be before
 * they are no longer considered equal. If the default tolerance has not been changed
 * via `configure()`, it is `0.0000001`.
 */
export function compare(value1: number, value2: number, tolerance: number = defaultTolerance): boolean {
    return Math.abs(value1 - value2) <= tolerance;
}

/**
 * Creates a new `Range` with the given `from` and `to` values.
 *
 * Ranges are powerful mathematical objects with the ability to, for instance,
 * clamp a number, check if a number is contained in a range,
 * or determine the relative percentual location of a value inside the
 * range.
 *
 * The cost of instantiating a new Range is roughly equivalent to the cost
 * of calling `Range.set()` on an existing Range, so don't be afraid of
 * calling this method. Even in tight loops, the performance impact
 * will be minimal.
 *
 * Note that `from` does not need to be smaller than `to`. Using an inverted
 * range can be helpful for, for instance, `Range.at()`.
 */
export function range(from: number, to: number): Range;
export function range(...values: number[]): Range;
/**
 * Creates a new `Range` that includes all the given numbers and is sorted
 * so that `from` is the lowest and `to` the highest number. You can call
 * `Range.invert()` if you'd prefer the Range the other way around.
 *
 * Ranges are powerful mathematical objects with the ability to, for instance,
 * clamp a number, check if a number is contained in a range,
 * or determine the relative percentual location of a value inside the
 * range.
 *
 * The cost of instantiating a new Range is roughly equivalent to the cost
 * of calling `Range.set()` on an existing Range, so don't be afraid of
 * calling this method. Even in tight loops, the performance impact
 * will be minimal.
 */
export function range(...values: number[]): Range {
    if (values.length < 2) {
        throw new Error('Cannot create a Range without at least two numbers.');
    }

    if (values.length === 2) {
        return new Range(values[0], values[1]);
    }

    values.sort((a, b) => a - b);

    return new Range(values[0], values[values.length - 1]);
}

/** Returns true if the number is an even number. */
export function isEven(value: number): boolean {
    return value % 2 === 0;
}

/** Returns true if the number is an odd number. */
export function isOdd(value: number): boolean {
    return value % 2 === 1;
}

/**
 * Returns true if the number is a floating point number,
 * i.e. it is not an integral number.
 *
 * To check whether a number is an integer, use
 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger).
 */
export function isFloat(value: unknown): value is number {
    return !Number.isInteger(value)
        && !Number.isNaN(value)
        && Number.isFinite(value);
}

/**
 * Returns true if the number is a safe number,
 * i.e. a number with a low chance of floating
 * point inaccuracies.
 *
 * This function tests for floating point
 * inaccuracy by conducting an arbitrary mathematical
 * operation on the value, inverting it, and comparing
 * it with the original value.
 *
 * *Note: This function may not always be 100% accurate.
 * Do not base any important algorithms on the result
 * of this function. If you're trying to compare two
 * floating point numbers, use `Numbers.compare()` instead.*
 */
export function isSafeFloat(value: number): boolean {
    return isFloat(value) && (value * 1.5 / 1.5) === value;
}

/**
 * Returns true if the number is an unsafe number,
 * i.e. a number with a high chance of floating
 * point inaccuracies.
 *
 * This function tests for floating point
 * inaccuracy by conducting an arbitrary mathematical
 * operation on the value, inverting it, and comparing
 * it with the original value.
 *
 * *Note: This function may not always be 100% accurate.
 * Do not base any important algorithms on the result
 * of this function. If you're trying to compare two
 * floating point numbers, use `Numbers.compare()` instead.*
 */
export function isUnsafeFloat(value: number): boolean {
    return isFloat(value) && !isSafeFloat(value);
}

/**
 * Determines the greatest common divisor of the integers. The
 * greatest common divisor is the largest positive integer
 * that divides each of the integers without a remainder. Uses the Euclidean
 * algorithm for computation.
 *
 * Returns 0 if any of the divisors are 0 or fractions.
 */
export function gcd(...values: number[]): number {
    if (values.length < 2) {
        return 0;
    }

    let result: number = values[0];

    for (let i: number = 1; i < values.length; i++) {
        if (result === 0 || values[i] === 0 || isFloat(values[i])) {
            return 0;
        }

        const mod = result % values[i];

        if (compare(mod, 0)) {
            return values[i];
        }

        result = gcd(values[i], mod);
    }

    return result;
}

/**
 * Gets the least common multiple for the given integers.
 * The least common multiple is the smallest multiple of
 * themselves that all the integers share. For instance,
 * the least common multiple of `{3, 4, 5}` is `60` because
 * it is the first multiple that all the numbers can reach
 * (`3 * 20`, `4 * 15`, `5 * 12`).
 *
 * Returns 0 if any of the values are 0 or floating point numbers.
 */
export function lcm(...values: number[]): number {
    if (values.length < 2) {
        return 0;
    }

    let result: number = values[0];

    for (let i: number = 1; i < values.length; i++) {
        if (result === 0 || values[i] === 0 || isFloat(values[i])) {
            return 0;
        }

        result = (result * values[i]) / gcd(result, values[i]);
    }

    return result;
}

/**
 * Gets the median of the specified numbers. The median is defined as:
 *
 * * If the sequence contains an odd number of values, the sequence
 *   is first sorted and then the middle value is extracted.
 * * If the sequence contains an even number of values, the sequence
 *   is first sorted and then the average of the two middle values is extracted.
 */
export function median(...values: number[]): number {
    if (values.length === 0) {
        return 0;
    } else if (values.length === 1) {
        return values[0];
    }

    values.sort((a, b) => a - b);

    if (isEven(values.length)) {
        const lowerMiddle = values[values.length / 2];
        const upperMiddle = values[values.length / 2 - 1];
        return (upperMiddle - lowerMiddle) / 2 + lowerMiddle;
    }

    return values[Math.floor(values.length / 2)];
}

/** Gets the sum of the elements in the array. */
export function sum(...values: number[]): number {
    return values.reduce((accumulator, current) => accumulator += current, 0);
}

/** Gets the mean of the elements in the array. */
export function mean(...values: number[]): number {
    if (values.length === 0) {
        return 0;
    }

    return sum(...values) / values.length;
}

const romanNumerals: ReadonlyArray<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
];

/** 
 * Converts a positive non-zero integer to a roman numeral.
 * 
 * This function ignores all decimal places, in case the number is not an integer.
 * If the number equals 0 or is less than 0, the function throws an error.
 */
export function roman(value: number): string {
    if (value <= 0) {
        throw new Error(`Called Numbers.roman(${value}), but roman numerals can only be used to represent numbers above 0.`);
    }

    let integer = Math.trunc(value);
    let result = '';

    for (const romanNumeral of romanNumerals) {
        const correspondingNumber = romanNumeral[0];

        while (integer >= correspondingNumber) {
            integer -= correspondingNumber;
            result += romanNumeral[1];
        }
    }

    return result;
}

/** 
 * Returns the target number closest to the source number.
 * 
 * If two target numbers have the same absolute difference to `source`,
 * returns the first one specified.
 * 
 * If no target number is specified, returns `source`.
 */
export function closest(source: number, ...targets: number[]): number {
    return targets.sort((a, b) => Math.abs(source - a) - Math.abs(source - b))[0] ?? source;
}

/**
 * Gets the exponent of a `base` raised to the given `power`.
 * 
 * In other words, gets `n` in a formula of the shape:
 * `base raised to n = power`.
 */
export function exponent(base: number, power: number): number {
    const result = Math.log(power) / Math.log(Math.abs(base));

    if (!compare(Math.pow(base, result), power, DEFAULT_TOLERANCE)) {
        return Number.NaN;
    }

    return result;
}

/**
 * Increments a counter that starts at an index (default: 0) and returns the
 * first integral number not found in the range.
 * 
 * @param from A range of integers.
 * @param startIndex Optional. The index at which to start counting. Default: 0.
 */
export function firstUnique(from: Iterable<number>, startIndex?: number): number;
/**
 * Increments a counter that starts at an index (default: 0) and returns the
 * first integral number not found in the range returned by the property
 * callback.
 * 
 * @param from An iterable of any type of objects
 * @param property A callback that is called once per element in the iterable
 *                 and should return an integer. The function will then return
 *                 the first positive integer not returned by this function.
 * @param startIndex Optional. The index at which to start counting. Default: 0.
 */
export function firstUnique<T>(from: Iterable<T>, property: ((object: T) => number) | number, startIndex?: number): number;
export function firstUnique<T>(from: Iterable<T>, propertyOrStartIndex?: ((object: T) => number) | number, optStartIndex: number = 0): number {
    const numbers = new Set<number>();
    const property = typeof propertyOrStartIndex === 'function' ? propertyOrStartIndex : undefined;
    const startIndex = typeof propertyOrStartIndex === 'number' ? propertyOrStartIndex : optStartIndex;

    for (const element of from) {
        if (property != null) {
            numbers.add(property(element));
        } else if (typeof element === 'number') {
            numbers.add(element);
        } else {
            throw new Error(`firstUnique(): Encountered non-number element ${element}! Did you mean to supply a property callback?`);
        }
    }
    
    for (let i: number = startIndex;; i++) {
        if (!numbers.has(i)) {
            return i;
        }
    }
}

/** 
 * Attempts to convert the value to a number and returns it if the conversion
 * succeeded. If the conversion failed, returns `undefined`.
 */
export function from(potentialNumber: unknown): number | undefined {
    // Can't use parseInt()/parseFloat() here as they will
    // simply ignore all non-digits that follow other digits.
    // The non-number string '5e' would be considered a number.

    if (potentialNumber == null || (typeof potentialNumber === 'string' && potentialNumber.length === 0)) {
        return undefined;
    }

    const number = Number(potentialNumber);

    if (Number.isNaN(number)) {
        return undefined;
    }

    return number;
}
