import CompareResult from '../numbers/CompareResult.js';

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
