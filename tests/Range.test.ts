import each from 'jest-each';
import Range from '../src/numbers/Range.js';

it('Range.invert() should invert range', () => {
    const range = new Range(1, 3);
    expect(range.from).toBe(1);
    expect(range.to).toBe(3);
    range.invert();
    expect(range.from).toBe(3);
    expect(range.to).toBe(1);
});

describe('Range.min() should return the lowest value when', () => {
    it('range is not inverted', () => expect(new Range(0, 5).min()).toBe(0));
    it('range is inverted', () => expect(new Range(5, 0).min()).toBe(0));
    it('range is half-negative', () => expect(new Range(-5, 0).min()).toBe(-5));
    it('range is fully negative', () => expect(new Range(-5, -10).min()).toBe(-10));
});

describe('Range.max() should return the highest value when', () => {
    it('range is not inverted', () => expect(new Range(0, 5).max()).toBe(5));
    it('range is inverted', () => expect(new Range(5, 0).max()).toBe(5));
    it('range is half-negative', () => expect(new Range(-5, 0).max()).toBe(0));
    it('range is fully negative', () => expect(new Range(-5, -10).max()).toBe(-5));
});

describe('Range.center() should return the middle value when', () => {
    describe('range has an even span and', () => {
        it('range is not inverted', () => expect(new Range(0, 4).center()).toBe(2));
        it('range is inverted', () => expect(new Range(4, 0).center()).toBe(2));
        it('range is half-negative', () => expect(new Range(-4, 0).center()).toBe(-2));
        it('range is fully negative', () => expect(new Range(-5, -15).center()).toBe(-10));
    });
    describe('range has an odd span and', () => {
        it('range is not inverted', () => expect(new Range(0, 5).center()).toBe(2.5));
        it('range is inverted', () => expect(new Range(5, 0).center()).toBe(2.5));
        it('range is half-negative', () => expect(new Range(-5, 0).center()).toBe(-2.5));
        it('range is fully negative', () => expect(new Range(-5, -10).center()).toBe(-7.5));
    });
});

describe('Range.span() should return the span when', () => {
    it('range is not inverted', () => expect(new Range(0, 5).span()).toBe(5));
    it('range is inverted', () => expect(new Range(5, 0).span()).toBe(5));
    it('range is half-negative', () => expect(new Range(-5, 5).span()).toBe(10));
    it('range is fully negative', () => expect(new Range(-5, -10).span()).toBe(5));
});

describe('Range.clamp() should return', () => {
    it('original value when value is in range', () => expect(new Range(28, 322).clamp(75)).toBe(75));
    it('original value when value is on lower boundary', () => expect(new Range(28, 322).clamp(28)).toBe(28));
    it('original value when value is on upper boundary', () => expect(new Range(28, 322).clamp(322)).toBe(322));
    it('clamped value when value is below lower boundary', () => expect(new Range(28, 322).clamp(-55)).toBe(28));
    it('clamped value when value is above upper boundary', () => expect(new Range(28, 322).clamp(355)).toBe(322));
});

describe('Range.contains(number) should return', () => {
    it('true if value is inside (default tolerance)', () => expect(new Range(-55, 22).contains(-20)).toBe(true));
    it('true if value is on lower boundary', () => expect(new Range(-55, 22).contains(-55)).toBe(true));
    it('true if value is on upper boundary', () => expect(new Range(-55, 22).contains(22)).toBe(true));
    it('false if value is below lower boundary', () => expect(new Range(-55, 22).contains(-56)).toBe(false));
    it('false if value is above upper boundary', () => expect(new Range(-55, 22).contains(23)).toBe(false));
    it('true if value is close to lower boundary', () => expect(new Range(-55, 22).contains(-54.9999999999)).toBe(true));
    it('true if value is close to upper boundary', () => expect(new Range(-55, 22).contains(22.00000000001)).toBe(true));
    it('true if value is outside range but tolerance is increased', () => expect(new Range(-55, 22).contains(25, 6)).toBe(true));
    it('false if value is inside range but tolerance is negative', () => expect(new Range(-55, 22).contains(20, -6)).toBe(false));
});

