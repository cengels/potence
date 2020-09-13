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

function findTokensAndUppercaseNext(source: string, token: string): string {
    let result = source;
    let tokenIndex = result.indexOf(token);

    while (tokenIndex !== -1) {
        result = result.slice(0, tokenIndex) + result[tokenIndex + 1].toUpperCase() + result.slice(tokenIndex + 2);

        tokenIndex = result.indexOf(token);
    }

    return result;
}

/** Converts a string to camelCase from either snake_case, ALL_CAPS, hyphenated-case, or spaced text. */
export function camelCase(source: string): string {
    if (source === '' || source == null) {
        return '';
    }

    let result = source.toLowerCase();

    result = findTokensAndUppercaseNext(result, '_');
    result = findTokensAndUppercaseNext(result, '-');
    result = findTokensAndUppercaseNext(result, ' ');

    return result;
}

/** Prefixes the string with the specified prefix only if the string is not already prefixed with it. */
export function prefix(string: string, prefix: string): string {
    return string.startsWith(prefix) ? string : `${prefix}${string}`;
}

/** Suffixes the string with the specified prefix only if the string is not already suffixed with it. */
export function suffix(string: string, suffix: string): string {
    return string.endsWith(suffix) ? string : `${string}${suffix}`;
}

const urlRegEx = new RegExp('^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$', 'i');

/** Tests if the given string is a valid URL. */
export function isUrl(url: string): boolean {
    return urlRegEx.test(url);
}
