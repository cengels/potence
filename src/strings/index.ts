export { match } from './match.js';

/** Returns true if the string contains no characters. */
export function isEmpty(string: string): boolean {
    return string.length === 0;
}

/** 
 * Calls the specified callback function on every character in the string.
 * 
 * Note that this function is unicode-conform, that is it will not break
 * apart surrogate pairs during iteration.
 */
export function forEach(string: string, callback: (char: string, index: number, string: string) => void): void {
    let i: number = 0;

    for (const char of string) {
        callback(char, i, string);
        i++;
    }
}

/** 
 * Converts the string to a character array.
 * 
 * Note that the resulting array is unicode-conform, that is it will not break
 * apart surrogate pairs.
 */
export function chars(string: string): string[] {
    return Array.from(string);
}

/** 
 * Gets an array of all the code points in the string.
 * 
 * Note that the resulting array will contain all *individual* code points.
 * Surrogate pairs will be broken apart.
 */
export function codePoints(string: string): number[] {
    const array: number[] = [];
    let i: number = 0;
    let codePoint = string.codePointAt(i);
    
    for (; codePoint != null; i++, codePoint = string.codePointAt(i)) {
        array.push(codePoint);
    }

    return array;
}

/** Returns true if the string contains only whitespace. */
export function isWhitespace(string: string): boolean {
    return isEmpty(string.trim());
}

/** 
 * Tests whether a given string contains a number and nothing else.
 */
export function isNumber(potentialNumber: string): boolean {
    // Can't use parseInt()/parseFloat() here as they will
    // simply ignore all non-digits that follow other digits.
    // The non-number string '5e' would be considered a number.
    return typeof potentialNumber === 'string'
        && potentialNumber.length > 0
        && !Number.isNaN(Number(potentialNumber));
}

/**
 * Splits the string at the given indexes, returning a new array with the
 * newly formed substrings.
 * 
 * Note that the indexes must correspond to UTF-8 code points and must not
 * result in a zero-length segment (i.e. no index of 0 or string.length,
 * and no duplicate indexes).
 * 
 * @example
 * Strings.splitAt('bananas', 3, 5);  // -> ['ban', 'an', 'as']
 */
export function splitAt(string: string, ...indexes: number[]): string[] {
    let previousIndex: number = 0;

    return indexes.sort((a, b) => a - b)
        .map(index => {
            const segment = string.slice(previousIndex, index);

            if (isEmpty(segment)) {
                throw new Error(`Can't split string at index ${index}. Resulting substring would be empty.`);
            }

            previousIndex = index;

            return segment;
    });
}

/**
 * Removes all of the given substrings from the string.
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

/** Converts a string to pascalCase from either snake_case, ALL_CAPS, or hyphenated-case. */
export function pascalCase(source: string): string {
    if (source === '' || source == null) {
        return '';
    }

    let result = source.toLowerCase();

    result = result[0].toLowerCase() + result.slice(1);

    let tokenIndex = result.indexOf('_');

    while (tokenIndex !== -1) {
        result = result.slice(0, tokenIndex) + result[tokenIndex + 1].toUpperCase() + result.slice(tokenIndex + 2);

        tokenIndex = result.indexOf('_');
    }

    tokenIndex = result.indexOf('-');

    while (tokenIndex !== -1) {
        result = result.slice(0, tokenIndex) + result[tokenIndex + 1].toUpperCase() + result.slice(tokenIndex + 2);

        tokenIndex = result.indexOf('-');
    }

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
