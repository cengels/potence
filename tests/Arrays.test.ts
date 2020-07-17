import * as Arrays from '../src/arrays';

describe('Arrays.clone() should', () => {
    it('create an equivalent array', () => {
        const source = [1, 3, 5];
        const clone = Arrays.clone([1, 3, 5]);

        expect(clone === source).toBe(false);
        expect(Arrays.compare(source, clone)).toBe(true);
    });
});

describe('Arrays.compare() should', () => {
    it('succeed in comparing an equivalent array', () => expect(Arrays.compare([1, 3, 5], [1, 3, 5])).toBe(true));
    it('fail to compare a non-equivalent array', () => expect(Arrays.compare([1, 4, 5], [1, 3, 5])).toBe(false));
    it('fail to compare arrays with varying length', () => expect(Arrays.compare([1, 3], [1, 3, 5])).toBe(false));
});

describe('Arrays.remove() should', () => {
    it('remove an element from an array', () => {
        const source = [1, 5, 8, 10];
        Arrays.remove(source, 5);
        expect(Arrays.compare(source, [1, 8, 10])).toBe(true);
    });
    it('remove multiple elements from an array', () => {
        const source = [1, 5, 8, 10];
        Arrays.remove(source, 5, 8);
        expect(Arrays.compare(source, [1, 10])).toBe(true);
    });
    it('remove multiple of the same element from an array', () => {
        const source = [1, 5, 5, 5, 5, 10];
        Arrays.remove(source, 5);
        expect(Arrays.compare(source, [1, 10])).toBe(true);
    });
    it('throw if the element does not exist in the array', () => {
        const source = [1, 2, 3, 5, 6, 7];
        expect(() => Arrays.remove(source, 4)).toThrowError();
    });
});
