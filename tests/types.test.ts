import { isPrimitive, isEquatable } from '../src/types';

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
