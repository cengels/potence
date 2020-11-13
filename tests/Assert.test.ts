import * as Assert from '../src/assert/index.js';

describe('Assert.that() should', () => {
    describe('in general', () => {
        it('throw if assertion fails', () => expect(() => Assert.that(false)).toThrowError(Assert.AssertionError));
        it('not throw if assertion succeeds', () => expect(() => Assert.that(true)).not.toThrowError());
    });
    describe('for assertion error messages', () => {
        it('output "Assertion failed." if no message was supplied', () => expect(() => Assert.that(false)).toThrowError('Assertion failed.'));
        it('output "Assertion failed: [message]" if a message was supplied', () => expect(() => Assert.that(false, 'foo')).toThrowError('Assertion failed: foo'));
    });
    describe('if prefixed is turned on', () => {
        it('output only prefix if no message was supplied', () => expect(() => Assert.that(false)).toThrowError('Assertion failed.'));
        it('output "[prefix]: [message]" if a message was supplied', () => expect(() => Assert.that(false, 'foo')).toThrowError('Assertion failed: foo'));
    });
    describe('if prefixed is turned off', () => {
        beforeAll(() => Assert.configure({ prefixed: false }));
        it('output nothing if no message was supplied', () => expect(() => Assert.that(false)).toThrowError(''));
        it('output "[message]" if a message was supplied', () => expect(() => Assert.that(false, 'foo')).toThrowError('foo'));
        afterAll(() => Assert.configure({ prefixed: true }));
    });
});

describe('Assert.truthy() should', () => {
    describe('throw when value is', () => {
        it('false', () => expect(() => Assert.truthy(false)).toThrowError(Assert.AssertionError));
        it('0', () => expect(() => Assert.truthy(0)).toThrowError(Assert.AssertionError));
        it('empty string', () => expect(() => Assert.truthy('')).toThrowError(Assert.AssertionError));
        it('undefined', () => expect(() => Assert.truthy(undefined)).toThrowError(Assert.AssertionError));
        it('null', () => expect(() => Assert.truthy(null)).toThrowError(Assert.AssertionError));
        it('NaN', () => expect(() => Assert.truthy(Number.NaN)).toThrowError(Assert.AssertionError));
    });
    describe('not throw when value is', () => {
        it('empty object', () => expect(() => Assert.truthy({})).not.toThrowError());
        it('empty array', () => expect(() => Assert.truthy([])).not.toThrowError());
        it('any non-zero number', () => expect(() => Assert.truthy(1)).not.toThrowError());
        it('any non-empty string', () => expect(() => Assert.truthy(' ')).not.toThrowError());
        it('any instance', () => expect(() => Assert.truthy(new Date())).not.toThrowError());
    });
    describe('accept stringifyOptions', () => {
        beforeAll(() => Assert.configure({ stringifyOptions: { typesOnly: true } }));
        it('fail on number', () => expect(() => Assert.truthy(0, 'var')).toThrowError('Assertion failed: expected var to be truthy but was number'));
        afterAll(() => Assert.configure({ stringifyOptions: { } }));
    });
});

describe('Assert.falsy() should', () => {
    describe('throw when value is', () => {
        it('empty object', () => expect(() => Assert.falsy({})).toThrowError(Assert.AssertionError));
        it('empty array', () => expect(() => Assert.falsy([])).toThrowError(Assert.AssertionError));
        it('any non-zero number', () => expect(() => Assert.falsy(1)).toThrowError(Assert.AssertionError));
        it('any non-empty string', () => expect(() => Assert.falsy(' ')).toThrowError(Assert.AssertionError));
        it('any instance', () => expect(() => Assert.falsy(new Date())).toThrowError(Assert.AssertionError));
    });
    describe('not throw when value is', () => {
        it('false', () => expect(() => Assert.falsy(false)).not.toThrowError());
        it('0', () => expect(() => Assert.falsy(0)).not.toThrowError());
        it('empty string', () => expect(() => Assert.falsy('')).not.toThrowError());
        it('undefined', () => expect(() => Assert.falsy(undefined)).not.toThrowError());
        it('null', () => expect(() => Assert.falsy(null)).not.toThrowError());
        it('NaN', () => expect(() => Assert.falsy(Number.NaN)).not.toThrowError());
    });
});

describe('Assert.notNull() should', () => {
    it('throw if value is null', () => expect(() => Assert.notNull(null)).toThrowError(Assert.AssertionError));
    it('throw if value is undefined', () => expect(() => Assert.notNull(undefined)).toThrowError(Assert.AssertionError));
    it('not throw otherwise', () => expect(() => Assert.notNull(0)).not.toThrowError());
});

describe('Assert.every() should', () => {
    it('throw if not all values match the predicate', () => expect(() => Assert.every([0, null, 1], value => Assert.notNull(value), 'testArray')).toThrowError('testArray failed assertion. Element at index 1 reported: "Assertion failed: expected non-null value but got null"'));
    it('not throw if all values match the predicate', () => expect(() => Assert.every([0, 2, 1], value => Assert.that(value >= 0))).not.toThrowError());
});
