import * as Numbers from '../src/numbers';

describe('Numbers.compare() should return', () => {
    it('true for equal integral numbers', () => expect(Numbers.compare(5, 5)).toBe(true));
    it('false for non-equal integral numbers', () => expect(Numbers.compare(5, 4)).toBe(false));
    it('true for equal floating point numbers', () => expect(Numbers.compare(5.333, 5.333)).toBe(true));
    it('true for equal calculated floating point numbers', () => expect(Numbers.compare(5.1, 5 * 1.02)).toBe(true));
    it('true for any number with bigger tolerance', () => expect(Numbers.compare(5, 3, 2)).toBe(true));
});

describe('Numbers.center() should', () => {
    it('work with integral numbers', () => expect(Numbers.center(5, 7)).toBe(6));
    it('work with floating point numbers', () => expect(Numbers.center(2.3, 118.11)).toBeCloseTo(60.205, 3));
    it('work with multiple numbers', () => expect(Numbers.center(5, 2, 10, -15, 17)).toBe(1));
    it('return 0 without numbers passed', () => expect(Numbers.center()).toBe(0));
    it('return number if only number is passed', () => expect(Numbers.center(52)).toBe(52));
});

describe('Numbers.even() should return', () => {
    it('true for even numbers', () => expect(Numbers.even(5234)).toBe(true));
    it('false for odd numbers', () => expect(Numbers.even(634611)).toBe(false));
    it('false for decimals', () => expect(Numbers.even(634612.55)).toBe(false));
});

describe('Numbers.odd() should return', () => {
    it('true for odd numbers', () => expect(Numbers.odd(634611)).toBe(true));
    it('false for even numbers', () => expect(Numbers.odd(5234)).toBe(false));
    it('false for decimals', () => expect(Numbers.odd(634611.55)).toBe(false));
});

describe('Numbers.integral() should return', () => {
    it('true for positive integral numbers', () => expect(Numbers.integral(5)).toBe(true));
    it('true for negative integral numbers', () => expect(Numbers.integral(-5235)).toBe(true));
    it('false for floating point numbers', () => expect(Numbers.integral(0.1)).toBe(false));
    it('false for small floating point numbers', () => expect(Numbers.integral(0.0000000001)).toBe(false));
});

describe('Numbers.fraction() should return', () => {
    it('true for positive floating point numbers', () => expect(Numbers.float(354.2)).toBe(true));
    it('true for negative floating point numbers', () => expect(Numbers.float(-1255.99999999999)).toBe(true));
    it('false for positive integers', () => expect(Numbers.float(55)).toBe(false));
    it('false for negative integers', () => expect(Numbers.float(-253)).toBe(false));
    it('false for 0', () => expect(Numbers.float(0)).toBe(false));
});

describe('Numbers.safeFloat() should return', () => {
    it('true for 0.5', () => expect(Numbers.safeFloat(0.5)).toBe(true));
    it('true for 212.5', () => expect(Numbers.safeFloat(212.5)).toBe(true));
    it('true for 0.25', () => expect(Numbers.safeFloat(0.25)).toBe(true));
    it('true for 0.125', () => expect(Numbers.safeFloat(0.125)).toBe(true));
    it('true for 0.0625', () => expect(Numbers.safeFloat(0.0625)).toBe(true));
    it('true for any number divided by a power of 2', () => {
        let current: number = 1;
        for (let i: number = 0; i < 50; i++) {
            current /= 2;
            expect(Numbers.safeFloat(current)).toBe(true);
        }
    });
    it('false for 0.1', () => expect(Numbers.safeFloat(0.1)).toBe(false));
    it('false for 0.2', () => expect(Numbers.safeFloat(0.2)).toBe(false));
    it('true for 0.6', () => expect(Numbers.safeFloat(0.6)).toBe(true));
});

describe('Numbers.median() should return', () => {
    // @ts-expect-error
    it('0 with no numbers passed', () => expect(Numbers.median()).toBe(0));
    it('the number with 1 number passed', () => expect(Numbers.median(5)).toBe(5));
    it('the middle number with odd numbers passed', () => expect(Numbers.median(9, 2, 3)).toBe(3));
    it('the average of the middle numbers with even numbers passed', () => expect(Numbers.median(9, 4, 1, 10)).toBe(6.5));
});
