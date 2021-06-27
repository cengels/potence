/**
 * An implementation of a queue in JavaScript using a linked list.
 * A queue is first-in-first-out (FIFO), so you can only ever add elements
 * to the back of the queue but remove elements from the front of the queue.
 * 
 * Note that, since linked lists generally aren't placed in contiguous memory,
 * performance is often subpar compared to an array-based queue.
 */
export default class Queue<T> {
    private readonly array: T[];

    /** 
     * Constructs a new Queue.
     * 
     * @param elements Initial elements to add to the Queue.
     */
    public constructor(...elements: T[]) {
        this.array = elements;
    }

    /**
     * Adds an element to the back of the Queue.
     */
    public enqueue(element: T): void {
        this.array.unshift(element);
    }

    /**
     * Removes the frontmost element from the Queue and returns it.
     * 
     * This function will throw an error if the Queue is empty.
     */
    public dequeue(): T {
        const head = this.array.pop();

        if (head == null) {
            throw new Error(`Can't dequeue(): Stack had no elements.`);
        }

        return head;
    }

    /**
     * Returns the frontmost element without removing it from the Queue.
     * If the Queue is empty, returns `undefined`.
     */
    public peek(): T | undefined {
        return this.array[this.array.length - 1];
    }

    /** Returns true if the Queue is empty. */
    public isEmpty(): boolean {
        return this.array.length === 0;
    }
}
