import Range from './Range';

/** Provides helper methods related to operations on numbers. */
namespace Numbers {
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

    /** Checks if the source number is between the given range. Specify a `minimumDifference` to either account for floating point inaccuracies or to make this check exclusive rather than inclusive. */
    export function between(value: number, min: number, max: number, minimumDifference: number = 0.0001): boolean {
        return (value - min) > minimumDifference && (max - value) > minimumDifference;
    }

    /**
     * Gets the center of the specified numbers.
     */
    export function center(...values: number[]): number {
        if (values.length === 0) {
            return 0;
        }

        const smallest = Math.min(...values);
        const largest = Math.max(...values);

        return (largest - smallest) / 2 + smallest;
    }
}

export default Numbers;
