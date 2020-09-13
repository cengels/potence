import * as Strings from '../src/strings/index.js';

describe('Strings.strip() should', () => {
    it('strip all spaces by default', () => expect(Strings.strip('     k     t      ')).toBe('kt'));
    it('strip all specified occurrences', () => expect(Strings.strip('banana apple bananana', 'banana')).toBe(' apple na'));
    it('strip all strings', () => expect(Strings.strip('foo bar foobar foo and bar', 'foo', 'bar', ' ')).toBe('and'));
});
