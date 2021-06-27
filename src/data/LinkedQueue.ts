interface QueueElement<T> {
    value: T;
    previous?: QueueElement<T>;
}

/**
 * An implementation of a queue in JavaScript using a linked list.
 * A queue is first-in-first-out (FIFO), so you can only ever add elements
 * to the back of the queue but remove elements from the front of the queue.
 * 
 * Note that, since linked lists generally aren't placed in contiguous memory,
 * performance is often subpar compared to an array-based queue.
 */
export default class LinkedQueue<T> {
    private head?: QueueElement<T>;
    private tail?: QueueElement<T>;

    /** 
     * Constructs a new Queue.
     * 
     * @param elements Initial elements to add to the Queue.
     */
    public constructor(...elements: T[]) {
        for (const element of elements) {
            this.enqueue(element);
        }
    }

    /**
     * Adds an element to the back of the Queue.
     */
    public enqueue(element: T): void {
        const queueElement: QueueElement<T> = {
            value: element,
            previous: undefined
        };

        if (this.tail != null) {
            this.tail.previous = queueElement;
        }

        this.tail = queueElement;

        if (this.head == null) {
            this.head = this.tail;
        }
    }

    /**
     * Removes the frontmost element from the Queue and returns it.
     * 
     * This function will throw an error if the Queue is empty.
     */
    public dequeue(): T {
        if (this.tail == null || this.head == null) {
            throw new Error(`Can't dequeue(): Stack had no elements.`);
        }

        const { value, previous } = this.head;

        this.head = previous;

        return value;
    }

    /**
     * Returns the frontmost element without removing it from the Queue.
     * If the Queue is empty, returns `undefined`.
     */
    public peek(): T | undefined {
        return this.head?.value;
    }

    /** Returns true if the Queue is empty. */
    public isEmpty(): boolean {
        return this.head == null && this.tail == null;
    }
}
