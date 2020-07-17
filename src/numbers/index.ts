/**
 * @file Provides helper methods related to operations on numbers.
 *
 * Note that all range-related functions (like `clamp()`) internally use a `Range`.
 * There is no noticeable difference in performance between a function that does not
 * use a custom class, a function that instantiates a new Range every time it is called,
 * and a function that uses a cached Range every time it is called.
 */

import Range from './Range';

/** Clamps the value to the specified min and max values. If the value undershoots min or exceeds max, it is set to that value. */
export function clamp(value: number, min: number, max: number): number {
    return new Range(min, max).clamp(value);
}

/** Gets the value located at `at`. For the returned value to be between start and end, `at` should be between 0.0 and 1.0. */
export function at(start: number, end: number, at: number): number {
    return new Range(start, end).clamp(at);
}

/** Creates a new `Range` with the given arguments. */
export function range(from: number, to: number): Range {
    return new Range(from, to);
}

/**
 * Checks if the source number is between the given range.
 *
 * @param {number} tolerance With floating point inaccuracies,
 * sometimes a decimal number is just barely (say, 0.0000001) below
 * a range. You can specify a tolerance to mitigate this problem.
 * Additionally, negative tolerance can narrow the range of valid values
 * rather than expand it. The default tolerance is 0.
 */
export function between(value: number, min: number, max: number, tolerance: number = 0): boolean {
    return range(min, max).contains(value, tolerance);
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

    if (values.length % 2 !== 0) {
        const lowerMiddle = values[Math.floor(values.length / 2)];
        const upperMiddle = values[Math.ceil(values.length / 2)];
        return (upperMiddle - lowerMiddle) / 2 + lowerMiddle;
    }

    return values[values.length / 2];
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
