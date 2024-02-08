import { describe, expect, it } from 'vitest';
import * as Objects from '../src/objects/index.js';
import { isEquatable, isIterable, isPrimitive } from '../src/objects/typechecking.js';
import { Structure } from '../src/objects/index.js';
import { array, arrayOf, instanceOf, nullish, number, oneOf, string } from '../src/fluent/matchers.js';

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

describe('Objects.isObject() should return', () => {
    describe('true for', () => {
        it('object literals', () => expect(Objects.isObject({ a: 1, b: 3 })).toBe(true));
        it('new Object()', () => expect(Objects.isObject(new Object())).toBe(true));
        it('new Number()', () => expect(Objects.isObject(new Number())).toBe(true));
        it('new String()', () => expect(Objects.isObject(new String())).toBe(true));
        it('new Function()', () => expect(Objects.isObject(new Function())).toBe(true));
        it('functions', () => expect(Objects.isObject(() => 0)).toBe(true));
        it('arrays', () => expect(Objects.isObject([])).toBe(true));
    });
    describe('false for', () => {
        it('Symbol()', () => expect(Objects.isObject(Symbol())).toBe(false));
        it('numbers', () => expect(Objects.isObject(1)).toBe(false));
        it('strings', () => expect(Objects.isObject('')).toBe(false));
        it('null', () => expect(Objects.isObject(null)).toBe(false));
        it('undefined', () => expect(Objects.isObject(undefined)).toBe(false));
    });
});

describe('Objects.isObjectLiteral() should return', () => {
    describe('true for', () => {
        it('object literals', () => expect(Objects.isObjectLiteral({ a: 1, b: 3 })).toBe(true));
        it('new Object()', () => expect(Objects.isObjectLiteral(new Object())).toBe(true));
    });
    describe('false for', () => {
        it('new Number()', () => expect(Objects.isObjectLiteral(new Number())).toBe(false));
        it('new String()', () => expect(Objects.isObjectLiteral(new String())).toBe(false));
        it('new Function()', () => expect(Objects.isObjectLiteral(new Function())).toBe(false));
        it('Symbol()', () => expect(Objects.isObjectLiteral(Symbol())).toBe(false));
        it('functions', () => expect(Objects.isObjectLiteral(() => 0)).toBe(false));
        it('arrays', () => expect(Objects.isObjectLiteral([])).toBe(false));
        it('numbers', () => expect(Objects.isObjectLiteral(1)).toBe(false));
        it('strings', () => expect(Objects.isObjectLiteral('')).toBe(false));
        it('null', () => expect(Objects.isObjectLiteral(null)).toBe(false));
        it('undefined', () => expect(Objects.isObjectLiteral(undefined)).toBe(false));
    });
});

describe('Objects.structure() should', () => {
    it('return false if object isn\'t an object', () => expect(Objects.structure(5 as unknown as object, {})).toBe(false));
    it('throw an error if the structure isn\'t an object', () => expect(() => Objects.structure({}, 5 as unknown as Structure)).toThrowError());
    it('throw an error if structure value isn\'t an object', () => expect(() => Objects.structure({}, { val: 5 as unknown as Structure[''] })).toThrowError());
    it('succeed in comparing an object against a simple structure', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                                   { a: number(), b: string() })).toBe(true));
    it('fail to compare an object against a non-matching simple structure', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                                           { a: number(), b: number() })).toBe(false));
    it('succeed if object has extraneous property', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                              { a: number() })).toBe(true));
    it('fail if object has extraneous property with flag', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                            { a: number() }, true)).toBe(false));
    it('fail to compare an object against a missing property', () => expect(Objects.structure({ a: 52 },
                                                                                              { a: number(), b: number() })).toBe(false));
    it('succeed if property is missing and expects undefined', () => expect(Objects.structure({ a: 52 },
                                                                                              { a: number(), b: oneOf(number(), nullish()) })).toBe(true));
    it('succeed when a property value is null', () => expect(Objects.structure({ a: null },
                                                                               { a: nullish() })).toBe(true));
    it('fail when a property value is null but expects undefined', () => expect(Objects.structure({ a: null },
                                                                                                  { a: value => value === undefined })).toBe(false));
    it('succeed when a property value is undefined', () => expect(Objects.structure({ a: undefined },
                                                                                    { a: nullish() })).toBe(true));
    it('fail when a property value is undefined but expects null', () => expect(Objects.structure({ a: undefined },
                                                                                                  { a: value => value === null })).toBe(false));
    it('succeed when comparing against multiple matching types', () => expect(Objects.structure({ a: 'foo' },
                                                                                                { a: oneOf(string(), number()) })).toBe(true));
    it('fail when comparing against multiple non-matching types', () => expect(Objects.structure({ a: null },
                                                                                                 { a: oneOf(string(), number()) })).toBe(false));
    it('succeed when comparing against a nullable property', () => expect(Objects.structure({ a: null },
                                                                                            { a: oneOf(string(), nullish()) })).toBe(true));
    it('succeed when comparing against a matching single-element array', () => expect(Objects.structure({ a: [5, 3, 2] },
                                                                                            { a: arrayOf(number()) })).toBe(true));
    it('fail when comparing against a non-matching single-element array', () => expect(Objects.structure({ a: [5, 'foo', 2] },
                                                                                            { a: arrayOf(number()) })).toBe(false));
    it('succeed in comparing an object against a nested structure', () => expect(Objects.structure({
            a: 52,
            b: {
                c: {
                    d: 'foo'
                }
            }
        },
        {
            a: number(),
            b: {
                c: {
                    d: string()
                }
            }
        })).toBe(true));
    it('fail in comparing an object against an incorrect nested structure', () => expect(Objects.structure({
            a: 52,
            b: {
                c: {
                    d: 'foo'
                }
            }
        },
        {
            a: number(),
            b: {
                c: {
                    c: string()
                }
            }
        })).toBe(false));
    it('succeed in comparing an object against contained arrays', () => expect(Objects.structure({
            a: ['foo']
        },
        {
            a: array()
        })).toBe(true));
    it('fail in comparing an object against non-contained arrays', () => expect(Objects.structure({
            a: { foo: 1 }
        },
        {
            a: array()
        })).toBe(false));
    it('succeed in comparing an object against constructors', () => expect(Objects.structure({
            a: new Date()
        },
        {
            a: instanceOf(Date)
        })).toBe(true));
    it('fail in comparing an object against incorrect constructors', () => expect(Objects.structure({
            a: new Number()
        },
        {
            a: instanceOf(Date)
        })).toBe(false));
    it('fail if structure property is an object and object property is not', () => expect(Objects.structure({
            a: 5
        },
        {
            a: { prop: number() }
        })).toBe(false));
});

