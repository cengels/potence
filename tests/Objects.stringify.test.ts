import { describe, expect, it } from 'vitest';
import { stringify, StringifyOptions } from '../src/objects/index.js';

describe('Objects.stringify() should', () => {
    describe('for numbers', () => {
        it('do a simple string conversion', () => expect(stringify(0)).toBe('0'));
        it('do a simple float to string conversion', () => expect(stringify(0.005325)).toBe('0.005325'));
        it('use scientific notation', () => expect(stringify(0.0000001)).toBe('1e-7'));
        it('show type if typesOnly is true', () => expect(stringify(0, { typesOnly: true })).toBe('number'));
        it('show type if primitiveTypesOnly is true',
            () => expect(stringify(0, { primitiveTypesOnly: true })).toBe('number'));
        it('show type if typesOnly and primitiveTypesOnly is true',
            () => expect(stringify(0, { primitiveTypesOnly: true, typesOnly: true })).toBe('number'));
        it('remain unaffected by truncateContents, hideClasses, useToString, and omitQuotes',
            () => expect(stringify(0, { truncateContents: true, hideClasses: true, useToString: false, omitQuotes: true })).toBe('0'));
    });

    describe('for strings', () => {
        it('print the string with quotes', () => expect(stringify('hello')).toBe('"hello"'));
        it('print the string without quotes', () => expect(stringify('hello', { omitQuotes: true })).toBe('hello'));
        it('show type if typesOnly is true', () => expect(stringify('hello', { typesOnly: true })).toBe('string'));
        it('show type if primitiveTypesOnly is true',
            () => expect(stringify('hello', { primitiveTypesOnly: true })).toBe('string'));
        it('show type if typesOnly and primitiveTypesOnly is true',
            () => expect(stringify('hello', { primitiveTypesOnly: true, typesOnly: true })).toBe('string'));
        it('remain unaffected by truncateContents, hideClasses, and useToString',
            () => expect(stringify('hello', { truncateContents: true, hideClasses: true, useToString: false })).toBe('"hello"'));
    });

    describe('for booleans', () => {
        it('print the boolean normally', () => expect(stringify(false)).toBe('false'));
        it('show type if typesOnly is true', () => expect(stringify(false, { typesOnly: true })).toBe('boolean'));
        it('show type if primitiveTypesOnly is true',
            () => expect(stringify(true, { primitiveTypesOnly: true })).toBe('boolean'));
        it('show type if typesOnly and primitiveTypesOnly is true',
            () => expect(stringify(false, { primitiveTypesOnly: true, typesOnly: true })).toBe('boolean'));
        it('remain unaffected by truncateContents, hideClasses, useToString, and omitQuotes',
            () => expect(stringify(true, { truncateContents: true, hideClasses: true, useToString: false, omitQuotes: true })).toBe('true'));
    });

    describe('for null and undefined', () => {
        it('print null normally', () => expect(stringify(null)).toBe('null'));
        it('print undefined normally', () => expect(stringify(undefined)).toBe('undefined'));
        it('print null normally with typesOnly', () => expect(stringify(null, { typesOnly: true })).toBe('null'));
        it('print undefined normally with typesOnly', () => expect(stringify(undefined, { typesOnly: true })).toBe('undefined'));
        it('print it normally with primitiveTypesOnly',
            () => expect(stringify(null, { primitiveTypesOnly: true })).toBe('null'));
    });

    describe('for symbols', () => {
        it('print an unnamed symbol normally', () => expect(stringify(Symbol())).toBe('Symbol()'));
        it('print a named symbol normally', () => expect(stringify(Symbol('sym'))).toBe('Symbol(sym)'));
        it('show type if typesOnly is true', () => expect(stringify(Symbol(), { typesOnly: true })).toBe('symbol'));
        it('show type if primitiveTypesOnly is true',
            () => expect(stringify(Symbol(), { primitiveTypesOnly: true })).toBe('symbol'));
        it('remain unaffected by truncateContents, hideClasses, useToString, and omitQuotes',
            () => expect(stringify(Symbol(), { truncateContents: true, hideClasses: true, useToString: false, omitQuotes: true })).toBe('Symbol()'));
    });

    describe('for functions', () => {
        it('print a simple arrow function', () => expect(stringify(() => 5)).toBe('() => 5'));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        it('print a long arrow function', () => expect(stringify((arg1: number, arg2: string) => 5)).toBe('(arg1, arg2) => 5'));
        it('print a non-arrow function',
            () => expect(stringify(function() { return 5; })).toBe('function() { ... }'));
        it('print a long non-arrow function',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            () => expect(stringify(function(var1: object, var2: undefined) { return 5; })).toBe('function(var1, var2) { ... }'));
        it('print a named non-arrow function',
            () => expect(stringify(function foo() { return 5; })).toBe('function foo() { ... }'));
        it('truncate a multi-line function body', () => expect(stringify(() => {
            return 5;
        })).toBe('() => { ... }'));
        it('do not truncate a multi-line function signature', () => expect(stringify(() =>
            5)).toBe('() => 5'));
        it('show type if typesOnly is true', () => expect(stringify(() => 5, { typesOnly: true })).toBe('function'));
        it('don\'t show type if primitiveTypesOnly is true', () => expect(stringify(() => 5, { primitiveTypesOnly: true })).toBe('() => 5'));
        // Depending on the build system, async functions are translated into
        // polyfill variants that do not inherit from AsyncFunction. However,
        // normally it would print like async () => ... as well.
    });

    describe('for arrays', () => {
        it('print empty array', () => expect(stringify([])).toBe('[]'));
        it('print empty array with empty strings and omitQuotes',
            () => expect(stringify([''], { omitQuotes: true })).toBe('[]'));
        it('print non-empty array', () => expect(stringify([1, 2, 3])).toBe('[1, 2, 3]'));
        it('truncate contents',
            () => expect(stringify([1, 2, 3], { truncateContents: true })).toBe('[...]'));
        it('don\'t truncate contents of empty arrays',
            () => expect(stringify([], { truncateContents: true })).toBe('[]'));
        it('truncate contents after n',
            () => expect(stringify([1, 2, 3], { truncateContents: 2 })).toBe('[1, 2, ...]'));
        it('don\'t truncate contents if limit is greater than array.length',
            () => expect(stringify([1, 2, 3], { truncateContents: 5})).toBe('[1, 2, 3]'));
        it('print strings with quotes',
            () => expect(stringify(['hello', 'hello2'])).toBe('["hello", "hello2"]'));
        it('print strings without quotes',
            () => expect(stringify(['hello', 'hello2'], { omitQuotes: true })).toBe('[hello, hello2]'));
        it('print type with typesOnly',
            () => expect(stringify(['hello', 'hello2'], { typesOnly: true })).toBe('string[]'));
        it('print multiple types with typesOnly',
            () => expect(stringify(['hello', 5, new Date()], { typesOnly: true })).toBe('(string | number | Date)[]'));
        it('print unknown with typesOnly',
            () => expect(stringify([], { typesOnly: true })).toBe('unknown[]'));
        it('print types of contents with primitiveTypesOnly',
            () => expect(stringify(['hello', 'hello2'], { primitiveTypesOnly: true })).toBe('[string, string]'));
        it('print custom array with prefix',
        () => {
            const customArray = new (class CustomArray extends Array {})();
            customArray.push(5);

            return expect(stringify(customArray)).toBe('CustomArray[5]');
        });
        it('print custom array without prefix if hideClasses is true',
        () => {
            const customArray = new (class CustomArray extends Array {})();
            customArray.push(5);

            return expect(stringify(customArray, { hideClasses: true })).toBe('[5]');
        });
    });

    describe('for objects', () => {
        it('print empty object', () => expect(stringify({})).toBe('{}'));
        it('print non-empty object with 1 prop', () => expect(stringify({ prop: 5 })).toBe('{ prop: 5 }'));
        it('print non-empty object with 2 props', () => expect(stringify({ prop: 5, prop2: 'hello' })).toBe('{ prop: 5, prop2: "hello" }'));
        it('truncate contents',
            () => expect(stringify({ prop: 5 }, { truncateContents: true })).toBe('{ ... }'));
        it('don\'t truncate contents of empty objects',
            () => expect(stringify({}, { truncateContents: true })).toBe('{}'));
        it('truncate contents after n',
            () => expect(stringify({ prop: 5, prop2: 6 }, { truncateContents: 1 })).toBe('{ prop: 5, ... }'));
        it('print strings without quotes',
            () => expect(stringify({ prop: 'noquotes' }, { omitQuotes: true })).toBe('{ prop: noquotes }'));
        it('print type with typesOnly',
            () => expect(stringify({}, { typesOnly: true })).toBe('Object'));
        it('print types of contents with primitiveTypesOnly',
            () => expect(stringify({ prop: 'i am a string' }, { primitiveTypesOnly: true })).toBe('{ prop: string }'));
        it('work with Object.create(null)',
            () => expect(stringify(Object.create(null))).toBe('{}'));
    });

    describe('for classes', () => {
        class CustomClass {
            public prop = 5;

            public toString(): string {
                return `${this.prop}er string`;
            }
        }

        const instance = new CustomClass();

        it('use object\'s toString method', () => expect(stringify(instance)).toBe('CustomClass { 5er string }'));
        it('be unaffected of truncateContents', () => expect(stringify(instance, { truncateContents: true })).toBe('CustomClass { 5er string }'));
        it('omit class with hideClasses', () => expect(stringify(instance, { hideClasses: true })).toBe('5er string'));
        it('truncate with useToString: false',
            () => expect(stringify(instance, { useToString: false, truncateContents: true })).toBe('CustomClass { ... }'));
        it('print properties with useToString: false',
            () => expect(stringify(instance, { useToString: false })).toBe('CustomClass { prop: 5 }'));
    });

    describe('use replacer function', () => {
        const options: StringifyOptions = {
            replacer(item: unknown): string | null {
                if (typeof item === 'number') {
                    return item + '0000';
                }

                return null;
            }
        }

        it('use replacer on single values', () => expect(stringify(5, options)).toBe('50000'));
        it('don\'t use replacer if it returns null', () => expect(stringify('hello', options)).toBe('"hello"'));
        it('use replacer on every array value',
            () => expect(stringify([1, 2, 'hello'], options)).toBe('[10000, 20000, "hello"]'));
        it('use replacer on every object value',
            () => expect(stringify({ prop: 5, prop2: 6, prop3: 'hello' }, options)).toBe('{ prop: 50000, prop2: 60000, prop3: "hello" }'));
    });
});
