import * as Numbers from '../src/numbers';

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

describe('Numbers.median() should return', () => {
    it('0 with no numbers passed', () => expect(Numbers.median()).toBe(0));
    it('the number with 1 number passed', () => expect(Numbers.median(5)).toBe(5));
    it('the middle number with odd numbers passed', () => expect(Numbers.median(9, 2, 3)).toBe(3));
    it('the average of the middle numbers with even numbers passed', () => expect(Numbers.median(9, 4, 1, 10)).toBe(6.5));
});
