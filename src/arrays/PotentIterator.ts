import { Objects, TupleType } from '..';
import { isIterable } from '../objects';

const addKeys = ['push', 'add', 'enqueue', 'attach'] as const;

// type Collection<T> = { add(element: T): unknown }
//     | { push(element: T): unknown }
//     | { enqueue(element: T): unknown };
type Collection<T> = _Collection<T, TupleType<typeof addKeys>>;
type _Collection<T, U> = U extends string ? { 
    [K in U]: (element: T) => unknown;
} : never;

function addToCollection<T>(collection: Collection<T>, element: T): void {
    for (const key of addKeys) {
        if (Objects.hasFunction(collection, key)) {
            collection[key](element);
            return;
        }
    }

    throw new Error(`PotentIterator.collect(): Could not collect into collection of type ${collection.constructor.name} as no viable add method was found.`);
}

const dummyIterator: Iterator<unknown> = {
    next() { throw new Error() }
}

function create<T>(next: (arg?: undefined) => IteratorResult<T | undefined>): PotentIterator<T> {
    // avoids unnecessary object allocation and garbage collection
    dummyIterator.next = next;

    return new PotentIterator<T>(dummyIterator as Iterator<T>);
}

/** 
 * Iterator that expands the built-in {@link Iterator} with powerful utility
 * iteration methods that consume or advance the iterator and promotes
 * iterator-centric (as opposed to collection-centric) design.
 * 
 * This is a *wrapper* for existing iterators. Existing iterators are not
 * mutated, but they _will_ be consumed by the methods in this class.
 * Any built-in iterator can be wrapped in a PotentIterator.
 * 
 * This class distinguishes between *consumer* and *producer* methods.  
 * A *consumer* method immediately consumes the underlying iterator and returns
 * an aggregated result.  
 * A *producer* method does not consume the underlying
 * iterator immediately; instead it creates a new iterator that operates on
 * and consumes the underlying iterator when it is itself consumed.
 * 
 * All methods that modify the iterated sequence are producer methods, and
 * thus lazily executed. This allows you to chain function calls without
 * worrying about redundant iterations.  
 * For instance, in a standard JavaScript array,
 * `strings.filter(x => x.startsWith('/')).map(x => x.slice(1))`
 * would iterate over the entire array twice. Using PotentIterator, the
 * same function calls will only iterate over the array once.
 */
export default class PotentIterator<T> implements IterableIterator<T> {
    public next: (...args: [] | [undefined]) => IteratorResult<T, undefined>;
    public return?: (value?: unknown) => IteratorResult<T, undefined>;
    public throw?: (e?: unknown) => IteratorResult<T, undefined>;

    /** 
     * Creates a new iterator based on an existing iterator or iterable.
     * Note that _no copy_ will be created of the underlying iterator; this
     * iterator operates directly on the underlying iterator, consuming it in
     * the process.
     */
    public constructor(iterator: Iterator<T> | Iterable<T>) {
        if (isIterable(iterator)) {
            iterator = iterator[Symbol.iterator]();
        }

        this.next = iterator.next;
        this.return = iterator.return;
        this.throw = iterator.throw;
    }

    [Symbol.iterator](): PotentIterator<T> {
        return this;
    }

    //#region consumer methods

    /** 
     * Consumes the first element of the iterator and returns it,
     * or `undefined` if the sequence was empty.
     */
    public first(): T | undefined {
        return this.next().value;
    }

    /** 
     * Consumes the iterator and returns the last element,
     * or `undefined` if the sequence was empty.
     */
    public last(): T | undefined {
        let last: T | undefined;
    
        for (const element of this) {
            last = element;
        }
    
        return last;
    }

    /** 
     * Returns the `n`th element in the iterator,
     * or `undefined` if there is no element at that position.
     * This consumes the returned element as well as all
     * preceding elements in the iterator.
     * 
     * This function is zero-indexed.
     */
    public nth(n: number): T | undefined {
        return this.skip(n).first();
    }

    /** 
     * Consumes the iterator until an element is found that matches the
     * predicate, then returns it.
     * 
     * Note that this method will consume the entire iterator only if no
     * matching element is found.
     */
    public find(predicate: (value: T) => boolean): T | undefined {
        return this.filter(predicate).first();
    }

    /** 
     * Consumes the iterator and returns the last element that matches
     * the predicate.
     * 
     * This method will always consume the entire iterator.
     */
    public findLast(predicate: (value: T) => boolean): T | undefined {
        return this.filter(predicate).last();
    }

