import * as Objects from '../src/objects/index.js';
import { Structure } from '../src/types.js';

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
    it('return false if object isn\'t an object', () => expect(Objects.structure(5 as unknown as object, {})).toBe(false));
    it('throw an error if the structure isn\'t an object', () => expect(() => Objects.structure({}, 5 as unknown as Structure)).toThrowError());
    it('succeed in comparing an object against a simple structure', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                                   { a: 'number', b: 'string' })).toBe(true));
    it('fail to compare an object against a non-matching simple structure', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                                           { a: 'number', b: 'number' })).toBe(false));
    it('succeed if object has extraneous property', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                              { a: 'number' })).toBe(true));
    it('fail if object has extraneous property with flag', () => expect(Objects.structure({ a: 52, b: 'foo' },
                                                                                            { a: 'number' }, true)).toBe(false));
    it('fail to compare an object against a missing property', () => expect(Objects.structure({ a: 52 },
                                                                                              { a: 'number', b: 'number' })).toBe(false));
    it('succeed if property is missing and expects undefined', () => expect(Objects.structure({ a: 52 },
                                                                                              { a: 'number', b: ['number', 'undefined'] })).toBe(true));
    it('succeed when a property value is null', () => expect(Objects.structure({ a: null },
                                                                               { a: 'null' })).toBe(true));
    it('fail when a property value is null but expects undefined', () => expect(Objects.structure({ a: null },
                                                                                                  { a: 'undefined' })).toBe(false));
    it('succeed when a property value is undefined', () => expect(Objects.structure({ a: undefined },
                                                                                    { a: 'undefined' })).toBe(true));
    it('fail when a property value is undefined but expects null', () => expect(Objects.structure({ a: undefined },
                                                                                                  { a: 'null' })).toBe(false));
    it('succeed when comparing against multiple matching types', () => expect(Objects.structure({ a: 'foo' },
                                                                                                { a: ['string', 'number'] })).toBe(true));
    it('fail when comparing against multiple non-matching types', () => expect(Objects.structure({ a: null },
                                                                                                 { a: ['string', 'number'] })).toBe(false));
    it('succeed when comparing against a nullable property', () => expect(Objects.structure({ a: null },
                                                                                            { a: ['string', 'null'] })).toBe(true));
    it('succeed when comparing against a matching single-element array', () => expect(Objects.structure({ a: [5, 3, 2] },
                                                                                            { a: ['number'] })).toBe(true));
    it('fail when comparing against a non-matching single-element array', () => expect(Objects.structure({ a: [5, 'foo', 2] },
                                                                                            { a: ['number'] })).toBe(false));
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
    it('fail if structure property is an object and object property is not', () => expect(Objects.structure({
            a: 5
        },
        {
            a: { prop: 'number' }
        })).toBe(false));
    it('throw if structure has empty array', () => expect(() => Objects.structure({
            a: 5
        },
        {
            a: []
        })).toThrowError());
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

    it('true if two numbers are the same', () => expect(Objects.equal(5, 5)).toBe(true));
    it('true if two strings are the same', () => expect(Objects.equal('foo', 'foo')).toBe(true));
    it('false if two arrays contain the same elements', () => expect(Objects.equal(['a', 'b'], ['a', 'b'])).toBe(false));
    it('false if two objects contain the same key-values', () => expect(Objects.equal({ a: 'b' }, { a: 'b' })).toBe(false));
    it('false if both objects are not the same', () => expect(Objects.equal(5, '5')).toBe(false));
    it('true if a.equals(b) is true', () => expect(Objects.equal(t(5), t(5))).toBe(true));
    it('false if a.equals(b) is false', () => expect(Objects.equal(t(5), t(6))).toBe(false));
    it('true if all objects return equals() === true', () => expect(Objects.equal(t(5), t(5), t(5))).toBe(true));
    it('false if some objects return equals() === false', () => expect(Objects.equal(t(5), t(5), t(6))).toBe(false));
});

