import { describe, expect, it } from 'vitest';
import { Flags } from '../src/index.js';

enum TestOptions {
    None = 0,
    IncludeHotDogs = 1,
    CleanUpAfter = 2,
    PreventGlobalDisaster = 4,
    BlowUpTheWorld = 8
}

const flags = TestOptions.CleanUpAfter | TestOptions.PreventGlobalDisaster;
const instance = new Flags(flags);

describe('Flags constructor should', () => {
    it('not throw on 0', () => expect(() => new Flags(0)).not.toThrowError());
    it('not throw on nothing', () => expect(() => new Flags()).not.toThrowError());
    it('throw on negative number', () => expect(() => new Flags(-1)).toThrowError());
    it('throw on floating point number', () => expect(() => new Flags(0.5)).toThrowError());
});

describe('Flags.has() should', () => {
    it('return true if flag exists', () => expect(instance.has(TestOptions.CleanUpAfter) && instance.has(TestOptions.PreventGlobalDisaster)).toBe(true));
    it('return false if flag doesn\'t exist', () => expect(instance.has(TestOptions.IncludeHotDogs)).toBe(false));
    it('return false if argument isn\'t a flag', () => expect(instance.has(3)).toBe(false));
    it('return false on 0 flag', () => expect(new Flags(0).has(1)).toBe(false));
    it('return true on 0', () => expect(instance.has(TestOptions.None)).toBe(true));
    it('throw on negative number', () => expect(() => instance.has(-1)).toThrowError());
    it('throw on floating point number', () => expect(() => instance.has(0.5)).toThrowError());
});

describe('Flags.hasSome() should', () => {
    it('return true if any flag exists', () => expect(instance.hasSome(TestOptions.IncludeHotDogs, TestOptions.CleanUpAfter)).toBe(true));
    it('return false if no flag exists', () => expect(instance.hasSome(TestOptions.IncludeHotDogs, TestOptions.BlowUpTheWorld)).toBe(false));
    it('ignore 0', () => expect(instance.hasSome(TestOptions.None, TestOptions.CleanUpAfter)).toBe(true));
    it('return false with no arguments', () => expect(instance.hasSome()).toBe(false));
    it('throw on negative number', () => expect(() => instance.hasSome(-1)).toThrowError());
    it('throw on floating point number', () => expect(() => instance.hasSome(0.5)).toThrowError());
});

describe('Flags.hasEvery() should', () => {
    it('return true if all flags exist', () => expect(instance.hasEvery(TestOptions.PreventGlobalDisaster, TestOptions.CleanUpAfter)).toBe(true));
    it('return false if not all flags exist', () => expect(instance.hasEvery(TestOptions.PreventGlobalDisaster, TestOptions.BlowUpTheWorld)).toBe(false));
    it('ignore 0', () => expect(instance.hasEvery(TestOptions.None, TestOptions.CleanUpAfter)).toBe(true));
    it('return true with no arguments', () => expect(instance.hasEvery()).toBe(true));
    it('throw on negative number', () => expect(() => instance.hasEvery(-1)).toThrowError());
    it('throw on floating point number', () => expect(() => instance.hasEvery(0.5)).toThrowError());
});

describe('Flags.set() should', () => {
    it('add another flag if doesn\'t exist', () => expect(new Flags(flags).set(TestOptions.BlowUpTheWorld).toNumber()).toBe(14));
    it('ignore flag if already exists', () => expect(new Flags(flags).set(TestOptions.PreventGlobalDisaster).toNumber()).toBe(6));
    it('do nothing with no arguments', () => expect(new Flags(flags).set().toNumber()).toBe(6));
    it('do nothing on 0', () => expect(new Flags(flags).set(TestOptions.None).toNumber()).toBe(flags));
    it('throw on negative number', () => expect(() => new Flags(flags).set(-1)).toThrowError());
    it('throw on floating point number', () => expect(() => new Flags(flags).set(0.5)).toThrowError());
});

describe('Flags.unset() should', () => {
    it('remove flag if exists', () => expect(new Flags(flags).unset(TestOptions.PreventGlobalDisaster).toNumber()).toBe(2));
    it('ignore flag if doesn\'t exist', () => expect(new Flags(flags).unset(TestOptions.BlowUpTheWorld).toNumber()).toBe(6));
    it('do nothing with no arguments', () => expect(new Flags(flags).unset().toNumber()).toBe(6));
    it('do nothing on 0', () => expect(new Flags(flags).unset(TestOptions.None).toNumber()).toBe(flags));
    it('throw on negative number', () => expect(() => new Flags(flags).unset(-1)).toThrowError());
    it('throw on floating point number', () => expect(() => new Flags(flags).unset(0.5)).toThrowError());
});

describe('Flags.clear() should', () => {
    it('remove all flags', () => expect(new Flags(flags).clear().toNumber()).toBe(0));
});

describe('Flags.toJSON() should', () => {
    it('return the value', () => expect(new Flags(flags).toJSON()).toBe(flags));
});

describe('Flags.toString() should', () => {
    it('return the value as string', () => expect(new Flags(flags).toString()).toBe(`${flags}`));
});
