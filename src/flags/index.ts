function throwOnInvalidFlag(value: number): void | never {
    if (value < 0 || !Number.isInteger(value) || Number.isNaN(value) || !Number.isFinite(value)) {
        throw new Error(`Invalid flag value. Flags must be positive integers.`);
    }
}

/** 
 * A convenience class allowing bitwise operations on a flags value.
 * This class also contains static methods that can be used without
 * constructing an instance.
 */
export default class Flags {
    private value: number;

    public constructor(initialValue?: number) {
        if (initialValue != null && initialValue !== 0) {
            throwOnInvalidFlag(initialValue);
        }
        
        this.value = initialValue ?? 0;
    }

    /** Checks if the number includes the given flag. */
    public has(flag: number): boolean {
        return Flags.has(this.value, flag);
    }

    /** Checks if the number includes any of the given flags. */
    public hasSome(...flags: number[]): boolean {
        return Flags.hasSome(this.value, ...flags);
    }

    /** Checks if the number includes all of the given flags. */
    public hasEvery(...flags: number[]): boolean {
        return Flags.hasEvery(this.value, ...flags);
    }

    /** Sets the given flags. */
    public set(...flags: number[]): this {
        this.value = Flags.set(this.value, ...flags);

        return this;
    }

    /** Unsets the given flags. */
    public unset(...flags: number[]): this {
        this.value = Flags.unset(this.value, ...flags);

        return this;
    }

    /** Clears all flags. */
    public clear(): this {
        this.value = 0;

        return this;
    }

    /** Checks if the number includes the given flag. */
    public static has(flags: number, flag: number): boolean {
        throwOnInvalidFlag(flag);

        if (flags === 0) {
            return false;
        }
    
        return flag === (flags & flag);
    }

    /** Checks if the number includes any of the given flags. */
    public static hasSome(flags: number, ...someFlags: number[]): boolean {
        return someFlags.some(flag => flag === 0 || Flags.has(flags, flag));
    }

    /** Checks if the number includes all of the given flags. */
    public static hasEvery(flags: number, ...everyFlag: number[]): boolean {
        return everyFlag.every(flag => Flags.has(flags, flag));
    }

    /** Returns a new number with the given flags set on `flags`. */
    public static set(flags: number, ...flagsToSet: number[]): number {
        for (const flag of flagsToSet) {
            throwOnInvalidFlag(flag);
            flags |= flag;
        }

        return flags;
    }

    /** Returns a new number with the given flags unset on `flags`. */
    public static unset(flags: number, ...flagsToUnset: number[]): number {
        for (const flag of flagsToUnset) {
            throwOnInvalidFlag(flag);
            flags = flags & ~flag;
        }

        return flags;
    }

    /** Converts the flags to a number. */
    public toNumber(): number {
        return this.value;
    }

    /** Converts the flags to a number. */
    public toJSON(): number {
        return this.value;
    }

    /** Converts the flags to a number string. */
    public toString(): string {
        return this.value.toString(10);
    }
}