describe('Objects.equatable() should', () => {
    // @ts-expect-error
    it('throw on unextensible objects (like numbers)', () => expect(() => Objects.equatable(5)).toThrowError());
    // @ts-expect-error
    it('throw on unextensible objects (like strings)', () => expect(() => Objects.equatable('5')).toThrowError());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    it('do nothing if object already contains function equals', () => expect(Objects.equatable({ equals: (val: unknown) => true }).equals(5)).toBe(true));
    it('throw error if object already contains property equals', () => expect(() => Objects.equatable({ equals: '' })).toThrowError());
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

const colors = {
    red: 0xff0000,
    yellow: 0xffff00,
    green: 0x00ff00,
    blue: 0x0000ff,
    purple: 0xff00ff,
    cyan: 0x00ffff
};

describe('Objects.map() should', () => {
    it('map each value to another value', () => {
        const stringColors = Objects.map(colors, color => color.toString(16).padStart(6, '0'));

        expect(stringColors).not.toBe(colors);

        expect(stringColors).toEqual({
            red: 'ff0000',
            yellow: 'ffff00',
            green: '00ff00',
            blue: '0000ff',
            purple: 'ff00ff',
            cyan: '00ffff'
        });
    });
});

describe('Objects.filter() should', () => {
    it('filter an object based on value', () => {
        // bitwise and
        const blues = Objects.filter(colors, color => (color & colors.blue) === colors.blue);

        expect(blues).not.toBe(colors);

        expect(blues).toEqual({
            blue: 0x0000ff,
            purple: 0xff00ff,
            cyan: 0x00ffff
        });
    });
    it('filter an object based on key', () => {
        const colorsWithL = Objects.filter(colors, (_, key) => key.includes('l'));

        expect(colorsWithL).not.toBe(colors);

        expect(colorsWithL).toEqual({
            yellow: 0xffff00,
            blue: 0x0000ff,
            purple: 0xff00ff
        });
    });
});

describe('Objects.omit() should', () => {
    it('omit keys from new object', () => {
        const nonBlues = Objects.omit(colors, 'blue', 'cyan');

        expect(nonBlues).not.toBe(colors);

        expect(nonBlues).toEqual({
            red: 0xff0000,
            yellow: 0xffff00,
            green: 0x00ff00,
            purple: 0xff00ff
        });
    });
});

describe('Objects.pick() should', () => {
    it('pick keys from new object', () => {
        const reds = Objects.pick(colors, 'red', 'purple');

        expect(reds).not.toBe(colors);

        expect(reds).toEqual({
            red: 0xff0000,
            purple: 0xff00ff
        });
    });
});

describe('Objects.is() should', () => {
    it('succeed a proper typeof check', () => expect(Objects.is('foo', 'string')).toBe(true));
    it('fail an improper typeof check', () => expect(Objects.is('foo', 'number')).toBe(false));
    it('succeed a proper instanceof check', () => expect(Objects.is(new Date(), Date)).toBe(true));
    it('succeed a proper inherited instanceof check', () => expect(Objects.is(new Date(), Object)).toBe(true));
    it('fail an improper instanceof check', () => expect(Objects.is(new Date(), Number)).toBe(false));
});

describe('Objects.getConstructor() should', () => {
    it('return nothing for strings', () => expect(Objects.getConstructor('foo')).toBe(undefined));
    it('return nothing for numbers', () => expect(Objects.getConstructor(5)).toBe(undefined));
    it('return nothing for big ints', () => expect(Objects.getConstructor(BigInt(5))).toBe(undefined));
    it('return nothing for arrays', () => expect(Objects.getConstructor([])).toBe(undefined));
    it('return nothing for object literals', () => expect(Objects.getConstructor({})).toBe(undefined));
    it('return Date for dates', () => expect(Objects.getConstructor(new Date())).toBe(Date));
});

function expectSameStructure(object: any, recursive: boolean = false): void {
    const result = Objects.clone(object, recursive ? 'deep' : 'shallow');

    expect(result).not.toBe(object);
    expect(result).toEqual(object);

    if (Array.isArray(result)) {
        if (recursive) {
            result.forEach((o, i) => expect(o).not.toBe(object[i]));
        } else {
            result.forEach((o, i) => expect(o).toBe(object[i]));
        }
    } else if (Objects.isObject(result)) {
        for (const key in result) {
            if (recursive) {
                expect(result[key]).not.toBe(object[key]);
            } else {
                expect(result[key]).toBe(object[key]);
            }
        }
    }
}

describe('Objects.clone() should', () => {
    it('return null', () => expect(Objects.clone(null)).toBe(null));
    it('return undefined', () => expect(Objects.clone(undefined)).toBe(undefined));
    it('return the same number', () => expect(Objects.clone(5)).toBe(5));
    it('return the same string', () => expect(Objects.clone('5')).toBe('5'));
    it('return the same array', () => expectSameStructure([0, 1, 2]));
    it('return the same 2D-array', () => expectSameStructure([[1, 2, 3], [4, 5, 6]]));
    it('return the same 2D-array (recursive)', () => expectSameStructure([[1, 2, 3], [4, 5, 6]], true));
    it('use the clone function', () => {
        const obj = {
            value: 1,
            clone() { return { value: 2 } }
        }

        expect(Objects.clone(obj)).toEqual({ value: 2});
    });
    it('clone an object literal (primitives)', () => expectSameStructure({ value: 2, value2: 4 }));
    it('clone an object literal', () => expectSameStructure({ value: [0, 1], value2: [1, 2] }));
    it('clone an object literal (recursive)', () => expectSameStructure({ value: [0, 1], value2: [1, 2] }, true));
    it('throw if object was constructed', () => expect(() => Objects.clone(new Date())).toThrowError());
    it('throw if object property was constructed', () => expect(() => Objects.clone({ date: new Date() }, 'deep')).toThrowError());
    it('throw if array item was constructed', () => expect(() => Objects.clone([new Date()], 'deep')).toThrowError());
    it('not throw if object property was constructed and mode is shallow', () => expectSameStructure({ date: new Date() }));
    it('not throw if array item was constructed and mode is shallow', () => expectSameStructure([new Date()]));
});