describe('Range.contains(range) should return', () => {
    it('true if range is completely inside', () => expect(new Range(-55, 22).contains(new Range(-20, 20))).toBe(true));
    it('true if ranges are identical', () => expect(new Range(-55, 22).contains(new Range(-55, 22))).toBe(true));
    it('false if range exceeds lower boundary', () => expect(new Range(-55, 22).contains(new Range(-77, 20))).toBe(false));
    it('false if range exceeds upper boundary', () => expect(new Range(-55, 22).contains(new Range(0, 25))).toBe(false));
});

describe('Range.between() should return', () => {
    it('true if value is inside', () => expect(new Range(-55, 22).between(-20)).toBe(true));
    it('false if value is lower boundary', () => expect(new Range(-55, 22).between(-55)).toBe(false));
    it('false if value is upper boundary', () => expect(new Range(-55, 22).between(22)).toBe(false));
});

describe('Range.overlaps() should return', () => {
    it('true if the target range is completely inside', () => expect(new Range(-55, 22).overlaps(new Range(-1, 0))).toBe(true));
    it('true if the target range overlaps only with lower boundary', () => expect(new Range(-55, 22).overlaps(new Range(-77, -50))).toBe(true));
    it('true if the target range overlaps only with upper boundary', () => expect(new Range(-55, 22).overlaps(new Range(10, 30))).toBe(true));
    it('false if the target range is adjacent to lower boundary', () => expect(new Range(-55, 22).overlaps(new Range(-100, -55))).toBe(false));
    it('false if the target range is adjacent to upper boundary', () => expect(new Range(-55, 22).overlaps(new Range(22, 55))).toBe(false));
});

describe('Range.intersect() should return', () => {
    it('target lower bounds if completely inside and closer to upper bounds', () => expect(new Range(-55, 22).intersect(new Range(-1, 0))).toBe(-1));
    it('target upper bounds if completely inside and closer to lower bounds', () => expect(new Range(-55, 22).intersect(new Range(-33, -32))).toBe(-32));
    it('center if completely inside and enclosing center', () => expect(new Range(-55, 22).intersect(new Range(-33, 20))).toBe(-16.5));
    it('upper bounds if range exceeds lower bounds', () => expect(new Range(-55, 22).intersect(new Range(-58, -50))).toBe(-50));
    it('lower bounds if range exceeds upper bounds', () => expect(new Range(-55, 22).intersect(new Range(20, 25))).toBe(20));
    it('error if ranges do not overlap', () => expect(() => new Range(-55, 22).intersect(new Range(-80, -60))).toThrowError());
});

describe('Range.at() should return', () => {
    each([
        [-0.5, -5],
        [0, 5],
        [0.1, 7],
        [0.3, 11],
        [0.5, 15],
        [0.75, 20],
        [1, 25],
        [1.2, 29],
    ]).it('at(%d): %d', (value, expected) => expect(new Range(5, 25).at(value)).toBe(expected));
});

describe('Range.relative() should return', () => {
    each([
        [-5, -0.5],
        [5, 0],
        [7, 0.1],
        [11, 0.3],
        [15, 0.5],
        [20, 0.75],
        [25, 1],
        [29, 1.2],
    ]).it('relative(%d): %d', (value, expected) => expect(new Range(5, 25).relative(value)).toBe(expected));
    each([
        [-5, 1.5],
        [5, 1.0],
        [7, 0.9],
        [11, 0.7],
        [15, 0.5],
        [20, 0.25],
        [25, 0.0],
        [29, -0.2],
    ]).it('inverted relative(%d): %d', (value, expected) => expect(new Range(25, 5).relative(value)).toBeCloseTo(expected));
});

describe('Range.equals() should return', () => {
    it('true if used with equal arguments', () => expect(new Range(-55, 22).equals(-55, 22)).toBe(true));
    it('false if used with unequal arguments', () => expect(new Range(-55, 22).equals(22, -55)).toBe(false));
    it('true if used with equal ranges', () => expect(new Range(-55, 22).equals(new Range(-55, 22))).toBe(true));
    it('false if used with unequal ranges', () => expect(new Range(-55, 22).equals(new Range(22, -55))).toBe(false));
});

describe('Range.clone() should return', () => {
    it('a clone of the same range', () => {
        const range = new Range(-55, 22);
        const clone = range.clone();
        return expect(range !== clone && range.equals(clone)).toBe(true);
    });
});
