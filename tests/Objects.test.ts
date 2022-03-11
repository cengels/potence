import { Assert } from '../src/index.js';
import * as Objects from '../src/objects/index.js';
import { ObjectLiteral } from '../src/types.js';

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

describe('Objects.isWritable() should return', () => {
    it('true on ordinary property', () => expect(Objects.isWritable({ value: 1 }, 'value')).toBe(true));
    it('false on getter property', () => expect(Objects.isWritable({ get value() { return 1 } }, 'value')).toBe(false));
    it('true on getter/setter property', () => expect(Objects.isWritable({
        get value() { return 1 },
        set value(value: number) { /** not implemented */ }
    }, 'value')).toBe(true));
    it('false on frozen object', () => expect(Objects.isWritable(Object.freeze({ value: 1 }), 'value')).toBe(false));
    it('false on readonly property', () => {
        class Foo {}
        Object.defineProperty(Foo.prototype, 'value', { value: 5, writable: false });

        const instance = new Foo();

        expect(() => (instance as { value: number }).value = 5).toThrowError();
        expect((instance as { value: number }).value).toBe(5);
        expect(Objects.isWritable(instance, 'value')).toBe(false);
    });
});

describe('Objects.getConstructor() should', () => {
    it('return nothing for strings', () => expect(Objects.getConstructor('foo')).toBe(undefined));
    it('return nothing for numbers', () => expect(Objects.getConstructor(5)).toBe(undefined));
    it('return nothing for big ints', () => expect(Objects.getConstructor(BigInt(5))).toBe(undefined));
    it('return nothing for arrays', () => expect(Objects.getConstructor([])).toBe(undefined));
    it('return nothing for object literals', () => expect(Objects.getConstructor({})).toBe(undefined));
    it('return Date for dates', () => expect(Objects.getConstructor(new Date())).toBe(Date));
});

function expectSameStructure(object: ObjectLiteral | unknown[], recursive: boolean = false): void {
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
        Assert.that(Objects.isObject(object));

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

class Base {
    public value(): number {
        return 5;
    }
}
class Inherited extends Base { }

describe('Objects.getPropertyDescriptor() should', () => {
    it('return descriptor for base class', () => expect(Objects.getPropertyDescriptor(new Base(), 'value')).toBeDefined());
    it('return descriptor for inherited class', () => expect(Objects.getPropertyDescriptor(new Inherited(), 'value')).toBeDefined());
    it('return nothing for missing property', () => expect(Objects.getPropertyDescriptor(new Base(), 'val')).toBeUndefined());
});
