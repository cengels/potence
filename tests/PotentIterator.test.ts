import { describe, expect, it } from 'vitest';
import PotentIterator from '../src/arrays/PotentIterator.js';

const base = [0, 1, 2, 3]

describe('new PotentIterator() should', () => {
    it('be constructible by array', () => expect(new PotentIterator(base).collect()).toEqual(base));
    it('be constructible by iterator', () => expect(new PotentIterator(base[Symbol.iterator]()).collect()).toEqual(base));
    it('be constructible by set', () => expect(new PotentIterator(new Set(base)).collect()).toEqual(base));
});

describe('PotentIterator.first() should', () => {
    it('return the first element', () => expect(new PotentIterator(base).first()).toBe(0));
    it('return nothing if empty', () => expect(new PotentIterator([]).first()).toBeUndefined());
    it('not consume the rest of the iterator', () => {
        const iterator = new PotentIterator(base);
        iterator.first();

        expect(iterator.collect()).toEqual(base.slice(1));
    });
});

describe('PotentIterator.last() should', () => {
    it('return the last element', () => expect(new PotentIterator(base).last()).toBe(3));
    it('return nothing if empty', () => expect(new PotentIterator([]).last()).toBeUndefined());
    it('consume the entire iterator', () => {
        const iterator = new PotentIterator(base);
        iterator.last();

        expect(iterator.next().done).toBe(true);
    });
});

describe('PotentIterator.nth() should', () => {
    it('return the first element', () => expect(new PotentIterator(base).nth(0)).toBe(0));
    it('return the second element', () => expect(new PotentIterator(base).nth(1)).toBe(1));
    it('return nothing if empty', () => expect(new PotentIterator([]).nth(0)).toBeUndefined());
    it('return nothing if too small', () => expect(new PotentIterator(base).nth(-5)).toBeUndefined());
    it('return nothing if too large', () => expect(new PotentIterator(base).nth(4)).toBeUndefined());
    it('consume the iterator up to the relevant point', () => {
        const iterator = new PotentIterator(base);
        iterator.nth(2);

        expect(iterator.next().value).toBe(3);
    });
});

describe('PotentIterator.find() should', () => {
    it('return the first matching element', () => expect(new PotentIterator(base).find(x => x > 0)).toBe(1));
    it('return nothing if empty', () => expect(new PotentIterator([]).find(x => x > 0)).toBeUndefined());
    it('return nothing if no matches', () => expect(new PotentIterator(base).find(x => x < 0)).toBeUndefined());
    it('consume the iterator up to the relevant point', () => {
        const iterator = new PotentIterator(base);
        iterator.find(x => x > 0);

        expect(iterator.next().value).toBe(2);
    });
});

describe('PotentIterator.findLast() should', () => {
    it('return the last matching element', () => expect(new PotentIterator(base).findLast(x => x < 3)).toBe(2));
    it('return nothing if empty', () => expect(new PotentIterator([]).findLast(x => x < 3)).toBeUndefined());
    it('return nothing if no matches', () => expect(new PotentIterator(base).findLast(x => x < 0)).toBeUndefined());
    it('consume the entire iterator', () => {
        const iterator = new PotentIterator(base);
        iterator.findLast(x => x < 3);

        expect(iterator.next().done).toBe(true);
    });
});
