/**
 * Removes all of the given characters from the string.
 * By default, removes all spaces from the string.
 */
export function strip(from: string, ...what: string[]): string {
    let string = from;

    if (what.length === 0) {
        what.push(' ');
    }

    for (const substring of what) {
        // Previously this solution used string.replace(), but since you also had to
        // check string.includes() on every iteration, it was only about half as fast.
        let index = string.indexOf(substring);

        while (index !== -1) {
            string = string.slice(0, index) + string.slice(index + substring.length);
            index = string.indexOf(substring);
        }
    }

    return string;
}
