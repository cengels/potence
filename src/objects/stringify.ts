import { ObjectLiteral } from '../types.js';
import { isPrimitive } from './typechecking.js';

/** Options for `Strings.serialize()`. */
export interface StringifyOptions {
    /**
     * Whether the contents of arrays and objects should be truncated
     * and replaced with an ellipsis (`...`).
     *
     * You can also specify a number here to specify how many properties
     * or array elements you want to show before the remaining ones are
     * truncated.
     *
     * Default is `false`.
     */
    truncateContents?: boolean | number;
    /**
     * If true, stringify will only print the types, not their values.
     * For instance, the value `4` would be replaced by `number`.
     *
     * This property overrides `useToString`.
     *
     * Default is `false`.
     */
    typesOnly?: boolean;
    /**
     * Like `typesOnly`, except that this property affects only primitives.
     * Objects and arrays will be printed like normal.
     *
     * This property is overridden by `typesOnly`.
     *
     * Default is `false`.
     */
    primitiveTypesOnly?: boolean;
    /**
     * By default if a non-primitive (that is, an Object, Array, or Function)
     * is an instance of a non-standard class, its class name is printed before
     * the main expression. If this property is true, the class name will
     * be omitted even when the type is non-standard.
     *
     * This property is overridden by `typesOnly`.
     *
     * Default is `false`.
     */
    hideClasses?: boolean;
    /**
     * If true, this function uses a type's `toString()` function if and only if
     * it has a custom implementation, i.e. it does not return the standard
     * "`[object Type]`".
     *
     * This property is overridden by `typesOnly`.
     *
     * Default is `true`.
     */
    useToString?: boolean;
    /**
     * By default, stringify() adds double quotes to either side of natural
     * strings. This property removes those quotes.
     *
     * Default is `false`.
     */
    omitQuotes?: boolean;
    /**
     * If specified, this function will be called for every value that is to
     * be converted to string (i.e. the main value, all properties, and all
     * array elements).
     *
     * If the function returns a string, that string is used instead of the
     * default string conversion of stringify() for that value. If this function
     * returns `null`, the default string conversion is used instead. This
     * allows you to supply your own string converters selectively for
     * certain types.
     */
    replacer?: (value: unknown) => string | null;
}

const DEFAULT_OPTIONS: StringifyOptions = {};

function truncateAfter<T>(array: readonly T[], map: (item: T) => string, limit?: number): string[] {
    const strings: string[] = [];
    const length = limit != null && limit > array.length ? array.length : (limit ?? array.length);

    for (let i = 0; i < length; i++) {
        strings.push(map(array[i]));
    }

    if (strings.length < array.length) {
        strings.push('...');
    }

    return strings;
}

/**
 * Converts an arbitrary value to string. See `StringifyOptions` for
 * information on how to customize this function.
 *
 * This function was primarily developed for the purposes of readable
 * and expressive debug output (for instance, the `assert` module
 * heavily utilizes it), but it can be used for other purposes as well.
 */
export function stringify(value: unknown, options: StringifyOptions = DEFAULT_OPTIONS): string {
    const replacerResult = options.replacer?.(value);

    if (replacerResult != null) {
        return replacerResult;
    }

    if (value === null) {
        return 'null';
    }

    if (value === undefined) {
        return 'undefined';
    }

    if (isPrimitive(value)) {
        if (options.typesOnly || options.primitiveTypesOnly) {
            return typeof value;
        }

        if (typeof value === 'string') {
            return options.omitQuotes ? value : `"${value}"`;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return value!.toString();
    }

    if (typeof value === 'function') {
        if (options.typesOnly) {
            return 'function';
        }

        const string = value.toString();

        const openingBraceIndex = string.indexOf('{');
        const closingBraceIndex = openingBraceIndex === -1 ? -1 : string.indexOf('}');

        if (openingBraceIndex === -1 || closingBraceIndex === -1 || !string.includes('\n')) {
            return string;
        }

        return string.substring(0, openingBraceIndex) + '{ ... }';
    }

    const constructorName = typeof value === 'object' && value.constructor != null ? value.constructor.name : 'Object';

    if (options.typesOnly) {
        return constructorName;
    }

    let result: string = '';

    if (!options.hideClasses && constructorName !== 'Object' && constructorName !== 'Array') {
        result += constructorName + ' ';
    }

    if (Array.isArray(value)) {
        if (options.truncateContents === true && value.length !== 0) {
            return result.concat('[...]');
        }

        const stringifiedElements = truncateAfter(value,
            element => stringify(element, options),
            typeof options.truncateContents === 'number' ? options.truncateContents : undefined);

        return result.concat(`[${stringifiedElements.join(', ')}]`);
    }

    if ((options.useToString ?? true) && value != null && typeof (value as ObjectLiteral)['toString'] === 'function') {
        const string = (value as { toString(): string }).toString() as string;

        if (!(string.startsWith('[object') && string.endsWith(']'))) {
            if (result.length === 0) {
                return string;
            }

            return result.concat(`{ ${string} }`);
        }
    }

    const entries = Object.entries(value as object);

    if (entries.length === 0) {
        return '{}';
    }

    if (options.truncateContents === true) {
        return result.concat('{ ... }');
    }

    const stringifiedElements = truncateAfter(entries,
        element => `${element[0]}: ${stringify(element[1], options)}`,
        typeof options.truncateContents === 'number' ? options.truncateContents : undefined);

    return result.concat(`{ ${stringifiedElements.join(', ')} }`);
}
