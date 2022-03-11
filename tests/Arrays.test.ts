import * as Arrays from '../src/arrays/index.js';
import List from '../src/arrays/List.js';
import * as Numbers from '../src/numbers/index.js'
import * as Objects from '../src/objects/index.js'

describe('Arrays.clone() should', () => {
    it('create an equivalent array', () => {
        const source = [1, 3, 5];
        const clone = Arrays.clone([1, 3, 5]);

        expect(clone === source).toBe(false);
        expect(Arrays.equal(source, clone)).toBe(true);
    });
});

function* iterable() {
    yield 1;
    yield 1;
    yield 3;
}

function* emptyIterable() {
    // iterable that contains no elements
}

describe('Arrays.count() should work with', () => {
    it('arrays', () => expect(Arrays.count([1, 3, 5])).toBe(3));
    it('sets', () => expect(Arrays.count(new Set([1, 3, 5]))).toBe(3));
    it('maps', () => expect(Arrays.count(new Map([[1, 2], [2, 3]]))).toBe(2));
    it('array-likes', () => expect(Arrays.count({ length: 5 })).toBe(5));
    it('set-likes', () => expect(Arrays.count({ size: 5 })).toBe(5));
    it('generators', () => expect(Arrays.count(iterable())).toBe(3));
});

describe('Arrays.first() should return', () => {
    it('the first element in an array', () => expect(Arrays.first([1, 3, 5])).toBe(1));
    it('undefined in an empty array', () => expect(Arrays.first([])).toBe(undefined));
    it('undefined in an empty iterable', () => expect(Arrays.first(emptyIterable())).toBe(undefined));
    it('the first element in a set', () => expect(Arrays.first(new Set([2, 5, 2]))).toBe(2));
    it('the first element in an iterable', () => expect(Arrays.first(iterable())).toBe(1));
});

describe('Arrays.last() should return', () => {
    it('the last element in an array', () => expect(Arrays.last([1, 3, 5])).toBe(5));
    it('undefined in an empty array', () => expect(Arrays.last([])).toBe(undefined));
    it('undefined in an empty iterable', () => expect(Arrays.last(emptyIterable())).toBe(undefined));
    it('the last element in a set', () => expect(Arrays.last(new Set([2, 5, 7]))).toBe(7));
    it('the last element in an iterable', () => expect(Arrays.last(iterable())).toBe(3));
});

