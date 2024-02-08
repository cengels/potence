import { ObjectLiteral } from '../types.js';
import { hasFunction, isPrimitive } from './typechecking.js';

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
 * The symbol used to implement custom `Objects.stringify()` behaviour
 * for objects. See the {@link Stringifiable} interface.
 */
export const Stringify = Symbol('stringify');

/** 
 * Represents an object that has a custom {@link stringify}() implementation.
 * potence defines a default `stringify()` implementation for {@link Object},
 * {@link Array}, and {@link Function}. You can override these implementations
 * with your own by defining a new {@link Stringify} function on those types'
 * prototypes, or give your own types a custom {@link stringify}()
 * implementation by implementing this interface.
 * 
 * ### On `toString()`
 * Note that `toString()` is a default function of many objects and is used
 * to convert an object into a meaningful textual form that can be understood
 * by a user.
 * 
 * In contrast, the {@link Stringify} method is solely called by
 * {@link stringify}() and is primarily intended to convert types to debug
 * output that can be interpreted by a developer.
 */
export interface Stringifiable {
    [Stringify](options: StringifyOptions): string;
}

Object.defineProperty(Object.prototype, Stringify, { value: function(this: object, options: StringifyOptions) {
    const constructorName = typeof this === 'object' && this.constructor != null ? this.constructor.name : 'Object';

    if (options.typesOnly) {
        return constructorName;
    }

    let result: string = '';

    if (!options.hideClasses && constructorName !== 'Object' && constructorName !== 'Array') {
        result += constructorName + ' ';
    }

    if ((options.useToString ?? true) && this != null && typeof (this as ObjectLiteral)['toString'] === 'function') {
        const string = (this as { toString(): string }).toString() as string;

        if (!(string.startsWith('[object') && string.endsWith(']'))) {
            if (result.length === 0) {
                return string;
            }

            return result.concat(`{ ${string} }`);
        }
    }

    const entries = Object.entries(this as object);

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
} });

// eslint-disable-next-line @typescript-eslint/ban-types
Object.defineProperty(Function.prototype, Stringify, { value: function(this: Function, options: StringifyOptions) {
    if (options.typesOnly) {
        return 'function';
    }

    const string = this.toString();

    const openingBraceIndex = string.indexOf('{');
    const closingBraceIndex = openingBraceIndex === -1 ? -1 : string.indexOf('}');

    if (openingBraceIndex === -1 || closingBraceIndex === -1 || !string.includes('\n')) {
        return string;
    }

    return string.substring(0, openingBraceIndex) + '{ ... }';
} });

Object.defineProperty(Array.prototype, Stringify, { value: function(this: unknown[], options: StringifyOptions) {
    if (options.typesOnly) {
        const types = new Set(this.map(x => stringify(x, options)));

        if (types.size === 0) {
            types.add('unknown');
        }

        if (types.size === 1) {
            return `${[...types][0]}[]`;
        }

        return `(${[...types].join(' | ')})[]`;
    }

    const prefix = this.constructor !== Array && !options.hideClasses ? this.constructor.name : '';

    if (options.truncateContents === true && this.length !== 0) {
        return `${prefix}[...]`;
    }

    const stringifiedElements = truncateAfter(this,
        element => stringify(element, options),
        typeof options.truncateContents === 'number' ? options.truncateContents : undefined);

    return `${prefix}[${stringifiedElements.join(', ')}]`;
} });

/**
 * Converts an arbitrary value to string. See `StringifyOptions` for
 * information on how to customize this function.
 *
 * This function was primarily designed for the purposes of readable
 * and expressive debug output (for instance, the `assert` module
 * heavily utilizes it), but it can be used for other purposes as well.
 * 
 * If a type implements {@link Stringifiable} (which utilizes the
 * {@link Stringify} symbol), it will be used to convert that type
 * to a string representation here.
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

        return value.toString();
    }

    if (hasFunction(value, Stringify)) {
        return value[Stringify](options) as string;
    }

    return JSON.stringify(value);
}
