import CompareResult from '../numbers/CompareResult.js';
import Duration from './Duration.js';

/** 
 * Compares two Dates or their contained millisecond values with each other
 * and returns a result indicating if the first argument is greater, smaller,
 * or equal to the second argument.
 */
export function compare(a: Date | number, b: Date | number): CompareResult {
    const aTime = typeof a === 'number' ? a : a.getTime();
    const bTime = typeof b === 'number' ? b : b.getTime();

    if (aTime < bTime) {
        return CompareResult.Less;
    }

    if (aTime > bTime) {
        return CompareResult.Greater;
    }

    return CompareResult.Equal;
}

/** 
 * Adds a {@link Duration} to a {@link Date} and
 * returns a new {@link Date} representing the result.
 */
export function add(a: Date, b: Duration): Date {
    return new Date(a.getTime() + b.totalMilliseconds);
}

/** 
 * Subtracts a {@link Duration} from a {@link Date} and
 * returns a new {@link Date} representing the result.
 */
export function sub(a: Date, b: Duration): Date {
    return new Date(a.getTime() - b.totalMilliseconds);
}

export { Duration };
