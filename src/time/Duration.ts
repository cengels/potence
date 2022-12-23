import { splice } from '../strings';
import { Equatable } from '../types';

const NUM_MILLISECONDS = 1000 as const;
const NUM_SECONDS = 60 as const;     // 60 * 1000
const NUM_MINUTES = 60 as const;     // 60 * 1000
const NUM_HOURS = 24 as const;    // 60 * 60 * 1000
const FACTOR_SECONDS = 1000 as const;
const FACTOR_MINUTES = 60_000 as const;     // 60 * 1000
const FACTOR_HOURS = 3_600_000 as const;    // 60 * 60 * 1000
const FACTOR_DAYS = 86_400_000 as const;    // 24 * 60 * 60 * 1000
const FACTORS = [1, 1, FACTOR_DAYS, FACTOR_HOURS, FACTOR_MINUTES, FACTOR_SECONDS, 1] as const;
const DURATION_REGEX = /^((?:(\d*):)?(?:(\d*):)?(\d*):(\d{1,2})(?:\.(\d{3}))?)$/;
const FORMAT_REGEX = /[dD]+|[hH]+|[mM]+|[sS]+|0+/g;

export interface UnitsStringOptions {
    /** The amount of whitespace after each unit specifier. Default is `0`. */
    spaces: number;
    /** 
     * Whether to include the number of milliseconds in the output or not, if
     * there are more than 0 ms remaining. Default is `true`.
     */
    includeMilliseconds: boolean;
}

const DEFAULT_UNITS_STRING_OPTIONS: UnitsStringOptions = {
    spaces: 0,
    includeMilliseconds: true
}

function parseDurationString(string: string): number {
    const result = DURATION_REGEX.exec(string);

    if (result == null) {
        throw new Error('Malformed duration string: ' + string);
    }

    let ms = 0;
    
    for (let i: number = result.length - 1; i > 1; i--) {
        const componentText = result[i];

        if (componentText != null) {
            const component = Number(componentText);
            
            if (Number.isNaN(component)) {
                throw new Error('Malformed duration string: ' + string);
            }

            const factor = FACTORS[i];
            ms += component * factor;
        }
    }

    return ms;
}

/** 
 * Represents a span of time.
 * 
 * The smallest unit of time that may be represented by this class is
 * milliseconds.
 */
export default class Duration implements Equatable {
    private readonly value: number;

    /** 
     * Parses a Duration from a duration string in the format of
     * `ww:dd:hh:mm:ss.ms`. Note that the only required components are `mm:ss`,
     * the other components are optional.
     */
    public constructor(ms: string);
    /**
     * Creates a new Duration instance from the given number of milliseconds.
     * This function is identical to {@link Duration.fromMilliseconds}();
     */
    public constructor(ms: number);
    public constructor(ms: number | string) {
        if (typeof ms === 'string') {
            ms = parseDurationString(ms);
        }

        if (ms < 0) {
            throw new Error(`Negative durations are not supported (ms: ${ms}).`);
        }

        this.value = ms;
    }

    /** Gets the total fractional number of milliseconds in this {@link Duration}. */
    public totalMilliseconds(): number {
        return this.value;
    }

    /** Gets the total fractional number of seconds in this {@link Duration}. */
    public totalSeconds(): number {
        return this.value / FACTOR_SECONDS;
    }
    
    /** Gets the total fractional number of minutes in this {@link Duration}. */
    public totalMinutes(): number {
        return this.value / FACTOR_MINUTES;
    }
    
    /** Gets the total fractional number of hours in this {@link Duration}. */
    public totalHours(): number {
        return this.value / FACTOR_HOURS;
    }
    
    /** Gets the total fractional number of days in this {@link Duration}. */
    public totalDays(): number {
        return this.value / FACTOR_DAYS;
    }

    /** 
     * Gets the milliseconds component of this {@link Duration} as an integral
     * number between `0` and `999`.
     */
    public milliseconds(): number {
        return Math.floor(this.totalMilliseconds() % NUM_MILLISECONDS);
    }

