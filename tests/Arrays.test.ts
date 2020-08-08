import * as Arrays from '../src/arrays';

describe('Arrays.clone() should', () => {
    it('create an equivalent array', () => {
        const source = [1, 3, 5];
        const clone = Arrays.clone([1, 3, 5]);

        expect(clone === source).toBe(false);
        expect(Arrays.equal(source, clone)).toBe(true);
    });
});

describe('Arrays.first() should return', () => {
    it('the first element in an array', () => expect(Arrays.first([1, 3, 5])).toBe(1));
    it('undefined in an empty array', () => expect(Arrays.first([])).toBe(undefined));
});

describe('Arrays.last() should return', () => {
    it('the last element in an array', () => expect(Arrays.last([1, 3, 5])).toBe(5));
    it('undefined in an empty array', () => expect(Arrays.last([])).toBe(undefined));
});

describe('Arrays.inBounds() should return', () => {
    it('true if the index is the array\'s lower bound', () => expect(Arrays.inBounds([1, 3, 5], 0)).toBe(true));
    it('true if the index is the array\'s upper bound', () => expect(Arrays.inBounds([1, 3, 5], 2)).toBe(true));
    it('false if the index is lower than 0', () => expect(Arrays.inBounds([1, 3, 5], -1)).toBe(false));
    it('false if the index is greater than array.length - 1', () => expect(Arrays.inBounds([1, 3, 5], 3)).toBe(false));
    it('false if the array is empty', () => expect(Arrays.inBounds([], 0)).toBe(false));
});

describe('Arrays.next() should return', () => {
    it('index + 1 if index + 1 is in-bounds', () => expect(Arrays.next([1, 3, 5], 1)).toBe(5));
    it('0 if index + 1 is out of bounds', () => expect(Arrays.next([1, 3, 5], 2)).toBe(1));
    it('undefined if index is greater than upper bound', () => expect(Arrays.next([1, 3, 5], 3)).toBe(undefined));
    it('undefined if index is lower than lower bound', () => expect(Arrays.next([1, 3, 5], -1)).toBe(undefined));
});

describe('Arrays.previous() should return', () => {
    it('index - 1 if index - 1 is in-bounds', () => expect(Arrays.previous([1, 3, 5], 1)).toBe(1));
    it('array.length - 1 if index - 1 is out of bounds', () => expect(Arrays.previous([1, 3, 5], 0)).toBe(5));
    it('undefined if index is greater than upper bound', () => expect(Arrays.previous([1, 3, 5], 3)).toBe(undefined));
    it('undefined if index is lower than lower bound', () => expect(Arrays.previous([1, 3, 5], -1)).toBe(undefined));
});

describe('Arrays.empty() should return', () => {
    it('true if the array is empty', () => expect(Arrays.empty([])).toBe(true));
    it('false if the array is not empty', () => expect(Arrays.empty([1])).toBe(false));
});

describe('Arrays.notEmpty() should return', () => {
    it('true if the array is not empty', () => expect(Arrays.notEmpty([1])).toBe(true));
    it('false if the array is empty', () => expect(Arrays.notEmpty([])).toBe(false));
});

describe('Arrays.equal() should', () => {
    it('succeed in comparing an equivalent array', () => expect(Arrays.equal([1, 3, 5], [1, 3, 5])).toBe(true));
    it('fail to compare a non-equivalent array', () => expect(Arrays.equal([1, 4, 5], [1, 3, 5])).toBe(false));
    it('fail to compare arrays with varying length', () => expect(Arrays.equal([1, 3], [1, 3, 5])).toBe(false));
});

describe('Arrays.remove() should', () => {
    it('remove an element from an array', () => {
        const source = [1, 5, 8, 10];
        Arrays.remove(source, 5);
        expect(Arrays.equal(source, [1, 8, 10])).toBe(true);
    });
    it('remove multiple elements from an array', () => {
        const source = [1, 5, 8, 10];
        Arrays.remove(source, 5, 8);
        expect(Arrays.equal(source, [1, 10])).toBe(true);
    });
    it('remove multiple of the same element from an array', () => {
        const source = [1, 5, 5, 5, 5, 10];
        Arrays.remove(source, 5);
        expect(Arrays.equal(source, [1, 10])).toBe(true);
    });
    it('throw if the element does not exist in the array', () => {
        const source = [1, 2, 3, 5, 6, 7];
        expect(() => Arrays.remove(source, 4)).toThrowError();
    });
});

describe('Arrays.replace() should', () => {
    it('replace an array element', () => expect(Arrays.replace([1, 3, 5], 3, 6)).toEqual([1, 6, 5]));
    it('throw an error if element is not found', () => expect(() => Arrays.replace([1, 3, 5], 4, 6)).toThrowError());
});

describe('Arrays.type() should return', () => {
    it('true if all elements are strings', () => expect(Arrays.type(['foo', 'bar'], 'string')).toBe(true));
    it('true if all elements are numbers', () => expect(Arrays.type([1, 4, 15, 120], 'number')).toBe(true));
    it('true if array is empty', () => expect(Arrays.type([], 'number')).toBe(true));
    it('false if not all elements are numbers', () => expect(Arrays.type([1, 4, 'string', 120], 'number')).toBe(false));
    it('false if some elements are null', () => expect(Arrays.type([1, 4, null, 120], 'number')).toBe(false));
    it('false if some elements are undefined', () => expect(Arrays.type([1, 4, undefined, 120], 'number')).toBe(false));
    it('true if elements match constructor', () => expect(Arrays.type([new Date(), new Date()], Date)).toBe(true));
});

describe('Arrays.sort() should', () => {
    describe('for numbers', () => {
        it('properly sort an array (ascending)', () => expect(Arrays.sort([5, 3, 8])).toEqual([3, 5, 8]));
        it('properly sort an array (descending)', () => expect(Arrays.sort([5, 3, 8], 'descending')).toEqual([8, 5, 3]));
    });
    describe('for strings', () => {
        it('properly sort an array (ascending)', () => expect(Arrays.sort(['bananas', 'apples', 'pomegranate'])).toEqual(['apples', 'bananas', 'pomegranate']));
        it('properly sort an array (descending)', () => expect(Arrays.sort(['bananas', 'apples', 'pomegranate'], 'descending')).toEqual(['pomegranate', 'bananas', 'apples']));
    });
    describe('for dates', () => {
        it('properly sort an array (ascending)', () => {
            const date1 = new Date(2020, 5, 18);
            const date2 = new Date(2021, 2, 12);
            const date3 = new Date(2021, 8, 5);
            expect(Arrays.sort([date2, date3, date1])).toEqual([date1, date2, date3]);
        });
        it('properly sort an array (descending)', () => {
            const date1 = new Date(2020, 5, 18);
            const date2 = new Date(2021, 2, 12);
            const date3 = new Date(2021, 8, 5);
            expect(Arrays.sort([date2, date3, date1], 'descending')).toEqual([date3, date2, date1]);
        });
    });
});

describe('Arrays.clear() should', () => {
    it('clear the original array', () => {
        const array = [5, 3, 2];
        Arrays.clear(array);
        return expect(array.length).toEqual(0);
    });
});

describe('Arrays.clearNull() should', () => {
    it('clear all null or undefined elements from the original array', () => {
        const array = [1, 2, undefined, 5, 9, null, 3];
        Arrays.clearNull(array);
        return expect(Arrays.equal(array, [1, 2, 5, 9, 3])).toEqual(true);
    });
});
