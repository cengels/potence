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
    #from: number;
    #to: number;
    #min?: number;
    #max?: number;
    #center?: number;
    #span?: number;

    public constructor(from: number, to: number) {
        this.#from = from;
        this.#to = to;
    }

    public get from(): number { return this.#from; }
    public get to(): number { return this.#to; }

    /**
     * Sets this range to the new values and returns itself.
     *
     * Note that `from` does not need to be smaller than `to`. Using an inverted
     * range can be helpful for, for instance, `Range.at()`.
     */
    public set(from: number, to: number): this {
        this.#from = from;
        this.#to = to;
        this.reset();

        return this;
    }

    /** Inverts the range so that `from` becomes `to` and `to` becomes `from`. */
    public invert(): this {
        return this.set(this.to, this.from);
    }

    private reset(): void {
        this.#min = undefined;
        this.#max = undefined;
        this.#center = undefined;
        this.#span = undefined;
    }

    public min(): number {
        if (this.#min == null) {
            // Using the ternary operator like this rather than Math.min()
            // is actually dramatically (about 5x) faster in tight loops.
            this.#min = this.#from < this.#to ? this.#from : this.#to;
        }

        return this.#min;
    }

    public max(): number {
        if (this.#max == null) {
            // Using the ternary operator like this rather than Math.max()
            // is actually dramatically (about 5x) faster in tight loops.
            this.#max = this.#from > this.#to ? this.#from : this.#to;
        }

        return this.#max;
    }

    public center(): number {
        if (this.#center == null) {
            this.#center = (this.max() - this.min()) / 2 + this.min();
        }

        return this.#center;
    }

    public span(): number {
        if (this.#span == null) {
            this.#span = this.max() - this.min();
        }

        return this.#span;
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

    public isBetween(value: number): boolean {
        return this.min() < value && value < this.max();
    }

    public overlaps(range: ReadonlyRange): boolean {
        return this.isBetween(range.from) || this.isBetween(range.to);
    }

    public intersect(range: ReadonlyRange): number {
        if (!this.overlaps(range)) {
            return Number.NaN;
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

    public wrap(value: number): number {
        if (value >= this.min() && value <= this.max()) {
            return value;
        }

        if (value < this.min()) {
            const difference = this.min() - value;
            return this.max() - Math.abs(difference % (this.max() - this.min()));
        }

        const difference = value - this.max();

        return this.min() + Math.abs(difference % (this.max() - this.min()));
    }

    public equals(range: ReadonlyRange): boolean;
    public equals(from: number, to: number): boolean;
    public equals(rangeOrFrom: ReadonlyRange | number, to?: number): boolean {
        if (typeof rangeOrFrom === 'number') {
            return this.#from === rangeOrFrom && this.#to === to;
        }

        return this.#from === rangeOrFrom.from && this.#to === rangeOrFrom.to;
    }

    public clone(): Range {
        return new Range(this.from, this.to);
    }
}
