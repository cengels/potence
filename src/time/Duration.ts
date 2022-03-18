const NUM_MILLISECONDS = 1000 as const;
const NUM_SECONDS = 60 as const;     // 60 * 1000
const NUM_MINUTES = 60 as const;     // 60 * 1000
const NUM_HOURS = 24 as const;    // 60 * 60 * 1000
const NUM_DAYS = 7 as const;    // 24 * 60 * 60 * 1000
const FACTOR_SECONDS = 1000 as const;
const FACTOR_MINUTES = 60_000 as const;     // 60 * 1000
const FACTOR_HOURS = 3_600_000 as const;    // 60 * 60 * 1000
const FACTOR_DAYS = 86_400_000 as const;    // 24 * 60 * 60 * 1000
const FACTOR_WEEKS = 604_800_000 as const;  // 7 * 24 * 60 * 60 * 1000

/** Represents a span of time. */
export default class Duration {
    private readonly value: number;

    private constructor(ms: number = 0) {
        if (ms < 0) {
            throw new Error(`Negative durations are not supported (ms: ${ms}).`);
        }

        this.value = ms;
    }

    /** Gets the number of milliseconds in this {@link Duration}. */
    public get milliseconds(): number {
        return this.value;
    }

    /** Gets the number of seconds in this {@link Duration}. */
    public get seconds(): number {
        return this.value / FACTOR_SECONDS;
    }
    
    /** Gets the number of minutes in this {@link Duration}. */
    public get minutes(): number {
        return this.value / FACTOR_MINUTES;
    }
    
    /** Gets the number of hours in this {@link Duration}. */
    public get hours(): number {
        return this.value / FACTOR_HOURS;
    }
    
    /** Gets the number of days in this {@link Duration}. */
    public get days(): number {
        return this.value / FACTOR_DAYS;
    }
    
    /** Gets the number of weeks in this {@link Duration}. */
    public get weeks(): number {
        return this.value / FACTOR_WEEKS;
    }

    /** 
     * Gets the remaining number of milliseconds in this {@link Duration}
     * after all larger units have been subtracted.
     */
    public remainingMilliseconds(): number {
        return this.milliseconds % NUM_MILLISECONDS;
    }

    /** 
     * Gets the remaining number of seconds in this {@link Duration}
     * after all larger units have been subtracted.
     */
    public remainingSeconds(): number {
        return this.seconds % NUM_SECONDS;
    }
    
    /** 
     * Gets the remaining number of minutes in this {@link Duration}
     * after all larger units have been subtracted.
     */
    public remainingMinutes(): number {
        return this.minutes % NUM_MINUTES;
    }
    
    /** 
     * Gets the remaining number of hours in this {@link Duration}
     * after all larger units have been subtracted.
     */
    public remainingHours(): number {
        return this.hours % NUM_HOURS;
    }
    
    /** 
     * Gets the remaining number of days in this {@link Duration}
     * after all larger units have been subtracted.
     */
    public remainingDays(): number {
        return this.days % NUM_DAYS;
    }
    
    /** 
     * Gets the remaining number of weeks in this {@link Duration}
     * after all larger units have been subtracted.
     */
    public remainingWeeks(): number {
        return this.weeks;
    }

    /** Adds the given {@link Duration} to a copy of this duration. */
    public add(duration: Duration): Duration {
        return new Duration(this.value + duration.value);
    }

    /** Subtracts the given {@link Duration} from a copy of this duration. */
    public sub(duration: Duration): Duration {
        return new Duration(this.value - duration.value);
    }

    /**
     * Returns a string representation of this {@link Duration}.
     * Use separator `"unit"` to get a string in the format of
     * `"4m53s"` or `"unit "` for `"4m 53s"`.
     */
    public toString(separator: string = ':'): string {
        const weeks = Math.floor(this.remainingWeeks());
        const days = Math.floor(this.remainingDays());
        const hours = Math.floor(this.remainingHours());
        const minutes = Math.floor(this.remainingMinutes());
        const seconds = Math.floor(this.remainingSeconds());
        const isUnit = separator.includes('unit');

        function sep(unit: 'w' | 'd' | 'h' | 'm' | 's' | 'ms'): string {
            if (isUnit) {
                return separator.replace('unit', unit);
            }
            
            if (unit === 's' || unit === 'ms') {
                return '';
            }

            return separator;
        }

        if (weeks > 0) {
            return `${weeks}${sep('w')}${days}${sep('d')}${hours}${sep('h')}${minutes}${sep('m')}${seconds}${sep('s')}`;
        }

        if (days > 0) {
            return `${days}${sep('d')}${hours}${sep('h')}${minutes}${sep('m')}${seconds}${sep('s')}`;
        }

        if (hours > 0) {
            return `${hours}${sep('h')}${minutes}${sep('m')}${seconds}${sep('s')}`;
        }

        return `${minutes}${sep('m')}${seconds}${sep('s')}`;
    }

    /** 
     * Creates a new {@link Duration} from a number of milliseconds.
     */
    public static fromMilliseconds(value: number): Duration {
        return new Duration(value);
    }

    /** 
     * Creates a new {@link Duration} from a number of seconds.
     */
    public static fromSeconds(value: number): Duration {
        return new Duration(value * FACTOR_SECONDS);
    }

    /** 
     * Creates a new {@link Duration} from a number of minutes.
     */
    public static fromMinutes(value: number): Duration {
        return new Duration(value * FACTOR_MINUTES);
    }

    /** 
     * Creates a new {@link Duration} from a number of hours.
     */
    public static fromHours(value: number): Duration {
        return new Duration(value * FACTOR_HOURS);
    }

    /** 
     * Creates a new {@link Duration} from a number of days.
     */
    public static fromDays(value: number): Duration {
        return new Duration(value * FACTOR_DAYS);
    }

    /** 
     * Creates a new {@link Duration} from a number of weeks.
     */
    public static fromWeeks(value: number): Duration {
        return new Duration(value * FACTOR_WEEKS);
    }

    /** Adds a duration to a {@link Date}. */
    public static add(a: Date, b: Duration): Date;
    /** Adds a duration to a duration. */
    public static add(a: Duration, b: Duration): Duration;
    public static add(a: Date | Duration, b: Duration): Date | Duration {
        if (a instanceof Date) {
            return new Date(a.getTime() + b.value);
        }

        return a.add(b);
    }

    /** Subtracts a duration from a {@link Date}. */
    public static sub(a: Date, b: Duration): Date;
    /** Subtracts a duration from a duration. */
    public static sub(a: Duration, b: Duration): Duration;
    public static sub(a: Date | Duration, b: Duration): Date | Duration {
        if (a instanceof Date) {
            return new Date(a.getTime() - b.value);
        }

        return a.sub(b);
    }

    /** 
     * Gets the difference between two {@link Date}s or their contained values.
     * 
     * Note that, because {@link Duration}s cannot be negative, the order
     * of the operands does not matter. Use `Time.compare()`
     * to check which of the two comes first.
     */
    public static difference(a: Date | number, b: Date | number): Duration {
        const aTime = typeof a === 'number' ? a : a.getTime();
        const bTime = typeof b === 'number' ? b : b.getTime();

        return new Duration(Math.abs(aTime - bTime));
    }

    /**
     * Gets the duration that has elapsed since the given {@link Date}.
     */
    public static elapsed(date: Date): Duration {
        return Duration.difference(date, Date.now());
    }
}
