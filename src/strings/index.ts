/** Returns true if the string contains no characters. */
export function isEmpty(string: string): boolean {
    return string.length === 0;
}

/** Returns true if the string is empty or contains only whitespace. */
export function isWhitespace(string: string): boolean {
    return isEmpty(string.trim());
}

/**
 * Splits the string at the given indexes, returning a new array with the
 * newly formed substrings.
 * 
 * Note that surrogate pairs are not broken apart. Duplicate indexes
 * will be ignored, ensuring that the resulting array never contains
 * a zero-length segment.
 * 
 * @example
 * Strings.splitAt('bananas', 3, 5);  // -> ['ban', 'an', 'as']
 */
export function splitAt(string: string, ...indexes: number[]): string[] {
    let previousIndex: number = 0;

    const segments = indexes.sort((a, b) => a - b)
        .reduce<string[]>((array, index) => {
            if (index < 0) {
                throw new Error('Strings.splitAt(): indexes must be positive.');
            }

            const segment = string.slice(previousIndex, index);

            if (isEmpty(segment)) {
                return array;
            }

            previousIndex = index;

            return array.concat(segment);
    }, []);

    if (previousIndex < string.length) {
        segments.push(string.slice(previousIndex));
    }

    return segments;
}

/**
 * Removes all of the given substrings from the string.
 */
export function strip(from: string, ...what: string[]): string {
    let string = from;

    for (const substring of what) {
        // Previously this solution used string.replace(), but since you also had to
        // check string.includes() on every iteration, it wasn't as efficient.
        let index = string.indexOf(substring);

        while (index !== -1) {
            string = string.slice(0, index) + string.slice(index + substring.length);
            index = string.indexOf(substring);
        }
    }

    return string;
}

/** Removes all of the given substrings from the start of the string. */
export function stripStart(from: string, ...what: string[]): string {
    let string = from;

    for (const substring of what) {
        while (string.startsWith(substring)) {
            string = string.slice(substring.length);
        }
    }

    return string;
}

/** Removes all of the given substrings from the end of the string. */
export function stripEnd(from: string, ...what: string[]): string {
    let string = from;

    for (const substring of what) {
        let index = string.lastIndexOf(substring);

        while (index === string.length - substring.length) {
            string = string.slice(0, index);
            index = string.lastIndexOf(substring);
        }
    }

    return string;
}

/** 
 * Strips everything before the first or last occurrence of
 * the specified substring from the string.
 */
export function stripBefore(from: string, what: string, searchBackwards: boolean = false): string {
    const index = searchBackwards ? from.lastIndexOf(what) : from.indexOf(what);

    if (index === -1) {
        return from;
    }

    return from.slice(index + what.length);
}

/** 
 * Strips everything after the first or last occurrence of
 * the specified substring from the string.
 */
export function stripAfter(from: string, what: string, searchBackwards: boolean = false): string {
    const index = searchBackwards ? from.lastIndexOf(what) : from.indexOf(what);

    if (index === -1) {
        return from;
    }

    return from.slice(0, index);
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
    if (isEmpty(source) || source == null) {
        return '';
    }

    let result = source.toLowerCase();

    result = findTokensAndUppercaseNext(result, '_');
    result = findTokensAndUppercaseNext(result, '-');
    result = findTokensAndUppercaseNext(result, ' ');

    return result;
}

/** Converts a string to pascalCase from either snake_case, ALL_CAPS, hyphenated-case, or spaced text. */
export function pascalCase(source: string): string {
    return capitalize(camelCase(source));
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

/**
 * Capitalizes the first letter of the string.
 * Has no effect if the first character isn't a letter.
 */
export function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * If the first letter of the string is capitalized, uncapitalizes it.
 * Has no effect if the first character isn't a letter.
 */
export function uncapitalize(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
