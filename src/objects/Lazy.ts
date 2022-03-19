/** 
 * Represents a lazily evaluated value, i.e. a value that is only evaluated
 * when it is first retrieved.
 */
export default class Lazy<T> {
    private value?: T;
    private readonly callback: () => T;

    public constructor(callback: () => T) {
        this.callback = callback;
    }

    /** 
     * Retrieves the value contained in this Lazy instance.
     * If it has not yet been evaluated, this function will evaluate it.
     */
    public get(): T {
        if (this.value == null) {
            this.value = this.callback();
        }

        return this.value;
    }
}
