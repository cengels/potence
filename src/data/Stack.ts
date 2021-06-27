/**
 * An implementation of a stack in JavaScript using an array.
 * A stack is last-in-first-out (LIFO), so you can only ever add or remove
 * elements from the top of the stack (the "last" element).
 */
export default class Stack<T> {
    private readonly array: T[];

    /** 
     * Constructs a new Stack.
     * 
     * @param elements Initial elements to add to the Stack.
     *   Note that these are added in-sequence, i.e. the first element
     *   is the one at the *bottom*, not the top.
     */
    public constructor(...elements: T[]) {
        this.array = elements;
    }

    /**
     * Adds an element to the top of the Stack.
     */
    public push(element: T): void {
        this.array.push(element);
    }

    /**
     * Removes the topmost element from the stack and returns it.
     * 
     * This function will throw an error if the Stack is empty.
     */
    public pop(): T {
        const last = this.array.pop();

        if (last == null) {
            throw new Error(`Can't pop(): Stack had no elements.`);
        }

        return last;
    }

    /**
     * Returns the topmost element without removing it from the Stack.
     * If the Stack is empty, returns `undefined`.
     */
    public peek(): T | undefined {
        return this.array[this.array.length - 1];
    }

    /** Returns true if the Stack is empty. */
    public isEmpty(): boolean {
        return this.array.length === 0;
    }
}
