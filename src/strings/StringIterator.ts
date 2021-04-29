import { Strings } from '..';

/** An iterator that facilitates iterating over a string. */
export class StringIterator {
    private readonly string: string;
    #currentIndex: number = 0;

    public constructor(string: string) {
        this.string = string;
    }

    /** Returns the current index. */
    public current(): number {
        return this.#currentIndex;
    }

    /** Peeks at the next `length` characters in the string. */
    public peek(length: number = 1): string {
        if (length < 0) {
            throw new Error('length must be positive.');
        }

        if (this.isAtEnd()) {
            return '';
        }

        return this.string.substr(this.#currentIndex, length);
    }
    
    /** Iterates over the next `length` characters and returns them. */
    public next(length: number = 1): string {
        const substring = this.peek(length);

        this.#currentIndex += length;

        return substring;
    }
    
    /** 
     * Skips the specified substring if the iterator finds it at its
     * current position and returns true, otherwise returns false.
     */
    public skip(substring: string): boolean {
        if (this.isAt(substring)) {
            this.#currentIndex += substring.length;
            return true;
        }

        return false;
    }

    /** 
     * If the next character is a digit, returns it as a number and increments
     * the iterator's position. Otherwise returns `undefined` and leaves the
     * iterator's position unchanged.
     */
    public nextDigit(): number | undefined {
        const nextCharacter = this.peek();

        if (Strings.isNumber(nextCharacter)) {
            this.#currentIndex++;
            
            return Number(nextCharacter);
        }

        return undefined;
    }

    /** 
     * If the next character is a digit, returns it and all following digits
     * as a number and increments the iterator's position. Otherwise returns
     * `undefined` and leaves the iterator's position unchanged.
     */
    public nextInt(): number | undefined {
        let nextCharacter = this.peek();
        let numberString: string = '';

        while (Strings.isNumber(nextCharacter)) {
            this.#currentIndex++;
            numberString += nextCharacter;
            nextCharacter = this.peek();
        }

        if (numberString.length === 0) {
            return undefined;
        }

        return Number(numberString);
    }

    /** 
     * Finds the next occurrence of `substring` and returns the number of
     * characters between its start index and the iterator's current position.
     * If the substring was not found in the remaining part of the string,
     * returns -1.
     */
    public findNext(substring: string): number {
        const index = this.string.indexOf(substring, this.#currentIndex);

        if (index === -1) {
            return index;
        }

        return index - this.#currentIndex;
    }

    /** 
     * Iterates through the remainder of the string and returns that remainder,
     * placing the iterator at the end of the string.
     */
    public toEnd(): string {
        const substring = this.string.slice(this.#currentIndex, this.string.length);

        this.#currentIndex = this.string.length;

        return substring;
    }

    /** 
     * Returns true if the iterator is currently positioned
     * right before the specified substring.
     */
    public isAt(substring: string): boolean {
        return this.string.substr(this.#currentIndex, substring.length) === substring;
    }

    /** Returns true if the iterator is still at the beginning of the string. */
    public isAtStart(): boolean {
        return this.#currentIndex === 0;
    }

    /** Returns true if the iterator has reached the end of the string. */
    public isAtEnd(): boolean {
        return this.#currentIndex >= this.string.length;
    }
}
