import each from 'jest-each';
import * as Numbers from '../src/numbers/index.js';

describe('Numbers.configure() should', () => {
    it('change the default tolerance', () => {
        expect(Numbers.compare(1, 1.0000000001)).toBe(true);
        Numbers.configure({ defaultTolerance: 0 });
        expect(Numbers.compare(1, 1.0000000001)).toBe(false);
    });
});

describe('Numbers.compare() should return', () => {
    it('true for equal integral numbers', () => expect(Numbers.compare(5, 5)).toBe(true));
    it('false for non-equal integral numbers', () => expect(Numbers.compare(5, 4)).toBe(false));
    it('true for equal floating point numbers', () => expect(Numbers.compare(5.333, 5.333)).toBe(true));
    it('true for equal calculated floating point numbers', () => expect(Numbers.compare(5.1, 5 * 1.02)).toBe(true));
    it('true for any number with bigger tolerance', () => expect(Numbers.compare(5, 3, 2)).toBe(true));
    it('false for NaN', () => expect(Numbers.compare(Number.NaN, Number.NaN)).toBe(false));
    it('false for Infinity', () => expect(Numbers.compare(Infinity, Infinity)).toBe(false));
    it('false for -Infinity', () => expect(Numbers.compare(-Infinity, -Infinity)).toBe(false));
});

describe('Numbers.range() should', () => {
    it('return a range with two values', () => expect(Numbers.range(2, 21).equals(2, 21)).toBe(true));
    it('return an inverted range with two values', () => expect(Numbers.range(21, 2).equals(21, 2)).toBe(true));
    it('return a range from over 2 values', () => expect(Numbers.range(18, 5, 9, 1, 10, 20, 7).equals(1, 20)).toBe(true));
    it('throw with less than 3 values', () => expect(() => Numbers.range(5)).toThrowError());
});

describe('Numbers.isEven() should return', () => {
    it('true for even numbers', () => expect(Numbers.isEven(5234)).toBe(true));
    it('false for odd numbers', () => expect(Numbers.isEven(634611)).toBe(false));
    it('false for decimals', () => expect(Numbers.isEven(634612.55)).toBe(false));
    it('false for NaN', () => expect(Numbers.isEven(Number.NaN)).toBe(false));
    it('false for Infinity', () => expect(Numbers.isEven(Infinity)).toBe(false));
    it('false for -Infinity', () => expect(Numbers.isEven(-Infinity)).toBe(false));
});

describe('Numbers.isOdd() should return', () => {
    it('true for odd numbers', () => expect(Numbers.isEven(634611)).toBe(true));
    it('false for even numbers', () => expect(Numbers.isEven(5234)).toBe(false));
    it('false for decimals', () => expect(Numbers.isEven(634611.55)).toBe(false));
    it('false for NaN', () => expect(Numbers.isEven(Number.NaN)).toBe(false));
    it('false for Infinity', () => expect(Numbers.isEven(Infinity)).toBe(false));
    it('false for -Infinity', () => expect(Numbers.isEven(-Infinity)).toBe(false));
});

describe('Numbers.isFloat() should return', () => {
    it('true for positive floating point numbers', () => expect(Numbers.isFloat(354.2)).toBe(true));
    it('true for negative floating point numbers', () => expect(Numbers.isFloat(-1255.99999999999)).toBe(true));
    it('false for positive integers', () => expect(Numbers.isFloat(55)).toBe(false));
    it('false for negative integers', () => expect(Numbers.isFloat(-253)).toBe(false));
    it('false for 0', () => expect(Numbers.isFloat(0)).toBe(false));
    it('false for NaN', () => expect(Numbers.isFloat(Number.NaN)).toBe(false));
    it('false for Infinity', () => expect(Numbers.isFloat(Infinity)).toBe(false));
    it('false for -Infinity', () => expect(Numbers.isFloat(-Infinity)).toBe(false));
});

describe('Numbers.isSafeFloat() should return', () => {
    it('true for 0.5', () => expect(Numbers.isSafeFloat(0.5)).toBe(true));
    it('true for 212.5', () => expect(Numbers.isSafeFloat(212.5)).toBe(true));
    it('true for 0.25', () => expect(Numbers.isSafeFloat(0.25)).toBe(true));
    it('true for 0.125', () => expect(Numbers.isSafeFloat(0.125)).toBe(true));
    it('true for 0.0625', () => expect(Numbers.isSafeFloat(0.0625)).toBe(true));
    it('true for any number divided by a power of 2', () => {
        let current: number = 1;
        for (let i: number = 0; i < 50; i++) {
            current /= 2;
            expect(Numbers.isSafeFloat(current)).toBe(true);
        }
    });
    it('false for 0.1', () => expect(Numbers.isSafeFloat(0.1)).toBe(false));
    it('false for 0.2', () => expect(Numbers.isSafeFloat(0.2)).toBe(false));
    it('true for 0.6', () => expect(Numbers.isSafeFloat(0.6)).toBe(true));
    it('false for NaN', () => expect(Numbers.isSafeFloat(Number.NaN)).toBe(false));
    it('false for Infinity', () => expect(Numbers.isSafeFloat(Infinity)).toBe(false));
    it('false for -Infinity', () => expect(Numbers.isSafeFloat(-Infinity)).toBe(false));
});

