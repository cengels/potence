import ReadonlyRange from './ReadonlyRange.js';

/**
 * Represents a range between two numbers with a variety of functions
 * that simplify working with number ranges.
 *
 * Note that all property methods are cached calculated properties.
 * That is, calculation is deferred until the method is first called
 * and then cached for subsequent calls unless the `from` or `to`
 * values are modified.
 */
export default class Range implements ReadonlyRange {
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

    /**
     * Sets this range to the new values and returns itself.
     *
     * Note that `from` does not need to be smaller than `to`. Using an inverted
     * range can be helpful for, for instance, `Range.at()`.
     */
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

    public min(): number {
        if (this._min == null) {
            // Using the ternary operator like this rather than Math.min()
            // is actually dramatically (about 5x) faster in tight loops.
            this._min = this._from < this._to ? this._from : this._to;
        }

        return this._min;
    }

    public max(): number {
        if (this._max == null) {
            // Using the ternary operator like this rather than Math.max()
            // is actually dramatically (about 5x) faster in tight loops.
            this._max = this._from > this._to ? this._from : this._to;
        }

        return this._max;
    }

    public center(): number {
        if (this._center == null) {
            this._center = (this.max() - this.min()) / 2 + this.min();
        }

        return this._center;
    }

    public span(): number {
        if (this._span == null) {
            this._span = this.max() - this.min();
        }

        return this._span;
    }

    public clamp(value: number): number {
        if (value < this.min()) {
            return this.min();
        }

        if (value > this.max()) {
            return this.max();
        }

        return value;
    }

    public contains(range: ReadonlyRange): boolean;
    public contains(value: number, tolerance?: number): boolean;
    public contains(value: number | ReadonlyRange, tolerance: number = 0.00000001): boolean {
        if (typeof value === 'number') {
            return (this.min() - tolerance) <= value && value <= (this.max() + tolerance);
        }

        return this.contains(value.from, 0) && this.contains(value.to, 0);
    }

    public between(value: number): boolean {
        return this.min() < value && value < this.max();
    }

    public overlaps(range: ReadonlyRange): boolean {
        return this.between(range.from) || this.between(range.to);
    }

    public intersect(range: ReadonlyRange): number {
        if (!this.overlaps(range)) {
            throw new Error('Range.intersect() found no intersection. Call Range.overlap() first to prevent this error.');
        }

        const center = this.center();

        if (range.contains(center, 0)) {
            return center;
        }

        return range.clamp(center);
    }

    public at(value: number): number {
        return (this.to - this.from) * value + this.from;
    }

    public relative(value: number): number {
        const normalizedValue = value - this.min();
        const relativeValue = normalizedValue / this.span();

        return this.from > this.to ? 1 - relativeValue : relativeValue;
    }

    public equals(range: ReadonlyRange): boolean;
    public equals(from: number, to: number): boolean;
    public equals(rangeOrFrom: ReadonlyRange | number, to?: number): boolean {
        if (typeof rangeOrFrom === 'number') {
            return this._from === rangeOrFrom && this._to === to;
        }

        return this._from === rangeOrFrom.from && this._to === rangeOrFrom.to;
    }

    public clone(): Range {
        return new Range(this.from, this.to);
    }
}
