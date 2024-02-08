/**
 * Represents a classic stack-based type. A stack is last-in-first-out (LIFO),
 * so you can only ever add or remove elements from the top of the stack
 * (the most recently added element).
 *
 * To ensure the stack uses contiguous memory, this data type uses an
 * array internally.
 */
export default class Stack<T> implements Iterable<T> {
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

    [Symbol.iterator](): Iterator<T> {
        return this.array[Symbol.iterator]();
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

    /** Gets the number of elements in the Stack. */
    public get size(): number {
        return this.array.length;
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

    /** Returns an array representation of this Stack. */
    public toJSON(): T[] {
        return [...this];
    }
}
