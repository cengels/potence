// TODO:
/* v8 ignore start */

import { isIterable } from '../objects/index.js';
import PotentIterator from './PotentIterator.js';


function* makeReverseIterator<T>(source: Iterator<T> | Iterable<T>): Generator<T> {
    let array: T[];

    if (Array.isArray(source)) {
        array = source;
    } else {
        if (isIterable(source)) {
            source = source[Symbol.iterator]();
        }

        let current: IteratorResult<T>;
        array = [];

        while (!(current = source.next()).done) {
            array.push(current.value);
        }
    }

    for (let i: number = array.length - 1; i >= 0; i--) {
        yield array[i];
    }
}

/**
 * Iterator that expands the built-in {@link Iterator} with powerful utility
 * iteration methods that consume or advance the iterator and promotes
 * iterator-centric (as opposed to collection-centric) design. See
 * {@link PotentIterator} for more information.
 * 
 * Unlike {@link PotentIterator}, this iterator consumes the underlying object
 * in reverse order, i.e. from last to first element. **Note that only arrays
 * maintain lazy evaluation**; passing any other type of iterable or iterator
 * to the constructor will consume the iterator in its entirety to be able to
 * reverse it.
 */
export default class ReversePotentIterator<T> extends PotentIterator<T> {
    public constructor(iterator: Iterator<T> | Iterable<T>) {
        super(makeReverseIterator(iterator));
    }
}
