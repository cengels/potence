import * as Objects from '../src/objects/index.js';

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
    it('return true if both objects are null', () => expect(Objects.compare(null, null)).toBe(true));
    it('return false if one object is null and the other undefined', () => expect(Objects.compare(null, undefined)).toBe(false));
    it('return true if they are the same non-object', () => expect(Objects.compare(5, 5)).toBe(true));
    it('return false if they are not objects and not identical', () => expect(Objects.compare(5, '5')).toBe(false));
    it('return false if object2 has more keys than object1', () => expect(Objects.compare({ a: 2 }, { a: 2, b: 1 })).toBe(false));
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
    // @ts-expect-error
    it('throw an error if the passed objects aren\'t literals', () => expect(() => Objects.structure(new Number(), {})).toThrowError());
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
    it('fail in comparing an object against an incorrect nested structure', () => expect(Objects.structure({
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
                    c: 'string'
                }
            }
        })).toBe(false));
    it('succeed in comparing an object against contained arrays', () => expect(Objects.structure({
            a: ['foo']
        },
        {
            a: 'array'
        })).toBe(true));
    it('fail in comparing an object against non-contained arrays', () => expect(Objects.structure({
            a: { foo: 1 }
        },
        {
            a: 'array'
        })).toBe(false));
    it('succeed in comparing an object against constructors', () => expect(Objects.structure({
            a: new Date()
        },
        {
            a: Date
        })).toBe(true));
    it('fail in comparing an object against incorrect constructors', () => expect(Objects.structure({
            a: new Number()
        },
        {
            a: Date
        })).toBe(false));
    it('fail if the expected structure uses an incorrect type', () => expect(Objects.structure({
            a: [ 'foo' ]
        },
        {
            // @ts-expect-error
            a: [ 'foo' ]
        })).toBe(false));
});

describe('Objects.swap() should', () => {
    it('properly swap the object', () => expect(Objects.swap({ x: 5, y: 2 }, 'x', 'y')).toStrictEqual({ x: 2, y: 5 }));
});

describe('Objects.equals() should return', () => {
    function t(value: unknown) {
        return {
            value,
            equals(other: unknown): boolean {
                return other != null && Objects.isObject(other) && other.value === value;
            }
        }
    }

    it('true if two numbers are the same', () => expect(Objects.equals(5, 5)).toBe(true));
    it('true if two strings are the same', () => expect(Objects.equals('foo', 'foo')).toBe(true));
    it('false if both objects are not the same', () => expect(Objects.equals(5, '5')).toBe(false));
    it('true if a.equals(b) is true', () => expect(Objects.equals(t(5), t(5))).toBe(true));
    it('false if a.equals(b) is false', () => expect(Objects.equals(t(5), t(6))).toBe(false));
    it('true if all objects return equals() === true', () => expect(Objects.equals(t(5), t(5), t(5))).toBe(true));
    it('false if some objects return equals() === false', () => expect(Objects.equals(t(5), t(5), t(6))).toBe(false));
});

describe('Objects.equatable() should', () => {
    // @ts-expect-error
    it('throw on unextensible objects (like numbers)', () => expect(() => Objects.equatable(5)).toThrowError());
    // @ts-expect-error
    it('throw on unextensible objects (like strings)', () => expect(() => Objects.equatable('5')).toThrowError());
    it('augment with an equals function', () => {
        const equatable = Objects.equatable({ value: 5 });

        expect(equatable.value).toBe(5);
        expect(typeof equatable.equals === 'function').toBe(true);
    });
    it('iterate over all properties in the equals function', () => {
        const equatable1 = Objects.equatable({ value1: 5, value2: 'foo', value3: 'bar' });
        const other = { value1: 5, value2: 'foo', value3: 'bar' };

        expect(equatable1.equals(other)).toBe(true);
        equatable1.value3 = 'baz';
        expect(equatable1.equals(other)).toBe(false);
        equatable1.value3 = 'bar';
        expect(equatable1.equals(other)).toBe(true);
        equatable1.value2 = 'bar';
        expect(equatable1.equals(other)).toBe(false);
    });
});
