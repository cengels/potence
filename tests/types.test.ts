import { isEquatable, isIterable, isPrimitive } from '../src/types';
import TypeTester from './TypeTester.js';

describe('isPrimitive() should return', () => {
    it('true on strings', () => expect(isPrimitive('string')).toBe(true));
    it('true on numbers', () => expect(isPrimitive(5)).toBe(true));
    it('true on bigints', () => expect(isPrimitive(BigInt(5))).toBe(true));
    it('true on booleans', () => expect(isPrimitive(false)).toBe(true));
    it('true on undefined', () => expect(isPrimitive(undefined)).toBe(true));
    it('true on symbols', () => expect(isPrimitive(Symbol())).toBe(true));
    it('false on null', () => expect(isPrimitive(null)).toBe(false));
    it('false on objects', () => expect(isPrimitive({})).toBe(false));
    it('false on arrays', () => expect(isPrimitive([])).toBe(false));
    it('false on functions', () => expect(isPrimitive(() => undefined)).toBe(false));
});

describe('isEquatable() should return', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    it('true when object has equals method', () => expect(isEquatable({ equals: (object: unknown) => true })).toBe(true));
    it('false when object has equals method without arguments', () => expect(isEquatable({ equals: () => true })).toBe(false));
    it('false when object has a non-function equals property', () => expect(isEquatable({ equals: 'string' })).toBe(false));
    it('false when object has no equals property', () => expect(isEquatable({ })).toBe(false));
});

describe('isIterable() should return', () => {
    it('true for Arrays', () => expect(isIterable([1, 2, 3])).toBe(true));
    it('true for Sets', () => expect(isIterable(new Set([1, 2, 3]))).toBe(true));
    it('true for Maps', () => expect(isIterable(new Map([['key', 1]]))).toBe(true));
    it('true for strings', () => expect(isIterable('123')).toBe(true));
    it('true for TypedArrays', () => expect(isIterable(new Uint8Array([1, 2, 3]))).toBe(true));
});

describe('Iterable should', () => {
    const tester = new TypeTester();

    tester.import('Iterable').from('./src/types');
    tester.write(`
        function sum(iterable: Iterable<number>): number {
            let sum: number = 0;

            for (const item of iterable) {
                sum += item;
            }

            return sum;
        }
    `);

    it('not throw error on array with correct type', () => tester.expect('sum([0, 1, 2])').toNotThrowError());
    it('throw error on array with incorrect type', () => tester.expect('sum([0, "hello", 2])').toThrowError());
    it('not throw error on set', () => tester.expect('sum(new Set([0, 1, 2]))').toNotThrowError());
});

describe('Truthy<T> should', () => {
    const tester = new TypeTester();

    tester.import('Truthy').from('./src/types');

    it('properly infer the type of Truthy<boolean>', () => tester.expectType('Truthy<boolean>').toResolveTo('true'));
    it('be unable to narrow Truthy<number>', () => tester.expectType('Truthy<number>').toResolveTo('number'));
    it('be unable to narrow Truthy<bigint>', () => tester.expectType('Truthy<bigint>').toResolveTo('bigint'));
    it('be unable to narrow Truthy<string>', () => tester.expectType('Truthy<string>').toResolveTo('string'));
    it('return never for Truthy<null | undefined>', () => tester.expectType('Truthy<null | undefined>').toResolveTo('never'));
    it('return never for Truthy<null>', () => tester.expectType('Truthy<null>').toResolveTo('never'));
    it('return never for Truthy<undefined>', () => tester.expectType('Truthy<undefined>').toResolveTo('never'));
    it('properly infer the type of nullable types', () => tester.expectType('Truthy<Date | null>').toResolveTo('Date'));
    it('do nothing for types that are always truthy (instances)', () => tester.expectType('Truthy<Date>').toResolveTo('Date'));
    it('do nothing for types that are always truthy (objects)', () => tester.expectType('Truthy<{}>').toResolveTo('{}'));
    it('be unable to narrow Truthy<unknown>', () => tester.expectType('Truthy<unknown>').toResolveTo('unknown'));
    it('return any if type is any', () => tester.expectType('Truthy<any>').toResolveTo('any'));
    it('properly segregate generic union types', () => tester.expectType('Truthy<number | string>').toResolveTo('number | string'));
    it('properly segregate literal union types', () => tester.expectType('Truthy<0 | 5 | 2 | "five" | "">').toResolveTo('5 | 2 | "five"'));
    it('return never for non-matching literal types', () => tester.expectType('Truthy<0>').toResolveTo('never'));
    it('return never for non-matching literal unions', () => tester.expectType('Truthy<0 | "">').toResolveTo('never'));
    it('return never for -0', () => tester.expectType('Truthy<-0>').toResolveTo('never'));
});

describe('Falsy<T> should', () => {
    const tester = new TypeTester();

    tester.import('Falsy').from('./src/types');

    it('properly infer the type of Falsy<boolean>', () => tester.expectType('Falsy<boolean>').toResolveTo('false'));
    it('properly infer the type of Falsy<number>', () => tester.expectType('Falsy<number>').toResolveTo('0'));
    it('properly infer the type of Falsy<bigint>', () => tester.expectType('Falsy<bigint>').toResolveTo('0n'));
    it('properly infer the type of Falsy<string>', () => tester.expectType('Falsy<string>').toResolveTo('""'));
    it('properly infer the type of Falsy<null | undefined>', () => tester.expectType('Falsy<null | undefined>').toResolveTo('null | undefined'));
    it('properly infer the type of Falsy<null>', () => tester.expectType('Falsy<null>').toResolveTo('null'));
    it('properly infer the type of Falsy<undefined>', () => tester.expectType('Falsy<undefined>').toResolveTo('undefined'));
    it('properly infer the type of nullable types', () => tester.expectType('Falsy<Date | null>').toResolveTo('null'));
    it('return never for types that can never be falsy (instances)', () => tester.expectType('Falsy<Date>').toResolveTo('never'));
    it('return never for types that can never be falsy (objects)', () => tester.expectType('Falsy<{}>').toResolveTo('never'));
    it('return all falsy types if type is unknown', () => tester.expectType('Falsy<unknown>').toResolveTo('false | 0 | 0n | "" | null | undefined'));
    it('return all falsy types if no generic is specified', () => tester.expectType('Falsy').toResolveTo('false | 0 | 0n | "" | null | undefined'));
    it('return any if type is any', () => tester.expectType('Falsy<any>').toResolveTo('any'));
    it('properly segregate generic union types', () => tester.expectType('Falsy<number | string>').toResolveTo('0 | ""'));
    it('properly segregate literal union types', () => tester.expectType('Falsy<0 | 5 | 2 | "five" | "">').toResolveTo('0 | ""'));
    it('return never for non-matching literal types', () => tester.expectType('Falsy<5>').toResolveTo('never'));
    it('return never for non-matching literal unions', () => tester.expectType('Falsy<5 | 2 | "five">').toResolveTo('never'));
    it('keep -0', () => tester.expectType('Falsy<-0>').toResolveTo('0'));
});
