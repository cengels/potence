/**
 * Offers convenience methods on arrays.
 *
 * Note that any iterations use `Array.prototype.forEach()` and Co.
 * In older browsers, a simple `for` loop was significantly faster.
 * In modern browsers, that is still the case, but the difference
 * is now negligible. Even on arrays with a length of over 10,000,000,
 * the difference in performance makes up barely 30 ms.
 */
namespace Arrays {
    /** Returns a copy of the specified array. */
    export function clone<T>(array: T[]): T[] {
        return array.slice();
    }
}

export default Arrays;
