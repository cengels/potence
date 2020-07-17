/**
 * Represents a range between two numbers with a variety of functions
 * that simplify working with number ranges.
 *
 * Note that all property methods are cached calculated properties.
 * That is, calculation is deferred until the method is first called
 * and then cached for subsequent calls unless the `from` or `to`
 * values are modified.
 */
export default class Range {
    private _from: number;
    private _to: number;
    private _min?: number;
    private _max?: number;
    private _center?: number;
    private _span?: number;

    public constructor(from: number, to: number) {
        this._from = from;
        this._to = to;
    }

    public get from(): number { return this._from; }
    public get to(): number { return this._to; }

    /** Sets this range to the new values and returns itself. */
    public set(from: number, to: number): this {
        this._from = from;
        this._to = to;
        this.reset();

        return this;
    }

    /** Inverts the range so that `from` becomes `to` and `to` becomes `from`. */
    public invert(): this {
        return this.set(this.to, this.from);
    }

    private reset(): void {
        this._min = undefined;
        this._max = undefined;
        this._center = undefined;
        this._span = undefined;
    }

    /** Gets the smallest value included in this range. */
    public min(): number {
        if (this._min == null) {
            // Using the ternary operator like this rather than Math.min()
            // is actually dramatically (about 5x) faster in big loops.
            this._min = this._from < this._to ? this._from : this._to;
        }

        return this._min;
    }

    /** Gets the largest value included in this range. */
    public max(): number {
        if (this._max == null) {
            // Using the ternary operator like this rather than Math.max()
            // is actually dramatically (about 5x) faster in big loops.
            this._max = this._from > this._to ? this._from : this._to;
        }

        return this._max;
    }

    /** Gets the center of from and to. */
    public center(): number {
        if (this._center == null) {
            this._center = (this.max() - this.min()) / 2 + this.min();
        }

        return this._center;
    }

    /** Gets the difference between from and to. */
    public span(): number {
        if (this._span == null) {
            this._span = this.max() - this.min();
        }

        return this._span;
    }

    /**
     * If this range does not include value, returns either the min or max depending
     * on whether the range was undershot or overshot, otherwise returns value.
     */
    public clamp(value: number): number {
        if (value < this.min()) {
            return this.min();
        }

        if (value > this.max()) {
            return this.max();
        }

        return value;
    }

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
     * rather than expand it. The default tolerance is 0.
     */
    public contains(value: number, tolerance: number = 0): boolean {
        return (this.min() - tolerance) <= value && value <= (this.max() + tolerance);
    }

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
    public between(value: number): boolean {
        return this.min() < value && value < this.max();
    }

    /** Finds the intersection point closest to this range's center with the given range. If there is no intersection, throws an error. To avoid this, check if there is an intersection using `overlap()` first. */
    public intersect(range: Range): number {
        if (!this.overlap(range)) {
            throw new Error('Range.intersect() found no intersection. Call Range.overlap() first to prevent this error.');
        }

        const center = this.center();

        if (range.contains(center, 0)) {
            return center;
        }

        return range.clamp(center);
    }

    /** Returns a value indicating whether the two ranges overlap. */
    public overlap(range: Range): boolean {
        return range.contains(this.from, 0) || range.contains(this.to, 0);
    }

    /** Gets the value located at `at`. For the returned value to be inside this range, `at` should be between 0.0 and 1.0. */
    public at(value: number): number {
        return (this.to - this.from) * value + this.from;
    }

    /** Gets a relative value between 0.0 and 1.0 to indicate the position of the passed value inside the range. This function is the counter-component to `at()`. */
    public relative(value: number): number {
        const normalizedValue = value - this.min();
        const relativeValue = normalizedValue / this.span();

        return this.from > this.to ? 1 - relativeValue : relativeValue;
    }

    /** Clones the range. */
    public clone(): Range {
        return new Range(this.from, this.to);
    }
}
