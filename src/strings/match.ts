import Placeholder from './Placeholder.js';
import { StringIterator } from './StringIterator.js';

export interface PatternMatchResult {
    /** 
     * Is true if the pattern successfully matched the source string
     * in its entirety.
     */
    matched: boolean;
    /**
     * An object literal containing all named matches. Note that the keys
     * can either be numbers or strings, depending on whether a number or
     * string was used in the pattern that was matched against. The value
     * will be a substring from the original string.
     * 
     * Like `unnamedMatches`, this property can contain a partial number
     * of matches even if `matched` is false.
     */
    matches: Record<string | number, string | number | undefined>;
    /**
     * Contains all unnamed matches (i.e. matches with the placeholder `{}`).
     * 
     * Like `matches`, this property can contain a partial number
     * of matches even if `matched` is false.
     */
    unnamedMatches: Array<string | number>;
}

/** 
 * Matches a string against a pattern using placeholders and returns the
 * matched substrings if they were found in the source string.
 * Especially useful for URL matching.
 * 
 * Note that this function does not use regular expressions and is therefore
 * faster than the plain `RegExp` variant, though also less flexible.
 * 
 * @example
 * match('https://www.myblog.com/blog/my-journeys/2018-05-21/paris',
 *              'https://www.{}.com/blog/{0}/{year%d}-{1%5}/{title}')
 * // returns:
 * {
 *     matched: true,
 *     matches: {
 *         0: 'my-journeys',
 *         year: 2018,  // %d matches only against numbers
 *         1: '05-21',  // %5 matches only against exactly 5 characters
 *         title: 'paris'
 *     },
 *     unnamedMatches: ['myblog']
 * }
 */
export function match(source: string, pattern: string): PatternMatchResult {
    const sourceIterator = new StringIterator(source);
    const patternIterator = new StringIterator(pattern);
    let placeholder: Placeholder  | undefined;
    const result: PatternMatchResult = { matched: false, matches: {}, unnamedMatches: [] };

    while (!patternIterator.isAtEnd() || placeholder != null) {
        const charsToPlaceholderStart = patternIterator.findNext('{');
        let segment: string;

        if (charsToPlaceholderStart === -1) {
            // No more placeholders found, match to the end of the pattern
            segment = patternIterator.toEnd();
        } else {
            segment = patternIterator.next(charsToPlaceholderStart);
            patternIterator.next();  // skip the opening bracket
        }

        if (placeholder != null) {
            // The last loop found a placeholder, so now we try to match
            // it against the source string.

            let rawMatch: string;

            if (segment.length !== 0) {
                const charsToSegmentStart = sourceIterator.findNext(segment);
    
                if (charsToSegmentStart === -1) {
                    return result;
                }

                rawMatch = sourceIterator.next(charsToSegmentStart);
            } else {
                // Means that the last placeholder was at the end
                // of the pattern, so we should also go to the end
                // of the source string.
                rawMatch = sourceIterator.toEnd();
            }

            const match = placeholder.match(rawMatch);

            if (match == null) {
                return result;
            }

            if (placeholder.name !== '') {
                if (result.matches[placeholder.name] != null) {
                    throw new Error('Duplicate placeholder name found. Please make sure each placeholder uses a unique (or no) name.');
                }

                result.matches[placeholder.name] = match;
            } else {
                result.unnamedMatches.push(match);
            }

            placeholder = undefined;
        }

        // If the segment is empty, the next placeholder immediately
        // follows the last one.
        if (segment.length !== 0) {
            if (sourceIterator.isAt(segment)) {
                sourceIterator.next(segment.length);
            } else {
                return result;
            }
        }

        if (!patternIterator.isAtEnd()) {
            const charsToPlaceholderEnd = patternIterator.findNext('}');

            if (charsToPlaceholderEnd === -1) {
                throw new Error('Found unclosed curly bracket.');
            }

            const placeholderString = patternIterator.next(charsToPlaceholderEnd);
            placeholder = new Placeholder(placeholderString);
            patternIterator.next();  // skip the closing bracket
        }
    }

    if (sourceIterator.isAtEnd()) {
        result.matched = true;
    }

    return result;
}
