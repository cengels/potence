import * as Objects from '../src/objects';

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

describe('Objects.compare() should', () => {
    describe('for a shallow comparison', () => {
        it('succeed in comparing an equivalent object', () => expect(Objects.compare({ a: 1, b: 3 }, { a: 1, b: 3 })).toBe(true));
        it('fail to compare a non-equivalent object', () => expect(Objects.compare({ a: 1, b: 3 }, { a: 1, b: 4 })).toBe(false));
        it('fail to compare a nested object', () => expect(Objects.compare({ a: 1, b: { one: 1 } }, { a: 1, b: { one: 1 } })).toBe(false));
    });
    describe('for a deep comparison', () => {
        it('succeed in comparing an equivalent nested object', () => expect(Objects.compare({ a: { b: 1 } }, { a: { b: 1 } }, 'deep')).toBe(true));
        it('fail to comparing a non-equivalent nested object', () => expect(Objects.compare({ a: { b: 1 } }, { a: { b: 2 } }, 'deep')).toBe(false));
    });
});

describe('Objects.structure() should', () => {
    it('succeed in comparing an object against a simple structure', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                                   { a: 'number', b: 'string' })).toBe(true));
    it('fail to compare an object against a non-matching simple structure', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                                           { a: 'number', b: 'number' })).toBe(false));
    it('fail to compare an object against a missing property', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                              { a: 'number' })).toBe(false));
    it('succeed in comparing an object against a nested structure', () => expect(Objects.structure({
            a: 52,
            b: {
                c: {
                    d: 'foo'
                }
            }
        },
        {
            a: 'number',
            b: {
                c: {
                    d: 'string'
                }
            }
        })).toBe(true));
    it('succeed in comparing an object against contained arrays', () => expect(Objects.structure({
            a: ['foo']
        },
        {
            a: 'array'
        })).toBe(true));
    it('succeed in comparing an object against constructors', () => expect(Objects.structure({
            a: new Date()
        },
        {
            a: Date
        })).toBe(true));
});
