import type Range from './Range.js';

/**
 * Represents a readonly range between two numbers with a variety of functions
 * that simplify working with number ranges.
 *
 * Note that all property methods are cached calculated properties.
 * That is, calculation is deferred until the method is first called
 * and then cached for subsequent calls unless the `from` or `to`
 * values are modified.
 */
export default interface ReadonlyRange {
    /** The start of the range (inclusive). This is not necessarily the smallest value in the range. Use `Range.min()` for that. */
    from: number;
    /** The end of the range (inclusive). This is not necessarily the largest value in the range. Use `Range.max()` for that. */
    to: number;
    /** Gets either `from` or `to`, whichever is smaller. */
    min(): number;
    /** Gets either `from` or `to`, whichever is greater. */
    max(): number;
    /** Gets the center between from and to. */
    center(): number;
    /** Gets the difference between from and to. This number can never be negative. */
    span(): number;
    /**
     * If this range does not include `value`, returns either `min` or `max` depending
     * on whether the range was undershot or overshot, otherwise returns `value`.
     */
    clamp(value: number): number;
    /**
     * Checks if the number is contained in this range.
     *
     * A number is considered *contained* by the range if it
     * lies in-between or at the specified from and to points.
     *
     * @param {number} tolerance With floating point inaccuracies,
     * sometimes a decimal number is just barely (say, 0.0000001) below
     * a range. You can specify a tolerance to mitigate this problem.
     * Additionally, negative tolerance can narrow the range of valid values
     * rather than expand it. The default tolerance is 0.00000001.
     */
    contains(value: number, tolerance?: number): boolean;
    /** Returns true if the target range is completely contained in this range. */
    contains(range: ReadonlyRange): boolean;
    /**
     * Checks if the number is in-between the end points of this range.
     *
     * This function differs from `contains()` in that `contains()` also
     * considers values on the two end points to be "inside" the range.
     * This function does not.
     *
     * It is recommended not to use this function with floating point numbers.
     * Use `contains()` with an appropriate tolerance instead. You can specify
     * a negative tolerance to shrink the valid range.
     */
    isBetween(value: number): boolean;
    /** Returns a value indicating whether the two ranges overlap. */
    overlaps(range: ReadonlyRange): boolean;
    /**
     * Finds the intersection point closest to this range's center with the given range.
     * If this range completely envelops the target range, returns this range's center.
     * If there is no intersection, returns NaN.
     */
    intersectionPoint(range: ReadonlyRange): number;
    /**
     * Gets the intersection between this range and `range` as a new Range.
     * If there is no intersection, returns an empty Range.
     */
    intersect(range: ReadonlyRange): Range;
    /**
     * Gets the union between this range and `range` as a new Range.
     * If there is no true union (that is, the two ranges do not intersect),
     * the returned Range will "bridge the gap", so to speak, acting as if
     * either of the ranges were large enough to meet the other.
     */
    union(range: ReadonlyRange): Range;
    /** Gets the value located at the specified value. For the returned value to be inside this range, the argument should be between 0.0 and 1.0. */
    at(value: number): number;
    /** Gets a relative value between 0.0 and 1.0 to indicate the position of the passed value inside the range. This function is the counter-component to `at()`. */
    relative(value: number): number;
    /**
     * Wraps the number into this range. That is, if the number exceeds this range, it will "wrap around" the range's start.
     *
     * For instance, in a range of -3 to 3, the value 4 would be wrapped to -2.
     */
    wrap(value: number): number;
    /** 
    * If this range intersects with `range`, gets the total distance that
    * this range should be moved so that it no longer intersects with `range`.
    * 
    * This function will always choose the shortest distance. The distance
    * can be negative. If the ranges don't intersect, the return value will
    * be 0.
    */
    getOffset(range: ReadonlyRange): number
    /** Returns true if the range is empty, that is it spans no distance. */
    isEmpty(): boolean;
    /** Checks if the given range is identical to this one. */
    equals(range: ReadonlyRange): boolean;
    /** Checks if this range has the given `from` and `to` values. */
    equals(from: number, to: number): boolean;
    /** Clones the range. */
    clone(): Range;
}