    /** 
     * Gets the seconds component of this {@link Duration} as an integral
     * number between `0` and `59`.
     */
    public seconds(): number {
        return Math.floor(this.totalSeconds() % NUM_SECONDS);
    }
    
    /** 
     * Gets the minutes component of this {@link Duration} as an integral
     * number between `0` and `999`.
     */
    public minutes(): number {
        return Math.floor(this.totalMinutes() % NUM_MINUTES);
    }
    
    /** 
     * Gets the hours component of this {@link Duration} as an integral
     * number between `0` and `23`.
     */
    public hours(): number {
        return Math.floor(this.totalHours() % NUM_HOURS);
    }
    
    /** 
     * Gets the days component of this {@link Duration} as an integral
     * number.
     */
    public days(): number {
        return Math.floor(this.totalDays());
    }

    /** Adds the given {@link Duration} to a copy of this duration. */
    public add(duration: Duration): Duration {
        return new Duration(this.value + duration.value);
    }

    /** Subtracts the given {@link Duration} from a copy of this duration. */
    public sub(duration: Duration): Duration {
        return new Duration(this.value - duration.value);
    }

    /** Multiplies this {@link Duration} by the given factor. */
    public multiply(by: number): Duration {
        return new Duration(this.value * by);
    }

    /** Divides this {@link Duration} by the given factor. */
    public divide(by: number): Duration {
        return new Duration(this.value / by);
    }

    public equals(duration: unknown): boolean {
        return duration instanceof Duration
            && duration.value === this.value;
    }

    /**
     * Returns a string representation of this {@link Duration}, for example
     * `03:20:15.000`.
     * 
     * See {@link toUnitsString}() for a format like `2h54s`.
     * 
     * @param format The format to use. Is `dd:hh:mm:ss.000` by default
     * where `000` stands for the number of milliseconds. The number of repeated
     * characters indicates the number of leading zeroes.
     * Placeholders that evaluate to `0` are automatically omitted at the front
     * of the string.
     */
    public toString(format: string = 'dd:hh:mm:ss.000'): string {
        let result = format;
        let offset = 0;
        let isFirst = true;

        for (const match of format.matchAll(FORMAT_REGEX)) {
            const letter = match[0][0].toLowerCase();
            const length = match[0].length;
            let value: number;

            switch (letter) {
                case 'd': value = isFirst ? this.totalDays() : this.days(); break;
                case 'h': value = isFirst ? this.totalHours() : this.hours(); break;
                case 'm': value = isFirst ? this.totalMinutes() : this.minutes(); break;
                case 's': value = isFirst ? this.totalSeconds() : this.seconds(); break;
                case '0': value = isFirst ? this.totalMilliseconds() : this.milliseconds(); break;
                default: throw new Error('Invalid format.');
            }

            if (isFirst) {
                isFirst = false;
                value = Math.floor(value);
            }

            if (match.index == null) {
                throw new Error('Unknown error.');
            }

            const replacement = value.toFixed(0).padStart(length, '0');
            result = splice(result, match.index + offset, length, replacement);
            offset += replacement.length - length;
        }
        
        return result;
    }

    /** 
     * Returns a string representation of this {@link Duration}
     * in the format of `1w2d3h4m5s6ms` where empty components are
     * omitted.
     * 
     * @param spaces Sets the amount of whitespace after each unit
     * identifier. Default is `0`.
     */
    public toUnitsString(options: UnitsStringOptions = DEFAULT_UNITS_STRING_OPTIONS): string {
        const spacesString = ''.padEnd(options.spaces, '0');

        return [
            { unit: 'd', value: Math.floor(this.days()) },
            { unit: 'h', value: Math.floor(this.hours()) },
            { unit: 'm', value: Math.floor(this.minutes()) },
            { unit: 's', value: Math.floor(this.seconds()) },
            { unit: 'ms', value: options.includeMilliseconds ? Math.floor(this.milliseconds()) : 0 }
        ].reduce((string, component) => {
            if (component.value > 0) {
                return string + component.value + component.unit + spacesString;
            }

            return string;
         }, '');
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
