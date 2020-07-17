/**
 * Removes all of the given characters from the string.
 * By default, removes all spaces from the string.
 */
export function strip(from: string, ...what: string[]): string {
    let string = from;

    for (const substring of what) {
        string = string.replace(substring, '');
    }

    return string;
}
