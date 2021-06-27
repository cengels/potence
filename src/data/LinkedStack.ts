interface StackElement<T> {
    value: T;
    next?: StackElement<T>;
}

/**
 * An implementation of a stack in JavaScript using a linked list.
 * A stack is last-in-first-out (LIFO), so you can only ever add or remove
 * elements from the top of the stack (the "last" element).
 * 
 * Note that, since linked lists generally aren't placed in contiguous memory,
 * performance is often subpar compared to an array-based queue.
 */
export default class LinkedStack<T> {
    private top?: StackElement<T>;

    /** 
     * Constructs a new Stack.
     * 
     * @param elements Initial elements to add to the Stack.
     *   Note that these are added in-sequence, i.e. the first element
     *   is the one at the *bottom*, not the top.
     */
    public constructor(...elements: T[]) {
        for (const element of elements) {
            this.push(element);
        }
    }

    /**
     * Adds an element to the top of the Stack.
     */
    public push(element: T): void {
        this.top = {
            value: element,
            next: this.top
        };
    }

    /**
     * Removes the topmost element from the stack and returns it.
     * 
     * This function will throw an error if the Stack is empty.
     */
    public pop(): T {
        if (this.top == null) {
            throw new Error(`Can't pop(): Stack had no elements.`);
        }

        const { value, next } = this.top;

        this.top = next;

        return value;
    }

    /**
     * Returns the topmost element without removing it from the Stack.
     * If the Stack is empty, returns `undefined`.
     */
    public peek(): T | undefined {
        return this.top?.value;
    }

    /** Returns true if the Stack is empty. */
    public isEmpty(): boolean {
        return this.top == null;
    }
}