    /** 
     * Consumes the iterator until an element is found that matches the
     * predicate, then returns its index.
     * 
     * Note that this method will consume the entire iterator only if no
     * matching element is found.
     * 
     * If no element is found that matches the predicate, returns `-1`.
     */
    public findIndex(predicate: (value: T) => boolean): number {
        return this.indexed().filter(x => predicate(x[0])).first()?.[1] ?? -1;
    }

    /** 
     * Consumes the iterator and returns the index of the last element that
     * matches the predicate.
     * 
     * This method will always consume the entire iterator.
     * 
     * If no element is found that matches the predicate, returns `-1`.
     */
    public findLastIndex(predicate: (value: T) => boolean): number {
        return this.indexed().filter(x => predicate(x[0])).last()?.[1] ?? -1;
    }

    /**
     * Consumes the iterator and executes the provided callback function
     * for every element in the sequence.
     * 
     * Unless you already have a predefined callback function (like
     * `iterator.forEach(myFunc)`) or your callback function is a one-liner
     * it is generally recommended to use a standard `for` loop instead.
     */
    public forEach(callback: (value: T, i: number) => void): void {
        let i: number = 0;

        for (const element of this) {
            callback(element, i++);
        }
    }

    /**
     * Consumes the iterator and returns `true` if every element matched
     * the predicate, otherwise `false`.
     * 
     * If the iterator contains no elements, returns `true`.
     * 
     * Note that the iterator is only consumed until an element is encountered
     * which does not match the predicate. If every element matches the
     * predicate, the iterator is fully consumed.
     */
    public every(predicate: (value: T) => boolean): boolean {
        for (const element of this) {
            if (!predicate(element)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Consumes the iterator and returns `true` if at least one element matched
     * the predicate, otherwise `false`.
     * 
     * If the iterator contains no elements, returns `false`.
     * 
     * Note that the iterator is only consumed until an element is encountered
     * which matches the predicate. If no element matches the predicate, the
     * iterator is fully consumed.
     */
    public some(predicate: (value: T) => boolean): boolean {
        for (const element of this) {
            if (predicate(element)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Consumes the iterator and returns an aggregated result by applying
     * a reducer function to each element.
     * 
     * @example
     * new PotentIterator([3, 5, 9, 1]).reduce((acc, element) => acc > element ? acc : element, -Infinity);
     * // Output: 9
     */
    public reduce<U>(callback: (accumulator: U, element: T, i: number) => U, initialValue: U): U {
        let value = initialValue;
        let i: number = 0;

        for (const element of this) {
            value = callback(value, element, i++);
        }

        return value;
    }

    /** Consumes the iterator and returns the remaining number of iterations. */
    public count(): number {
        return this.reduce(acc => acc + 1, 0);
    }

    /** 
     * Consumes the iterator and returns the sum of all elements.
     * 
     * If any of the elements are not coercible to a number, returns `NaN`.
     */
    public sum(): number {
        return this.reduce((acc, element) => acc + Number(element), 0);
    }

    /** 
     * Consumes the iterator and returns the largest element.
     * 
     * If any of the elements are not coercible to a number or
     * the iterator contains no elements, returns `NaN`.
     */
    public max(): number {
        const value = this.reduce((acc, element) => {
            const value = Number(element);

            return acc > value ? acc : value;
        }, -Infinity);

        return Number.isFinite(value) ? value : Number.NaN;
    }

    /** 
     * Consumes the iterator and returns the smallest element.
     * 
     * If any of the elements are not coercible to a number or
     * the iterator contains no elements, returns `NaN`.
     */
    public min(): number {
        const value = this.reduce((acc, element) => {
            const value = Number(element);

            return acc < value ? acc : value;
        }, Infinity);

        return Number.isFinite(value) ? value : Number.NaN;
    }

    /** Consumes the iterator and returns all remaining elements as an array. */
    public collect(): T[];
    /** Consumes the iterator and adds all remaining elements to the collection. */
    public collect<U extends Collection<T>>(into: U): U;
    public collect(into?: Collection<T>): Collection<T> {
        if (into == null) {
            return [...this];
        }

        for (const element of this) {
            addToCollection(into, element);
        }

        return into;
    }

    /** 
     * Consumes the iterator and calls `console.log()` on each element.
     * Useful for debug output.
     */
    public log(): void {
        this.forEach(console.log);
    }

    //#endregion
    
    //#region Producer methods

    /** 
     * Creates a new iterator that skips (consuming) the first `n` elements
     * and yields only the remaining elements.
     * 
     * If there are less than `n` elements in the iterator, no more elements
     * will be yielded.
     * 
     * @example
     * new PotentIterator([0, 1, 2, 3]).skip(2).log();
     * // Output:
     * // 2
     * // 3
     */
    public skip(n: number): PotentIterator<T> {
        let i: number = 0;

        return create(arg => {
            for (; i < n; i++) {
                this.next(arg);
            }
            
            return this.next(arg);
        });
    }

    /** 
     * Creates a new iterator that yields at most the first `n` elements of
     * this iterator.
     * 
     * If `n` is less than the number of elements in the iterator, the new
     * iterator will instead stop after the last element has been consumed.
     * 
     * @example
     * new PotentIterator([0, 1, 2, 3]).take(2).log();
     * // Output:
     * // 0
     * // 1
     */
    public take(n: number): PotentIterator<T> {
        let i: number = 0;

        return create(arg => {
            for (; i < n; i++) {
                return this.next(arg);
            }

            return { done: true, value: undefined };
        });
    }

    /** 
     * Creates a new iterator that iterates through this iterator and then
     * the passed iterator consecutively, thus chaining them and effectively
     * extending the number of elements in the iterator by the number of
     * elements in `iterator`.
     * 
     * @example
     * new PotentIterator([0, 1, 2]).chain([3, 4, 5]).map(x => -x).log();
     * // Output:
     * // 0
     * // -1
     * // -2
     * // -3
     * // -4
     * // -5
     */
    public chain(iterator: Iterator<T> | Iterable<T>): PotentIterator<T> {
        const other = isIterable(iterator) ? iterator[Symbol.iterator]() : iterator;

        return create(arg => {
            const result = this.next(arg);

            if (result.done === true) {
                return other.next(arg)
            }

            return result;
        });
    }
    
    /**
     * Creates a new iterator that combines the two iterators by executing and
     * consuming them side-by-side, returning each element as part of a tuple
     * every iteration.
     * The length of the new iterator will be the length of the smallest of the
     * two iterators. For example, if the first iterator has 5 elements and the
     * second iterator has 7, the new iterator will at most iterate 5 times.
     * 
     * @example
     * new PotentIterator([0, 1, 2]).zip(['one', 'two']).log();
     * // Output:
     * // [0, 'one']
     * // [1, 'two']
     */
    public zip<U>(iterator: Iterator<U> | Iterable<U>): PotentIterator<[T, U]> {
        const other = isIterable(iterator) ? iterator[Symbol.iterator]() : iterator;

        return create(arg => {
            const result1 = this.next(arg);
            const result2 = other.next(arg);

            if (result1.done === true || result2.done === true) {
                return { done: true, value: undefined };
            }

            return {
                done: false,
                value: [result1.value, result2.value]
            }
        });
    }

    /** 
     * Creates a new iterator with each element of type `T` mapped to a `U`.
     * 
     * @example
     * new PotentIterator([0, 1, 2]).map(x => x * 2).log();
     * // Output:
     * // 0
     * // 2
     * // 4
     */
    public map<U>(callback: (value: T, index: number) => U): PotentIterator<U> {
        let index: number = 0;

        return create(arg => {
            const result1 = this.next(arg);

            if (result1.done === true) {
                return result1;
            }

            return {
                done: false,
                value: callback(result1.value, index++)
            }
        });
    }

    /** 
     * Creates a new iterator with elements filtered that do not match the
     * predicate.
     * 
     * @example
     * new PotentIterator([-4, 2, -9, 1]).filter(x => x >= 0).log();
     * // Output:
     * // 2
     * // 1
     */
    public filter(predicate: (value: T, index: number) => boolean): PotentIterator<T> {
        let index: number = 0;

        return create(arg => {
            let result = this.next(arg);

            for (; result.done !== true; result = this.next(arg)) {
                if (predicate(result.value, index++)) {
                    return result;
                }
            }

            return result;
        });
    }

    /** 
     * Creates a new iterator where each element is a tuple composed of the
     * original element and its original index. Useful to keep the information
     * about the original index if you intend to constrain the sequence.
     * 
     * @example
     * new PotentIterator([9, 8, 7, 6]).indexed().skip(2).log();
     * // Output:
     * // [7, 2]
     * // [6, 3]
     */
    public indexed(): PotentIterator<[T, number]> {
        return this.map((element, index) => [element, index]);
    }

    //#endregion
}
