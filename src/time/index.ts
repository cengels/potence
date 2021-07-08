/**
 * Gets the time (in milliseconds) that passed since
 * the specified `Date` or millisecond timestamp.
 */
export function passed(since: Date | number): number {
    if (typeof since === 'number') {
        return Date.now() - since;
    }
    
    return Date.now() - since.getTime();
}

/** 
 * Returns true if at least the given time (in ms) has passed
 * since the specified `Date` or millisecond timestamp.
 */
export function hasPassed(since: Date | number, ms: number): boolean {
    return passed(since) >= ms;
}