describe('Arrays.inBounds() should return', () => {
    it('true if the index is the array\'s lower bound', () => expect(Arrays.isInBounds([1, 3, 5], 0)).toBe(true));
    it('true if the index is the array\'s upper bound', () => expect(Arrays.isInBounds([1, 3, 5], 2)).toBe(true));
    it('false if the index is lower than 0', () => expect(Arrays.isInBounds([1, 3, 5], -1)).toBe(false));
    it('false if the index is greater than array.length - 1', () => expect(Arrays.isInBounds([1, 3, 5], 3)).toBe(false));
    it('false if the array is empty', () => expect(Arrays.isInBounds([], 0)).toBe(false));
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

describe('Arrays.isEmpty() should return', () => {
    it('true if the array is empty', () => expect(Arrays.isEmpty([])).toBe(true));
    it('false if the array is not empty', () => expect(Arrays.isEmpty([1])).toBe(false));
    it('true if the set is empty', () => expect(Arrays.isEmpty(new Set())).toBe(true));
    it('false if the set is not empty', () => expect(Arrays.isEmpty(new Set([1]))).toBe(false));
    it('true if the iterable is empty', () => expect(Arrays.isEmpty(emptyIterable())).toBe(true));
    it('false if the iterable is not empty', () => expect(Arrays.isEmpty(iterable())).toBe(false));
});

describe('Arrays.isNotEmpty() should return', () => {
    it('true if the array is not empty', () => expect(Arrays.isNotEmpty([1])).toBe(true));
    it('false if the array is empty', () => expect(Arrays.isNotEmpty([])).toBe(false));
    it('true if the set is not empty', () => expect(Arrays.isNotEmpty(new Set([1]))).toBe(true));
    it('false if the set is empty', () => expect(Arrays.isNotEmpty(new Set())).toBe(false));
    it('true if the iterable is not empty', () => expect(Arrays.isNotEmpty(iterable())).toBe(true));
    it('false if the iterable is empty', () => expect(Arrays.isNotEmpty(emptyIterable())).toBe(false));
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

describe('Arrays.removeAt() should', () => {
    it('remove an array element by index', () => expect(Arrays.removeAt([1, 3, 5], 2)).toEqual([1, 3]));
    it('throw if the index is out of bounds', () => expect(() => Arrays.removeAt([1, 3, 5], 3)).toThrowError());
});

describe('Arrays.replace() should', () => {
    it('replace an array element', () => expect(Arrays.replace([1, 3, 5], 3, 6)).toEqual([1, 6, 5]));
    it('throw an error if element is not found', () => expect(() => Arrays.replace([1, 3, 5], 4, 6)).toThrowError());
});

describe('Arrays.replaceAll() should', () => {
    it('replace all array elements', () => expect(Arrays.replaceAll([1, 3, 5], [4, 3, 2, 1])).toEqual([4, 3, 2, 1]));
});

describe('Arrays.insert() should', () => {
    it('insert an element at index', () => expect(Arrays.insert([1, 3, 5], 2, 0)).toEqual([1, 3, 0, 5]));
    it('insert multiple elements at index', () => expect(Arrays.insert([1, 3, 5], 2, 0, 9, 9)).toEqual([1, 3, 0, 9, 9, 5]));
    it('error when index is lower than bounds', () => expect(() => Arrays.insert([1, 3, 5], -1, 0)).toThrowError());
    it('error when index is higher than bounds', () => expect(() => Arrays.insert([1, 3, 5], 4, 0)).toThrowError());
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
    it('return the original array if no sort is possible', () => expect(Arrays.sort([])).toStrictEqual([]));
    it('throw an error if type is neither number[], string[] or Date[]', () => expect(() => Arrays.sort([{}, [5, 3]])).toThrowError());
    it('throw an error if type is mixed', () => expect(() => Arrays.sort([5, 'yes'])).toThrowError());
    it('not result in infinite recursion on Lists', () => {
        const list = new List([0], [0, 1, 2], [0, 1]);
        const spy = jest.spyOn(list, 'sort');

        list.sort((a, b) => a.length - b.length);

        expect(list[0].length === 1).toBe(true);
        expect(list[1].length === 2).toBe(true);
        expect(list[2].length === 3).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('properly sort lists with sort function', () => {
        function vec(x: number, y: number, z: number) { return { x, y, z }; }
        const list = new List(vec(2, 4, 1), vec(-3, 2, 6), vec(6, 2, 1));
        
        list.sort((a, b) => a.x - b.x);

        const comparisonList = new List(vec(-3, 2, 6), vec(2, 4, 1), vec(6, 2, 1));

        expect(list).toEqual(comparisonList);
    });
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
    describe('properly handle sort functions', () => {
        it('properly sort an array (ascending) with 1 sort function', () => expect(Arrays.sort(['bananas', 'apples', 'pomegranate'], (a, b) => a.length - b.length)).toEqual(['apples', 'bananas', 'pomegranate']));
        it('properly sort an array (descending) with 1 sort function', () => expect(Arrays.sort(['bananas', 'apples', 'pomegranate'], (a, b) => b.length - a.length)).toEqual(['pomegranate', 'bananas', 'apples']));
        it('leave order unchanged if results are identical', () => expect(Arrays.sort(['pear', 'lime', 'pomegranate'], (a, b) => a.length - b.length)).toEqual(['pear', 'lime', 'pomegranate']));
        it('fall back to second sort function', () => expect(Arrays.sort(['pear', 'lime', 'aresak'], (a, b) => a.length - b.length, (a, b) => a.localeCompare(b))).toEqual(['lime', 'pear', 'aresak']));
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

describe('Arrays.closest() should', () => {
    it('return the target number if empty', () => expect(Arrays.closest([], 5)).toEqual(5));
    it('return the closest number if all numbers', () => expect(Arrays.closest([5, 3, 0], 2)).toEqual(3));
    it('return the first number if two numbers are the same distance away', () => expect(Arrays.closest([5, 3, 0], 4)).toEqual(5));
    it('return the closest object if using callback', () => expect(Arrays.closest([[1, 2, 3], [5, 6, 7], [2, 3, 4]], element => Numbers.sum(...element), 13)).toEqual([2, 3, 4]));
    // @ts-expect-error
    it('throw an error if no callback is specified and array is not number[]', () => expect(() => Arrays.closest([[1, 2, 3], [5, 6, 7], [2, 3, 4]], 13)).toThrowError());
});

describe('Arrays.moveAll() should', () => {
    it('shift the array by x places (forward)', () => expect(Arrays.moveAll([1, 2, 3], 2)).toEqual([2, 3, 1]));
    it('shift the array by x places (backward)', () => expect(Arrays.moveAll([1, 2, 3], -1)).toEqual([2, 3, 1]));
    it('don\'t shift the array if x is 0', () => expect(Arrays.moveAll([1, 2, 3], 0)).toEqual([1, 2, 3]));
    it('don\'t shift the array if x is array.length', () => expect(Arrays.moveAll([1, 2, 3], 3)).toEqual([1, 2, 3]));
    it('don\'t shift the array if x is a multiple of array.length', () => expect(Arrays.moveAll([1, 2, 3], 9)).toEqual([1, 2, 3]));
    it('shift the array by x places if x is bigger than array.length', () => expect(Arrays.moveAll([1, 2, 3], 5)).toEqual([2, 3, 1]));
});

describe('Arrays.zip() should', () => {
    it('return 2D array if no other arrays are passed', () => expect(Arrays.zip([1, 2, 3])).toEqual([[1], [2], [3]]));
    it('throw if arrays don\'t have the same length', () => expect(() => Arrays.zip([1, 2, 3], [1, 2])).toThrowError());
    it('merge 2 arrays', () => expect(Arrays.zip([1, 2, 3], ['one', 'two', 'three'])).toEqual([[1, 'one'], [2, 'two'], [3, 'three']]));
    it('merge 3 arrays', () => expect(Arrays.zip([1, 2, 3], ['one', 'two', 'three'], [0.1, 0.2, 0.3])).toEqual([[1, 'one', 0.1], [2, 'two', 0.2], [3, 'three', 0.3]]));
});

describe('Arrays.groupBy() should', () => {
    it('group an array by a boolean', () => expect(Arrays.groupBy([1, 2, 3], num => num < 3)).toEqual([[1, 2], [3]]));
    it('group an array by a property', () => expect(Arrays.groupBy([1, 1, 3], num => num)).toEqual([[1, 1], [3]]));
    it('group an array by an equatable property', () => {
        function t(value: string) {
            return {
                value,
                equals(object: unknown): boolean {
                    return object != null && Objects.isObject(object) && object.value === value;
                }
            }
        }

        const one = t('one');
        const one2 = t('one');
        const three = t('three');

        expect(Arrays.groupBy([one, one2, three], value => value)).toEqual([[one, one2], [three]]);
    });
    it('group into a mapped expression', () => {
        const array = ['g1-v1', 'g1-v2', 'g2-v3', 'g1-v5', 'g2-v4'];
        const expected = [
            {
                group: 'g1',
                items: ['g1-v1', 'g1-v2', 'g1-v5']
            },
            {
                group: 'g2',
                items: ['g2-v3', 'g2-v4']
            }
        ];

        const result = Arrays.groupBy(array, value => value.split('-')[0], (prop, items) => ({ group: prop, items }));

        expect(result).toEqual(expected);
    });
});

describe('Arrays.correlate() should', () => {
    it('correlate elements from two arrays', () => {
        const results: number[] = [];
        Arrays.correlate([1, 2], [5, 2], (a, b) => results.push(a * b));
        expect(results).toEqual([5, 4]);
    });
    it('correlate elements from many arrays', () => {
        const results: string[] = [];
        Arrays.correlate([1, 2], ['9', '8'], [-5, -2], ['ha', 'fa'], (a, b, c, d) => results.push(a + b + c + d));
        expect(results).toEqual(['19-5ha', '28-2fa']);
    });
    it('throw if arrays are of different length', () => expect(() => Arrays.correlate([0], [1, 2], () => null)).toThrowError('Arrays.correlate(): all arrays must be of the same length.'));
    // @ts-expect-error
    it('throw if last argument is not a callback', () => expect(() => Arrays.correlate([0], [1, 2])).toThrowError('Arrays.correlate(): last argument must be a callback function.'));
    // @ts-expect-error
    it('throw if only one array supplied', () => expect(() => Arrays.correlate([0], () => null)).toThrowError('Arrays.correlate(): must specify at least two arrays.'));
});

describe('Arrays.distinct() should', () => {
    it('return empty array if empty array is passed', () => expect(Arrays.distinct([])).toEqual([]));
    it('return same elements if all elements are unique', () => expect(Arrays.distinct([1, 2, 3])).toEqual([1, 2, 3]));
    it('remove all duplicates', () => expect(Arrays.distinct([1, 1, 1, 1, 1, 2])).toEqual([1, 2]));
    it('ignore different references', () => expect(Arrays.distinct([{}, {}, [], []])).toEqual([{}, {}, [], []]));
    it('remove same references', () => {
        const ref = {};
        return expect(Arrays.distinct([ref, ref, {}])).toEqual([{}, {}]);
    });
    it('work with iterables', () => expect(Arrays.distinct(iterable())).toEqual([1, 3]));
});

describe('Arrays.hasDuplicates() should', () => {
    it('return false for empty array', () => expect(Arrays.hasDuplicates([])).toBe(false));
    it('return false if all elements are unique', () => expect(Arrays.hasDuplicates([1, 2, 3])).toBe(false));
    it('return true if there are duplicates', () => expect(Arrays.hasDuplicates([1, 1, 1, 1, 1, 2])).toBe(true));
    it('ignore different references', () => expect(Arrays.hasDuplicates([{}, {}, [], []])).toBe(false));
    it('return true for same references', () => {
        const ref = {};
        return expect(Arrays.hasDuplicates([ref, ref, {}])).toBe(true);
    });
    it('work with iterables', () => expect(Arrays.hasDuplicates(iterable())).toBe(true));
});

describe('Arrays.hasMultiple() should return', () => {
    it('true if array contains multiples of element', () => expect(Arrays.hasMultiple([1, 2, 2, 3], 2)).toBe(true));
    it('false if array does not contain multiples of element', () => expect(Arrays.hasMultiple([1, 2, 2, 3], 1)).toBe(false));
    it('false if array does not contain element', () => expect(Arrays.hasMultiple([1, 2, 2, 3], 77)).toBe(false));
});

describe('Arrays.range() should', () => {
    it('properly handle a sequential range', () => expect(Arrays.range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]));
    it('properly handle an inverted range', () => expect(Arrays.range(5, 0)).toEqual([5, 4, 3, 2, 1, 0]));
    it('properly handle an offset range', () => expect(Arrays.range(3, 6)).toEqual([3, 4, 5, 6]));
    it('properly handle a one-element range', () => expect(Arrays.range(21, 21)).toEqual([21]));
    it('properly handle a negative range', () => expect(Arrays.range(-8, -3)).toEqual([-8, -7, -6, -5, -4, -3]));
    it('properly handle an inverted negative range', () => expect(Arrays.range(-3, -8)).toEqual([-3, -4, -5, -6, -7, -8]));
    it('properly handle floating point numbers', () => expect(Arrays.range(4.4, 7.2)).toEqual([4.4, 5.4, 6.4]));
    it('properly handle integral step sizes', () => expect(Arrays.range(0, 6, 3)).toEqual([0, 3, 6]));
    it('properly handle negative integral step sizes', () => expect(Arrays.range(0, 6, -3)).toEqual([0, 3, 6]));
    it('properly handle a step size of zero', () => expect(() => Arrays.range(0, 6, 0)).toThrowError());
    it('properly handle floating point step sizes', () => expect(Arrays.range(0, 2, 0.5)).toEqual([0, 0.5, 1, 1.5, 2]));
    it('properly handle uneven floating point step sizes', () => Arrays.range(0, 2, 0.3).forEach((value, i) => expect(value).toBeCloseTo([0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8][i])));
});

describe('Arrays.findIndices() should', () => {
    it('find all number indices', () => expect(Arrays.findIndices([0, 0, 5, 2, 0, 8], 0)).toEqual([0, 1, 4]));
    it('return an empty array if nothing is found', () => expect(Arrays.findIndices([0, 0, 5, 2, 0, 8], 9)).toEqual([]));
    it('find all predicate results', () => expect(Arrays.findIndices([0, 0, 5, 2, 0, 8], num => num > 4)).toEqual([2, 5]));
});

describe('Arrays.difference() should', () => {
    it('return empty array with no arguments', () => expect(Arrays.difference()).toEqual([]));
    it('return same array as was passed in', () => expect(Arrays.difference([1, 2, 3])).toEqual([1, 2, 3]));
    it('leave out common elements', () => expect(Arrays.difference([0, 1, 2], [1, 2, 3])).toEqual([0, 3]));
    it('leave out common elements (3+ arrays)', () => expect(Arrays.difference([0, 1, 2], [1, 2, 3], [0, 1])).toEqual([3]));
    it('union arrays with no common elements', () => expect(Arrays.difference([0, 1], [2, 3])).toEqual([0, 1, 2, 3]));
});

describe('Arrays.intersection() should', () => {
    it('return empty array with no arguments', () => expect(Arrays.intersection()).toEqual([]));
    it('return same array as was passed in', () => expect(Arrays.intersection([1, 2, 3])).toEqual([1, 2, 3]));
    it('leave out non-common elements', () => expect(Arrays.intersection([0, 1, 2], [1, 2, 3])).toEqual([1, 2]));
    it('leave out non-common elements (3+ arrays)', () => expect(Arrays.intersection([0, 1, 2], [1, 2, 3], [1, 3])).toEqual([1]));
    it('be empty if arrays don\'t contain common elements', () => expect(Arrays.intersection([0, 1], [2, 3])).toEqual([]));
});

describe('Arrays.union() should', () => {
    it('return empty array with no arguments', () => expect(Arrays.union()).toEqual([]));
    it('return same array as was passed in', () => expect(Arrays.union([1, 2, 3])).toEqual([1, 2, 3]));
    it('union all items', () => expect(Arrays.union([0, 1, 2], [3, 4, 5])).toEqual([0, 1, 2, 3, 4, 5]));
    it('exclude duplicates', () => expect(Arrays.union([0, 1, 2], [2, 3, 4])).toEqual([0, 1, 2, 3, 4]));
    it('work with 3+ arrays', () => expect(Arrays.union([0, 1, 2], [2, 3, 4], [0, 3, 2, 7])).toEqual([0, 1, 2, 3, 4, 7]));
});
