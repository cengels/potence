import * as Numbers from '.';

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
            this._min = Math.min(this.from, this.to);
        }

        return this._min;
    }

    /** Gets the largest value included in this range. */
    public max(): number {
        if (this._max == null) {
            this._max = Math.max(this.from, this.to);
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

    /** If this range does not include value, returns the respective range end, otherwise returns value. */
    public clamp(value: number): number {
        return Numbers.clamp(value, this.min(), this.max());
    }

    /** Checks if the number is contained in this range. */
    public contains(value: number, minimumDifference?: number): boolean {
        return Numbers.between(value, this.min(), this.max(), minimumDifference);
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
        return Numbers.at(this.from, this.to, value);
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