describe('Objects.hasProperty() should', () => {
    const object = {
        value: 1,
        value2: 'foo',
        value3: new Date()
    };

    it('return true if the property exists', () => expect(Objects.hasProperty(object, 'value')).toBe(true));
    it('return true if the property exists but is null', () => expect(Objects.hasProperty({ prop: null }, 'prop')).toBe(true));
    it('return true if the property exists but is undefined', () => expect(Objects.hasProperty({ prop: undefined }, 'prop')).toBe(true));
    it('return true if the property has the right type', () => expect(Objects.hasProperty(object, 'value', 'number')).toBe(true));
    it('return true if the property has the right constructor', () => expect(Objects.hasProperty(object, 'value3', Date)).toBe(true));
    it('return true even if object is not an object', () => expect(Objects.hasProperty(5, 'constructor')).toBe(true));
    it('return false if the object is null', () => expect(Objects.hasProperty(null, 'val')).toBe(false));
    it('return false if the property does not exist', () => expect(Objects.hasProperty(object, 'value5')).toBe(false));
    it('return false if the property has the wrong type', () => expect(Objects.hasProperty(object, 'value', 'string')).toBe(false));
    it('return false if the property does not exist and has no type', () => expect(Objects.hasProperty(object, 'value5', 'string')).toBe(false));
    it('work on strings', () => expect(Objects.hasProperty('', 'indexOf')).toBe(true));
    it('work on number', () => expect(Objects.hasProperty(5, 'toPrecision')).toBe(true));
});

describe('Objects.hasFunction() should', () => {
    const object = {
        value: 1,
        func: () => { return 5; },
        func2: (one: number) => { return one; },
        func3: (one: number, two: string) => { return two + one; }
    };

    it('return true if the function exists', () => expect(Objects.hasFunction(object, 'func')).toBe(true));
    it('return true if the function has the right number of arguments (0)', () => expect(Objects.hasFunction(object, 'func', 0)).toBe(true));
    it('return true if the function has the right number of arguments (1)', () => expect(Objects.hasFunction(object, 'func2', 1)).toBe(true));
    it('return true if the function has the right number of arguments (2)', () => expect(Objects.hasFunction(object, 'func3', 2)).toBe(true));
    it('return true if the function exists on primitive type', () => expect(Objects.hasFunction(5, 'toString')).toBe(true));
    it('return false if the property is not a function', () => expect(Objects.hasFunction(object, 'value')).toBe(false));
    it('return false if the function does not exist', () => expect(Objects.hasFunction(object, 'func4')).toBe(false));
    it('return false if the function has the wrong number of arguments (too few)', () => expect(Objects.hasFunction(object, 'func', 2)).toBe(false));
    it('return false if the function has the wrong number of arguments (too many)', () => expect(Objects.hasFunction(object, 'func3', 0)).toBe(false));
    it('return false if the object is not an object', () => expect(Objects.hasFunction(null, 'valueOf')).toBe(false));
    it('work on strings', () => expect(Objects.hasFunction('', 'indexOf')).toBe(true));
    it('work on number', () => expect(Objects.hasFunction(5, 'toPrecision')).toBe(true));
});

describe('Objects.is() should', () => {
    it('succeed a proper typeof check', () => expect(Objects.is('foo', 'string')).toBe(true));
    it('fail an improper typeof check', () => expect(Objects.is('foo', 'number')).toBe(false));
    it('succeed a proper instanceof check', () => expect(Objects.is(new Date(), Date)).toBe(true));
    it('succeed a proper inherited instanceof check', () => expect(Objects.is(new Date(), Object)).toBe(true));
    it('fail an improper instanceof check', () => expect(Objects.is(new Date(), Number)).toBe(false));
});
