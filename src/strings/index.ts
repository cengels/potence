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
 * Replaces a segment of the string by cutting out a segment of the string
 * defined by `index` and `length`, and inserting `replaceWith` in its place
 * (if specified).
 */
export function splice(string: string, index: number, length: number, replaceWith: string = ''): string {
    return string.slice(0, index) + replaceWith + string.slice(index + length);
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
    let didStartWithToken: boolean = true;

    while (didStartWithToken) {
        didStartWithToken = false;

        for (const substring of what) {
            if (string.startsWith(substring)) {
                string = string.slice(substring.length);
                didStartWithToken = true;
                break;
            }
        }
    }

    return string;
}

/** Removes all of the given substrings from the end of the string. */
export function stripEnd(from: string, ...what: string[]): string {
    let string = from;
    let didStartWithToken: boolean = true;

    while (didStartWithToken) {
        didStartWithToken = false;

        for (const substring of what) {
            const index = string.lastIndexOf(substring);
    
            if (index === string.length - substring.length) {
                string = string.slice(0, index);
                didStartWithToken = true;
            }
        }
    }

    return string;
}

function findTokensAndUppercaseNext(source: string, token: string): string {
    let result = source;
    let tokenIndex = result.indexOf(token);

    while (tokenIndex !== -1) {
        result = result.slice(0, tokenIndex);

        if (result[tokenIndex + 1] != null) {
            result += result[tokenIndex + 1].toUpperCase();
        }

        result += result.slice(tokenIndex + 2);

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

/**
 * Returns the first {@link count} characters in the string.
 *
 * If {@link string} is shorter than {@link count}, returns the entire string.
 *
 * If {@link count} is negative, takes from the end of the string instead.
 */
export function take(string: string, count: number): string {
    return count >= 0 ? string.slice(0, count) : takeLast(string, -count);
}

/**
 * Returns the last {@link count} characters in the string.
 *
 * If {@link string} is shorter than {@link count}, returns the entire string.
 *
 * If {@link count} is negative, takes from the start of the string instead.
 */
export function takeLast(string: string, count: number): string {
    return count > 0 ? string.slice(-count) : take(string, -count);
}

/**
 * Skips the first {@link count} characters in the string and returns the rest.
 *
 * If {@link string} is shorter than {@link count}, returns an empty string.
 *
 * If {@link count} is negative, skips from the end of the string instead.
 */
export function skip(string: string, count: number): string {
    return count >= 0 ? string.slice(count) : skipLast(string, -count);
}

/**
 * Skips the last {@link count} characters in the string and returns the rest.
 *
 * If {@link string} is shorter than {@link count}, returns an empty string.
 *
 * If {@link count} is negative, skips from the start of the string instead.
 */
export function skipLast(string: string, count: number): string {
    return count > 0 ? string.slice(0, -count) : skip(string, -count);
}

/**
 * Returns all characters in the string before the first occurrence of {@link substring}.
 *
 * If {@link substring} is not part of the string, returns the entire string.
 */
export function takeUntil(string: string, substring: string): string {
    const index = string.indexOf(substring);

    if (index === -1) {
        return string;
    }

    return take(string, index);
}

/**
 * Returns all characters in the string before the first occurrence of {@link substring},
 * including {@link substring} itself.
 *
 * If {@link substring} is not part of the string, returns the entire string.
 */
export function takeUntilAfter(string: string, substring: string): string {
    const index = string.indexOf(substring);

    if (index === -1) {
        return string;
    }

    return take(string, index + substring.length);
}

/**
 * Returns all characters in the string before the last occurrence of {@link substring}.
 *
 * If {@link substring} is not part of the string, returns the entire string.
 */
export function takeUntilLast(string: string, substring: string): string {
    const index = string.lastIndexOf(substring);

    if (index === -1) {
        return string;
    }

    return take(string, index);
}

/**
 * Returns all characters in the string before the last occurrence of {@link substring},
 * including {@link substring} itself.
 *
 * If {@link substring} is not part of the string, returns the entire string.
 */
export function takeUntilAfterLast(string: string, substring: string): string {
    const index = string.lastIndexOf(substring);

    if (index === -1) {
        return string;
    }

    return take(string, index + substring.length);
}

/**
 * Returns all characters in the string after the first occurrence of {@link substring},
 * including {@link substring} itself.
 *
 * If {@link substring} is not part of the string, returns an empty string.
 */
export function skipUntil(string: string, substring: string): string {
    const index = string.indexOf(substring);

    if (index === -1) {
        return '';
    }

    return skip(string, index);
}

/**
 * Returns all characters in the string after the first occurrence of {@link substring}.
 *
 * If {@link substring} is not part of the string, returns an empty string.
 */
export function skipUntilAfter(string: string, substring: string): string {
    const index = string.indexOf(substring);

    if (index === -1) {
        return '';
    }

    return skip(string, index + substring.length);
}

/**
 * Returns all characters in the string after the last occurrence of {@link substring},
 * including {@link substring} itself.
 *
 * If {@link substring} is not part of the string, returns an empty string.
 */
export function skipUntilLast(string: string, substring: string): string {
    const index = string.lastIndexOf(substring);

    if (index === -1) {
        return '';
    }

    return skip(string, index);
}

/**
 * Returns all characters in the string after the last occurrence of {@link substring}.
 *
 * If {@link substring} is not part of the string, returns an empty string.
 */
export function skipUntilAfterLast(string: string, substring: string): string {
    const index = string.lastIndexOf(substring);

    if (index === -1) {
        return '';
    }

    return skip(string, index + substring.length);
}
