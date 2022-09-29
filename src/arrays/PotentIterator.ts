import { Objects, TupleType } from '..';

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
 */
export default class PotentIterator<T> implements IterableIterator<T> {
    public next: (...args: [] | [undefined]) => IteratorResult<T, undefined>;
    public return?: (value?: unknown) => IteratorResult<T, undefined>;
    public throw?: (e?: unknown) => IteratorResult<T, undefined>;

    /** 
     * Creates a new iterator based on an existing iterator. Note that 
     * any methods that consume the PotentIterator also consume the
     * underlying iterator passed here.
     */
    public constructor(iterator: Iterator<T>) {
        this.next = iterator.next;
        this.return = iterator.return;
        this.throw = iterator.throw;
    }

    [Symbol.iterator](): PotentIterator<T> {
        return this;
    }

    /** Consumes the iterator and returns the remaining number of iterations. */
    public count(): number {
        let i: number = 0;

        for (const _ of this) {
            i++;
        }

        return i;
    }

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
        let last: T | undefined = undefined;
    
        for (const element of this) {
            last = element;
        }
    
        return last;
    }

    /** 
     * Skips the next `steps` iterations and returns the iterator.
     * If there are less than `steps` remaining iterations left in the
     * iterator, the iterator is simply consumed and returned.
     */
    public skip(steps: number): this {
        if (steps <= 0) {
            return this;
        }

        let i: number = 0;

        for (const _ of this) {
            i++;

            if (i >= steps) {
                break;
            }
        }

        return this;
    }

    /** 
     * Creates a new iterator that returns the first `n` elements of
     * this iterator. Note that the original iterator is partially consumed
     * in the process.
     * 
     * If `n` is less than the number of elements in the iterator, the new
     * iterator will instead stop after the last element has been consumed.
     */
    public take(n: number): PotentIterator<T> {
        return create(arg => {
            for (let i: number = 0; i < n; i++) {
                return this.next(arg);
            }

            return { done: true, value: undefined };
        });
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
        this.skip(n);

        return this.first();
    }

    /** 
     * Returns a new PotentIterator that combines the two iterators
     * by chaining them, thus executing them consecutively and extending
     * the number of elements in this iterator by the number of elements
     * in `iterator`.
     */
    public chain(iterator: Iterator<T>): PotentIterator<T> {
        return create(arg => {
            const result = this.next(arg);

            if (result.done === true) {
                return iterator.next(arg)
            }

            return result;
        });
    }
    
    /**
     * Combines the two iterators by executing and consuming them side-by-side
     * and returning each element as part of a tuple every iteration.
     * The length of the new iterator will be the length of the smallest of the
     * two iterators. For example, if the first iterator has 5 elements and the
     * second iterator has 7, the new iterator will at most iterate 5 times.
     * 
     * Note that the resulting iterator contains a reference to this iterator,
     * not a copy. Consuming the resulting iterator also consumes this iterator.
     */
    public zip<U>(iterator: Iterator<U>): PotentIterator<[T, U]> {
        return create(arg => {
            const result1 = this.next(arg);
            const result2 = iterator.next(arg);

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
     * Maps each element in this iterator to `U` and returns a new
     * iterator that contains the results.
     * 
     * Note that the callback is _lazily executed_, that is, the iterator
     * is _not_ immediately consumed. Instead the callback is only executed
     * and this iterator consumed once the resulting iterator is consumed,
     * for instance by calling one of the available collector methods.
     */
    public map<U>(callback: (value: T) => U): PotentIterator<U> {
        return create(arg => {
            const result1 = this.next(arg);

            if (result1.done === true) {
                return result1;
            }

            return {
                done: false,
                value: callback(result1.value)
            }
        });
    }

    /** 
     * Filters out elements in this iterator that do not match the predicate
     * and returns a new iterator that contains the results.
     * 
     * Note that the callback is _lazily executed_, that is, the iterator
     * is _not_ immediately consumed. Instead the callback is only executed
     * and this iterator consumed once the resulting iterator is consumed,
     * for instance by calling {@link PotentIterator.collect}().
     */
    public filter(predicate: (value: T) => boolean): PotentIterator<T> {
        return create(arg => {
            let result = this.next(arg);

            for (; result.done !== true; result = this.next(arg)) {
                if (predicate(result.value)) {
                    return result;
                }
            }

            return result;
        });
    }

    /** 
     * Consumes the iterator until an element is found that matches the
     * predicate, then returns it.
     * 
     * Note that this method will consume the entire iterator if no matching
     * element is found.
     */
    public find(predicate: (value: T) => boolean): T | undefined {
        return this.filter(predicate).first();
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
}
