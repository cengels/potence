/** 
 * Represents a lazily evaluated value, i.e. a value that is only evaluated
 * when it is first retrieved.
 */
export default class Lazy<T> {
    private value: T | (() => T);
    private evaluated: boolean = false;

    public constructor(callback: () => T) {
        this.value = callback;
    }

    /** 
     * Retrieves the value contained in this Lazy instance.
     * If it has not yet been evaluated, this function will evaluate it.
     */
    public get(): T {
        if (!this.evaluated) {
            this.value = (this.value as () => T)();
            this.evaluated = true;
        }

        return this.value as T
    }
}
