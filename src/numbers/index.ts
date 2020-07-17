/** @file Provides helper methods related to operations on numbers. */

import Range from './Range';

/** Clamps the value to the specified min and max values. If the value undershoots min or exceeds max, it is set to that value. */
export function clamp(value: number, min: number, max: number): number {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

/** Gets the value located at `at`. For the returned value to be between start and end, `at` should be between 0.0 and 1.0. */
export function at(start: number, end: number, at: number): number {
    return (end - start) * at + start;
}

/** Creates a new `Range` with the given arguments. */
export function range(from: number, to: number): Range {
    return new Range(from, to);
}

/**
 * Checks if the source number is between the given range.
 * Specify a `minimumDifference` to either account for floating point
 * inaccuracies or to make this check exclusive rather than inclusive.
 */
export function between(value: number, min: number, max: number, minimumDifference: number = 0.0001): boolean {
    return (value - min) > minimumDifference && (max - value) > minimumDifference;
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
