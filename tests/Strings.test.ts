import * as Strings from '../src/strings/index.js';
import { method } from './improved-syntax.js';

describe('Strings.isEmpty() should return', () => {
    it('true if string is empty', () => expect(Strings.isEmpty('')).toBe(true));
    it('false if string has only whitespace', () => expect(Strings.isEmpty('    ')).toBe(false));
    it('false if string is not empty', () => expect(Strings.isEmpty('foo')).toBe(false));
});

describe('Strings.isWhitespace() should return', () => {
    it('true if string is empty', () => expect(Strings.isWhitespace('')).toBe(true));
    it('true if string has only whitespace', () => expect(Strings.isWhitespace('    ')).toBe(true));
    it('false if string is not empty', () => expect(Strings.isWhitespace('foo')).toBe(false));
});

describe('Strings.strip() should', () => {
    it('do nothing by default', () => expect(Strings.strip('     k     t      ')).toBe('     k     t      '));
    it('strip all spaces', () => expect(Strings.strip('     k     t      ', ' ')).toBe('kt'));
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
    it('don\'t convert nothing', () => expect(Strings.camelCase('')).toBe(''));
});

describe('Strings.pascalCase() should', () => {
    it('convert snake_case', () => expect(Strings.pascalCase('snake_case_is_here')).toBe('SnakeCaseIsHere'));
    it('convert ALL_CAPS', () => expect(Strings.pascalCase('ALL_CAPS_IS_HERE')).toBe('AllCapsIsHere'));
    it('convert MixEd_cASe', () => expect(Strings.pascalCase('MixEd_cASe_iS_HeRE')).toBe('MixedCaseIsHere'));
    it('convert hyphenated-text', () => expect(Strings.pascalCase('hyphens-are-here')).toBe('HyphensAreHere'));
    it('convert spaced text', () => expect(Strings.pascalCase('normal text is here')).toBe('NormalTextIsHere'));
    it('convert wide-spaced text', () => expect(Strings.pascalCase('normal     text   is     here')).toBe('NormalTextIsHere'));
    it('convert mixed text', () => expect(Strings.pascalCase('normal     text---is__here')).toBe('NormalTextIsHere'));
    it('don\'t convert nothing', () => expect(Strings.pascalCase('')).toBe(''));
});

describe('Strings.prefix() should', () => {
    it('prefix a string if prefix does not exist', () => expect(Strings.prefix('banana', 'raw')).toBe('rawbanana'));
    it('not prefix a string if prefix exists', () => expect(Strings.prefix('rawbanana', 'raw')).toBe('rawbanana'));
});

describe('Strings.suffix() should', () => {
    it('suffix a string if suffix does not exist', () => expect(Strings.suffix('banana', 'raw')).toBe('bananaraw'));
    it('not suffix a string if suffix exists', () => expect(Strings.suffix('bananaraw', 'raw')).toBe('bananaraw'));
});

method('Strings.isUrl()', Strings.isUrl, returns => {
    returns(true, on => {
        on('https://www.google.com');
        on('https://www.google.com/');
        on('http://www.google.com/');
        on('https://google.com');
        on('https://www.google.com/page');
        on('https://www.google.com/page.html');
        on('https://www.google.com/page/subpage.html');
        on('https://www.google.com/query?key=value');
        on('https://www.google.com/?key=value');
        on('https://www.google.com/spaces%20included.html');
    })
    returns(false, on => {
        on('');
        on('://www.google.com');
        on('http:google.com');
        on('http:/google.com');
        on('http:/google.com');
        on('https://www.google.com/page\\\\wrongway');
    })
})

describe('Strings.capitalize() should', () => {
    it('capitalize uncapitalized strings', () => expect(Strings.capitalize('abc')).toBe('Abc'));
    it('not capitalize capitalized strings', () => expect(Strings.capitalize('Abc')).toBe('Abc'));
    it('ignore strings that do not start with a letter', () => expect(Strings.capitalize('5bc')).toBe('5bc'));
});

describe('Strings.uncapitalize() should', () => {
    it('uncapitalize capitalized strings', () => expect(Strings.uncapitalize('Abc')).toBe('abc'));
    it('not uncapitalize uncapitalized strings', () => expect(Strings.uncapitalize('abc')).toBe('abc'));
    it('ignore strings that do not start with a letter', () => expect(Strings.uncapitalize('5bc')).toBe('5bc'));
});
