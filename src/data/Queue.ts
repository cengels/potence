import { nextIndex, previousIndex } from '../arrays';

const Empty = Symbol('empty-queue-element');
const QUEUE_BUFFER_SIZE = 24 as const;

/**
 * Represents a queue, i.e. a collection of elements structured in a
 * first-in-first-out (FIFO) manner. New elements are added to the *back*
 * of the queue, but elements are always retrieved from the *front*
 * of the queue.
 * 
 * ## Internals and performance
 * 
 * This type is implemented using a
 * [circular buffer](https://en.wikipedia.org/wiki/Circular_buffer)
 * backed by an array.
 * This makes the performance on most operations O(1). The only exception
 * is when a new element is to be added while the internal buffer is already
 * at capacity, in which case the buffer must first be resized.
 * Resizing does carry some performance penalty with it but is generally fast
 * enough not to be a concern for most code. If it is, however, you may use
 * {@link Queue.withCapacity}() to construct a Queue with a specified base
 * capacity, eliminating the need for resizing.
 */
export default class Queue<T> implements Iterable<T> {
    private readonly array: (T | typeof Empty)[];
    private start: number = 0;
    private end: number;
    #size: number = 0;

    /** 
     * Constructs a new Queue.
     * 
     * The initial size of the Queue will always be larger than the number
     * of elements added here during construction. If no elements are added,
     * the initial size of the Queue will be `24`. To instantiate a Queue
     * with a bigger base size, use {@link Queue.withCapacity}().
     * 
     * @param elements Initial elements to add to the Queue.
     */
    public constructor(...elements: T[]) {
        if (elements.length === 1 && elements[0] === Empty) {
            // Small hack to make it possible for internals to construct
            // a Queue without expanding it immediately.
            this.array = [];
            this.end = 0;
            
            return;
        }

        this.array = elements;
        this.#size = elements.length;
        this.end = elements.length - 1;

        this.#expand();
    }

    *[Symbol.iterator](): Iterator<T> {
        for (let i: number = this.start; i < this.end; i = nextIndex(this.array, i)) {
            yield this.array[i] as T;
        }
    }

    /** 
     * Constructs a new Queue with the given capacity. Useful for queues with a
     * small initial size that may accept a great number of new elements.
     */
    public static withCapacity<T>(capacity: number): Queue<T> {
        const queue = new Queue<T>(Empty as T);

        queue.#expand(capacity);

        return queue;
    }

    /**
     * Adds an element to the back of the Queue. This is an O(1) operation,
     * unless the queue is at capacity, in which case it has to be resized
     * first.
     */
    public enqueue(element: T): this {
        const previousEnd = previousIndex(this.array, this.end);

        if (this.start === previousEnd) {
            this.#expand();
        }

        this.start = previousIndex(this.array, this.start);

        this.array[this.start] = element;

        this.#size++;

        return this;
    }

    /**
     * Removes the frontmost element from the Queue and returns it.
     * 
     * This function will throw an error if the Queue is empty.
     */
    public dequeue(): T {
        if (this.isEmpty()) {
            throw new Error('Can\'t dequeue(): Queue is empty.');
        }

        const previousEnd = previousIndex(this.array, this.end);

        const head = this.array[this.end];
        this.array[this.end] = Empty;
        this.end = previousEnd;

        this.#size--;

        return head as T;
    }

    /**
     * Returns the frontmost element without removing it from the Queue.
     * If the Queue is empty, returns `undefined`.
     */
    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.array[this.end] as T;
    }

    /** Gets the number of elements in this Queue. */
    public get size(): number {
        return this.#size;
    }

    /** Returns `true` if the Queue is empty, otherwise `false`. */
    public isEmpty(): boolean {
        return this.start === this.end;
    }

    /** Returns an array representation of this Queue. */
    public toJSON(): T[] {
        return [...this];
    }

    /** 
     * Expands the internal array by either `QUEUE_BUFFER_SIZE` or the array's
     * own length (doubling its size), setting the new elements to the
     * {@link Empty} symbol.
     */
    #expand(to?: number): void {
        const previousLength = this.array.length;
        const expandBy = to != null
            ? this.array.length - to
            : this.array.length < QUEUE_BUFFER_SIZE
                ? QUEUE_BUFFER_SIZE
                : this.array.length;

        for (let i: number = 0; i < expandBy; i++) {
            this.array.push(Empty);
        }

        if (this.start > this.end) {
            // Move all values at the end of the array up to the new end.
            const lengthDifference = previousLength - this.start;

            for (let i: number = this.start; i < previousLength; i++) {
                this.array[i + lengthDifference] = this.array[i];
                this.array[i] = Empty;
            }

            this.start += lengthDifference;
        }
    }
}
