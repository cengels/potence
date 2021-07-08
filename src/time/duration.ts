/** 
 * Converts the given milliseconds into seconds.
 */
 export function seconds(value: number): number {
    return value / 1000;
}

/** 
 * Converts the given milliseconds into minutes.
 */
export function minutes(value: number): number {
    return value / 60 / 1000;
}

/** 
 * Converts the given milliseconds into hours.
 */
export function hours(value: number): number {
    return value / 60 / 60 / 1000;
}

/** 
 * Converts the given milliseconds into days.
 */
export function days(value: number): number {
    return value / 24 / 60 / 60 / 1000;
}

/** 
 * Converts the given milliseconds into weeks.
 */
export function weeks(value: number): number {
    return value / 7 / 24 / 60 / 60 / 1000;
}

/** 
 * Converts the given seconds into a normalized duration of milliseconds.
 */
export function fromSeconds(value: number): number {
    return value * 1000;
}

/** 
 * Converts the given minutes into a normalized duration of milliseconds.
 */
export function fromMinutes(value: number): number {
    return value * 60 * 1000;
}

/** 
 * Converts the given hours into a normalized duration of milliseconds.
 */
export function fromHours(value: number): number {
    return value * 60 * 60 * 1000;
}

/** 
 * Converts the given days into a normalized duration of milliseconds.
 */
export function fromDays(value: number): number {
    return value * 24 * 60 * 60 * 1000;
}

/** 
 * Converts the given weeks into a normalized duration of milliseconds.
 */
export function fromWeeks(value: number): number {
    return value * 7 * 24 * 60 * 60 * 1000;
}
