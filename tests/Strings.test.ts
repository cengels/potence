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

describe('Strings.splitAt() should', () => {
    it('split simple string', () => expect(Strings.splitAt('banana', 2, 4)).toStrictEqual(['ba', 'na', 'na']));
    it('split simple string (unsorted)', () => expect(Strings.splitAt('banana', 4, 2)).toStrictEqual(['ba', 'na', 'na']));
    it('split surrogate pairs', () => expect(Strings.splitAt('bànànà', 2, 4)).toStrictEqual(['bà', 'nà', 'nà']));
    it('do nothing if indices are outside of string', () => expect(Strings.splitAt('banana', 8)).toStrictEqual(['banana']));
    it('do nothing if no indices are supplied', () => expect(Strings.splitAt('banana')).toStrictEqual(['banana']));
    it('ignore duplicate indices', () => expect(Strings.splitAt('banana', 2, 2, 2)).toStrictEqual(['ba', 'nana']));
    it('throw if indices are negative', () => expect(() => Strings.splitAt('banana', -1)).toThrowError());
});

describe('Strings.strip() should', () => {
    it('do nothing by default', () => expect(Strings.strip('     k     t      ')).toBe('     k     t      '));
    it('strip all spaces', () => expect(Strings.strip('     k     t      ', ' ')).toBe('kt'));
    it('strip all specified occurrences', () => expect(Strings.strip('banana apple bananana', 'banana')).toBe(' apple na'));
    it('strip all strings', () => expect(Strings.strip('foo bar foobar foo and bar', 'foo', 'bar', ' ')).toBe('and'));
});

describe('Strings.stripStart() should', () => {
    it('do nothing by default', () => expect(Strings.stripStart('     k     t      ')).toBe('     k     t      '));
    it('strip beginning spaces', () => expect(Strings.stripStart('     k     t      ', ' ')).toBe('k     t      '));
    it('strip all specified occurrences at start', () => expect(Strings.stripStart('nanana apple bananana', 'na')).toBe(' apple bananana'));
    it('strip multiple tokens', () => expect(Strings.stripStart('010110241001', '0', '1')).toBe('241001'));
});

describe('Strings.stripEnd() should', () => {
    it('do nothing by default', () => expect(Strings.stripEnd('     k     t      ')).toBe('     k     t      '));
    it('strip end spaces', () => expect(Strings.stripEnd('     k     t      ', ' ')).toBe('     k     t'));
    it('strip all specified occurrences at end', () => expect(Strings.stripEnd('nanana apple bananana', 'na')).toBe('nanana apple ba'));
    it('strip multiple tokens', () => expect(Strings.stripEnd('010110241001', '0', '1')).toBe('01011024'));
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

describe('Strings.take() should', () => {
    it('take whole string if count == length', () => expect(Strings.take('magnesium', 9)).toBe('magnesium'));
    it('take whole string if count > length', () => expect(Strings.take('magnesium', 100)).toBe('magnesium'));
    it('take partial string if count < length', () => expect(Strings.take('magnesium', 5)).toBe('magne'));
    it('take empty string if count == 0', () => expect(Strings.take('magnesium', 0)).toBe(''));
    it('take from end if count < 0', () => expect(Strings.take('magnesium', -5)).toBe('esium'));
});

describe('Strings.takeLast() should', () => {
    it('take whole string if count == length', () => expect(Strings.takeLast('magnesium', 9)).toBe('magnesium'));
    it('take whole string if count > length', () => expect(Strings.takeLast('magnesium', 100)).toBe('magnesium'));
    it('take partial string if count < length', () => expect(Strings.takeLast('magnesium', 5)).toBe('esium'));
    it('take empty string if count == 0', () => expect(Strings.takeLast('magnesium', 0)).toBe(''));
    it('take from start if count < 0', () => expect(Strings.takeLast('magnesium', -5)).toBe('magne'));
});

describe('Strings.takeUntil() should', () => {
    it('do nothing if substring not found', () => expect(Strings.takeUntil('polypoly', 'al')).toBe('polypoly'));
    it('take until substring if found', () => expect(Strings.takeUntil('polypoly', 'ol')).toBe('p'));
});

describe('Strings.takeUntilAfter() should', () => {
    it('do nothing if substring not found', () => expect(Strings.takeUntilAfter('polypoly', 'al')).toBe('polypoly'));
    it('take until substring (including substring) if found', () => expect(Strings.takeUntilAfter('polypoly', 'ol')).toBe('pol'));
});

describe('Strings.takeUntilLast() should', () => {
    it('do nothing if substring not found', () => expect(Strings.takeUntilLast('polypoly', 'al')).toBe('polypoly'));
    it('take until last substring if found', () => expect(Strings.takeUntilLast('polypoly', 'ol')).toBe('polyp'));
});

describe('Strings.takeUntilAfterLast() should', () => {
    it('do nothing if substring not found', () => expect(Strings.takeUntilAfterLast('polypoly', 'al')).toBe('polypoly'));
    it('take until last substring (including substring) if found', () => expect(Strings.takeUntilAfterLast('polypoly', 'ol')).toBe('polypol'));
});

describe('Strings.skip() should', () => {
    it('skip whole string if count == length', () => expect(Strings.skip('magnesium', 9)).toBe(''));
    it('skip whole string if count > length', () => expect(Strings.skip('magnesium', 100)).toBe(''));
    it('skip partial string if count < length', () => expect(Strings.skip('magnesium', 5)).toBe('sium'));
    it('skip nothing if count == 0', () => expect(Strings.skip('magnesium', 0)).toBe('magnesium'));
    it('skip from end if count < 0', () => expect(Strings.skip('magnesium', -5)).toBe('magn'));
});

describe('Strings.skipLast() should', () => {
    it('skip whole string if count == length', () => expect(Strings.skipLast('magnesium', 9)).toBe(''));
    it('skip whole string if count > length', () => expect(Strings.skipLast('magnesium', 100)).toBe(''));
    it('skip partial string if count < length', () => expect(Strings.skipLast('magnesium', 5)).toBe('magn'));
    it('skip nothing if count == 0', () => expect(Strings.skipLast('magnesium', 0)).toBe('magnesium'));
    it('skip from start if count < 0', () => expect(Strings.skipLast('magnesium', -5)).toBe('sium'));
});

describe('Strings.skipUntil() should', () => {
    it('skip whole string if substring not found', () => expect(Strings.skipUntil('polypoly', 'al')).toBe(''));
    it('skip until substring if found', () => expect(Strings.skipUntil('polypoly', 'ol')).toBe('olypoly'));
});

describe('Strings.skipUntilAfter() should', () => {
    it('skip whole string if substring not found', () => expect(Strings.skipUntilAfter('polypoly', 'al')).toBe(''));
    it('skip until substring (excluding substring) if found', () => expect(Strings.skipUntilAfter('polypoly', 'ol')).toBe('ypoly'));
});

describe('Strings.skipUntilLast() should', () => {
    it('skip whole string if substring not found', () => expect(Strings.skipUntilLast('polypoly', 'al')).toBe(''));
    it('skip until last substring if found', () => expect(Strings.skipUntilLast('polypoly', 'ol')).toBe('oly'));
});

describe('Strings.skipUntilAfterLast() should', () => {
    it('skip whole string if substring not found', () => expect(Strings.skipUntilAfterLast('polypoly', 'al')).toBe(''));
    it('skip until last substring (excluding substring) if found', () => expect(Strings.skipUntilAfterLast('polypoly', 'ol')).toBe('y'));
});
