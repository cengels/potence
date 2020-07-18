/**
 * @file Provides helper methods related to operations on numbers.
 *
 * Note that all range-related functions (like `clamp()`) internally use a `Range`.
 * There is no noticeable difference in performance between a function that does not
 * use a custom class, a function that instantiates a new Range every time it is called,
 * and a function that uses a cached Range every time it is called.
 */

import Range from './Range';

/**
 * Creates a new `Range` with the given arguments.
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
export function range(from: number, to: number): Range {
    return new Range(from, to);
}

/**
 * Gets the center between the specified numbers.
 *
 * This function is not to be confused with `median()`.
 * While the median simply takes the middle number in the sequence,
 * this function calculates the number halfway between the maximum
 * and minimum numbers, regardless of whether it is an actual
 * value contained in the given sequence or not.
 */
export function center(...values: number[]): number {
    if (values.length === 0) {
        return 0;
    } else if (values.length === 1) {
        return values[0];
    }

    const smallest = Math.min(...values);
    const largest = Math.max(...values);

    return (largest - smallest) / 2 + smallest;
}

/** Returns true if the number is an even number. */
export function even(value: number): boolean {
    return value % 2 === 0;
}

/** Returns true if the number is an odd number. */
export function odd(value: number): boolean {
    return value % 2 === 1;
}

/**
 * Returns true if the number is an integral number, i.e.
 * a whole number without fractions or decimals.
 */
export function integral(value: number): boolean {
    return value % 1 === 0;
}

/**
 * Returns true if the number is a floating point number,
 * i.e. it is not an integral number.
 */
export function fraction(value: number): boolean {
    return value % 1 !== 0;
}

/**
 * Returns true if the number is a safe number,
 * i.e. a number with a low chance of floating
 * point inaccuracies.
 *
 * In general, a floating point number is only safe
 * if its denominator is the product of an exponentiation of 2,
 * like 1/2 (0.5), 1/4 (0.25), 1/8 (0.125) etc.
 *
 * However, this function instead tests for floating point
 * inaccuracy by conducting an arbitrary mathematical
 * operation on the value, inverting it, and comparing
 * it with the original value.
 *
 * *Note: This function may not always be 100% accurate.
 * Do not base any important algorithms on the result
 * of this function. If you're trying to compare two
 * floating point numbers, use `Numbers.compare()` instead.*
 */
export function safeFloat(value: number): boolean {
    return (value * 1.5 / 1.5) === value;
}

/**
 * Returns true if the number is an unsafe number,
 * i.e. a number with a high chance of floating
 * point inaccuracies.
 *
 * In general, a floating point number is only safe
 * if its denominator is the product of the exponent of 2,
 * like 1/2 (0.5), 1/4 (0.25), 1/8 (0.125) etc.
 *
 * However, this function instead tests for floating point
 * inaccuracy by conducting an arbitrary mathematical
 * operation on the value, inverting it, and comparing
 * it with the original value.
 *
 * *Note: This function may not always be 100% accurate.
 * Do not base any important algorithms on the result
 * of this function. If you're trying to compare two
 * floating point numbers, use `Numbers.compare()` instead.*
 */
export function unsafeFloat(value: number): boolean {
    return (value * 1.5 / 1.5) !== value;
}

/**
 * Gets the median of the specified numbers. The median is defined as:
 *
 * * If the sequence contains an odd number of values, the sequence
 * is first sorted and then the middle value is extracted.
 * * If the sequence contains an even number of values, the sequence
 * is first sorted and then the average of the two middle values is extracted.
 */
export function median(...values: number[]): number {
    if (values.length === 0) {
        return 0;
    } else if (values.length === 1) {
        return values[0];
    }

    values.sort((a, b) => a - b);

    if (even(values.length)) {
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
    return sum(...values) / values.length;
}

/** Alias for `mean()`. */
export function average(...values: number[]): number {
    return mean(...values);
}
