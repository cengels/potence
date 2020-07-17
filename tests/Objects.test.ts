import Objects from '../src/Objects';

describe('Objects.compare() should', () => {
    describe('for a shallow comparison', () => {
        it('succeed in comparing an equivalent object', () => expect(Objects.compare({ a: 1, b: 3 }, { a: 1, b: 3 })).toBe(true));
        it('fail to compare a non-equivalent object', () => expect(Objects.compare({ a: 1, b: 3 }, { a: 1, b: 4 })).toBe(false));
        it('fail to compare a nested object', () => expect(Objects.compare({ a: 1, b: { one: 1 } }, { a: 1, b: { one: 1 } })).toBe(false));
    });
    describe('for a deep comparison', () => {
        it('succeed in comparing an equivalent nested object', () => expect(Objects.compare({ a: { b: 1 } }, { a: { b: 1 } }, Objects.Comparison.Deep)).toBe(true));
        it('fail to comparing a non-equivalent nested object', () => expect(Objects.compare({ a: { b: 1 } }, { a: { b: 2 } }, Objects.Comparison.Deep)).toBe(false));
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
