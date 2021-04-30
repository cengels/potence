function throwOnInvalidFlag(value: number): void | never {
    if (value === 0) {
        throw new Error(`Invalid flag value. Flags must not be 0.`);
    }
}

/** 
 * A convenience class allowing bitwise operations on a flags value.
 * This class also contains static methods that can be used without
 * constructing an instance.
 */
export default class Flags<T extends number> {
    private value: number;

    public constructor(initialValue?: T) {
        this.value = initialValue ?? 0;
    }

    /** Checks if the flags enum includes the given flag. */
    public has(flag: T): boolean {
        return Flags.has(this.value, flag);
    }

    /** Checks if the flags enum includes any of the given flags. */
    public hasSome(...flags: T[]): boolean {
        return Flags.hasSome(this.value, ...flags);
    }

    /** Checks if the flags enum includes all of the given flags. */
    public hasEvery(...flags: T[]): boolean {
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

    /** Checks if the flags enum includes the given flag. */
    public static has(flags: number, flag: number): boolean {
        throwOnInvalidFlag(flag);

        if (flags === 0) {
            return false;
        }
    
        return flag === (flags & flag);
    }

    /** Checks if the flags enum includes any of the given flags. */
    public static hasSome(flags: number, ...someFlags: number[]): boolean {
        return someFlags.some(flag => Flags.has(flags, flag));
    }

    /** Checks if the flags enum includes all of the given flags. */
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
    public static unset(flags: number, ...flagsToSet: number[]): number {
        for (const flag of flagsToSet) {
            throwOnInvalidFlag(flag);
            flags = flags & ~flag;
        }

        return flags;
    }
}