describe('Numbers.isUnsafeFloat() should return', () => {
    it('false for 0.5', () => expect(Numbers.isUnsafeFloat(0.5)).toBe(false));
    it('false for 212.5', () => expect(Numbers.isUnsafeFloat(212.5)).toBe(false));
    it('false for 0.25', () => expect(Numbers.isUnsafeFloat(0.25)).toBe(false));
    it('false for 0.125', () => expect(Numbers.isUnsafeFloat(0.125)).toBe(false));
    it('false for 0.0625', () => expect(Numbers.isUnsafeFloat(0.0625)).toBe(false));
    it('false for any number divided by a power of 2', () => {
        let current: number = 1;
        for (let i: number = 0; i < 50; i++) {
            current /= 2;
            expect(Numbers.isUnsafeFloat(current)).toBe(false);
        }
    });
    it('true for 0.1', () => expect(Numbers.isUnsafeFloat(0.1)).toBe(true));
    it('true for 0.2', () => expect(Numbers.isUnsafeFloat(0.2)).toBe(true));
    it('false for 0.6', () => expect(Numbers.isUnsafeFloat(0.6)).toBe(false));
    it('false for NaN', () => expect(Numbers.isUnsafeFloat(Number.NaN)).toBe(false));
    it('false for Infinity', () => expect(Numbers.isUnsafeFloat(Infinity)).toBe(false));
    it('false for -Infinity', () => expect(Numbers.isUnsafeFloat(-Infinity)).toBe(false));
});

describe('Numbers.gcd() should return', () => {
    it('0 with no numbers passed', () => expect(Numbers.gcd()).toBe(0));
    it('0 with 1 number passed', () => expect(Numbers.gcd(5)).toBe(0));
    it('0 with a floating point number passed', () => expect(Numbers.gcd(3.2, 6.4)).toBe(0));
    each([
        [3, 6, 3],
        [7, 14, 7],
        [522, 322, 2],
        [1230, 1111, 1],
        [605, 363, 121]
    ]).it('with positive integers %d, %d: %d', (a, b, expected) => expect(Numbers.gcd(a, b)).toBe(expected));
    each([
        [505, 202, 303, 101]
    ]).it('with positive integers %d, %d, %d: %d', (a, b, c, expected) => expect(Numbers.gcd(a, b, c)).toBe(expected));
});

describe('Numbers.lcm() should return', () => {
    it('0 with no numbers passed', () => expect(Numbers.lcm()).toBe(0));
    it('0 with 1 number passed', () => expect(Numbers.lcm(5)).toBe(0));
    it('0 with a floating point number passed', () => expect(Numbers.lcm(3.2, 6.4)).toBe(0));
    each([
        [3, 6, 6],
        [7, 14, 14],
        [16, 18, 144],
        [255, 599, 152745]
    ]).it('with integers %d, %d: %d', (a, b, expected) => expect(Numbers.lcm(a, b)).toBe(expected));
    each([
        [3, 4, 5, 60],
        [12, 52, 1212, 15756],
        [9, 99, 999, 10989]
    ]).it('with integers %d, %d, %d: %d', (a, b, c, expected) => expect(Numbers.lcm(a, b, c)).toBe(expected));
});

describe('Numbers.median() should return', () => {
    it('0 with no numbers passed', () => expect(Numbers.median()).toBe(0));
    it('the number with 1 number passed', () => expect(Numbers.median(5)).toBe(5));
    it('the middle number with odd numbers passed', () => expect(Numbers.median(9, 2, 3)).toBe(3));
    it('the average of the middle numbers with even numbers passed', () => expect(Numbers.median(9, 4, 1, 10)).toBe(6.5));
});

describe('Numbers.sum() should return', () => {
    each([
        [[], 0],
        [[1], 1],
        [[55, 22], 77],
        [[623, 365452, 412, -5321], 361166]
    ]).it('with integers %p: %d', (values, expected) => expect(Numbers.sum(...values)).toBe(expected));
});

describe('Numbers.mean() should return', () => {
    each([
        [[], 0],
        [[1], 1],
        [[55, 22], 38.5],
        [[623, 365452, 412, -5321], 90291.5]
    ]).it('with integers %p: %d', (values, expected) => expect(Numbers.mean(...values)).toBeCloseTo(expected));
});

describe('Numbers.roman() should', () => {
    it('throw an error if argument is 0', () => expect(() => Numbers.roman(0)).toThrowError());
    it('throw an error if argument is below 0', () => expect(() => Numbers.roman(-5)).toThrowError());
    each([
        [1000, 'M'],
        [500, 'D'],
        [100, 'C'],
        [50, 'L'],
        [10, 'X'],
        [5, 'V'],
        [1, 'I']
    ]).it('return the corresponding base numeral to %p: %s', (value, expected) => expect(Numbers.roman(value)).toBe(expected));
    each([
        [2, 'II'],
        [4, 'IV'],
        [6, 'VI'],
        [8, 'VIII'],
        [9, 'IX'],
        [39, 'XXXIX'],
        [246 , 'CCXLVI'],
        [789, 'DCCLXXXIX'],
        [1009, 'MIX'],
        [1066, 'MLXVI'],
        [1555, 'MDLV'],
        [1912, 'MCMXII'],
        [2021, 'MMXXI'],
        [2421, 'MMCDXXI'],
        [3999, 'MMMCMXCIX']
    ]).it('return the corresponding incremental numeral to %p: %s', (value, expected) => expect(Numbers.roman(value)).toBe(expected));
});
