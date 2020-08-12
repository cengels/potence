import * as Strings from '../src/strings/index.js';

describe('Strings.strip() should', () => {
    it('strip all spaces by default', () => expect(Strings.strip('     k     t      ')).toBe('kt'));
    it('strip all specified occurrences', () => expect(Strings.strip('banana apple bananana', 'banana')).toBe(' apple na'));
    it('strip all strings', () => expect(Strings.strip('foo bar foobar foo and bar', 'foo', 'bar', ' ')).toBe('and'));
});

describe('Strings.camelCase() should', () => {
    it('convert snake_case', () => expect(Strings.camelCase('snake_case_is_here')).toBe('snakeCaseIsHere'));
    it('convert ALL_CAPS', () => expect(Strings.camelCase('ALL_CAPS_IS_HERE')).toBe('allCapsIsHere'));
    it('convert MixEd_cASe', () => expect(Strings.camelCase('MixEd_cASe_iS_HeRE')).toBe('mixedCaseIsHere'));
    it('convert hyphenated-text', () => expect(Strings.camelCase('hyphens-are-here')).toBe('hyphensAreHere'));
    it('convert spaced text', () => expect(Strings.camelCase('normal text is here')).toBe('normalTextIsHere'));
    it('convert wide-spaced text', () => expect(Strings.camelCase('normal     text   is     here')).toBe('normalTextIsHere'));
});
