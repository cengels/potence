import * as Strings from '../src/strings/index.js';

describe('Strings.match() should', () => {
    describe('literally', () => {
        it('match a string', () => expect(Strings.match('test', 'test').matched).toBe(true));
        it('not match a mismatched string', () => expect(Strings.match('test', 'nottest').matched).toBe(false));
    });

    describe('via placeholder (whole string)', () => {
        it('match a whole string (unnamed)', () => expect(Strings.match('test', '{}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['test'] }));
        it('match a whole string (named)', () => expect(Strings.match('test', '{foo}')).toEqual({ matched: true, matches: { foo: 'test' }, unnamedMatches: [] }));
        it('match a whole string (numbered)', () => expect(Strings.match('test', '{2}')).toEqual({ matched: true, matches: { 2: 'test' }, unnamedMatches: [] }));
    });

    describe('via placeholder (partial string)', () => {
        it('match a substring (unnamed)', () => expect(Strings.match('one/two', '{}/{}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 'two'] }));
        it('match a substring (named)', () => expect(Strings.match('one/two', '{first}/{second}')).toEqual({ matched: true, matches: { first: 'one', second: 'two' }, unnamedMatches: [] }));
        it('match a substring (numbered)', () => expect(Strings.match('one/two', '{0}/{1}')).toEqual({ matched: true, matches: { 0: 'one', 1: 'two' }, unnamedMatches: [] }));
        it('match a substring (mixed)', () => expect(Strings.match('one/two.three', '{0}/{}.{foo}')).toEqual({ matched: true, matches: { 0: 'one', foo: 'three' }, unnamedMatches: ['two'] }));
        it('cancel matching', () => expect(Strings.match('one/two.three', '{0}/{}#{foo}')).toEqual({ matched: false, matches: { 0: 'one' }, unnamedMatches: [] }));
    });

    describe('via complex placeholder (strings)', () => {
        it('match a string (unnamed)', () => expect(Strings.match('one/two', '{}/{%s}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 'two'] }));
        it('match a string (named)', () => expect(Strings.match('one/two', '{one}/{two%s}')).toEqual({ matched: true, matches: { one: 'one', two: 'two' }, unnamedMatches: [] }));
        it('not match a number', () => expect(Strings.match('one/5', '{}/{%s}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('match a string with length', () => expect(Strings.match('one/two', '{}/{%3s}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 'two'] }));
        it('not match a string with wrong length', () => expect(Strings.match('one/two', '{}/{%4s}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
    });

    describe('via complex placeholder (ints)', () => {
        it('match an int (unnamed)', () => expect(Strings.match('one/2', '{}/{%d}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 2] }));
        it('match an int (named)', () => expect(Strings.match('one/2', '{one}/{two%d}')).toEqual({ matched: true, matches: { one: 'one', two: 2 }, unnamedMatches: [] }));
        it('not match a string', () => expect(Strings.match('one/5', '{%d}/{}')).toEqual({ matched: false, matches: {}, unnamedMatches: [] }));
        it('not match a float', () => expect(Strings.match('one/5.2', '{}/{%d}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('match a number with length', () => expect(Strings.match('one/526', '{}/{%3d}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 526] }));
        it('not match a number with wrong length', () => expect(Strings.match('one/5', '{}/{%3d}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
    });

    describe('via complex placeholder (floats)', () => {
        it('match a float (unnamed)', () => expect(Strings.match('one/2.3', '{}/{%f}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 2.3] }));
        it('match an int (named)', () => expect(Strings.match('one/2.3', '{one}/{two%f}')).toEqual({ matched: true, matches: { one: 'one', two: 2.3 }, unnamedMatches: [] }));
        it('not match a string', () => expect(Strings.match('one/test', '{}/{%f}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('not match an int', () => expect(Strings.match('one/2.3', '{}/{%d}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('match a float with length', () => expect(Strings.match('one/23.3', '{}/{%2f}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 23.3] }));
        it('not match a float with wrong length', () => expect(Strings.match('one/23.3', '{}/{%3f}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('match a float with decimals', () => expect(Strings.match('one/23.321', '{}/{%.3f}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 23.321] }));
        it('not match a float with wrong decimals', () => expect(Strings.match('one/23.3', '{}/{%.3f}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('match a float with length and decimals', () => expect(Strings.match('one/23.321', '{}/{%2.3f}')).toEqual({ matched: true, matches: {}, unnamedMatches: ['one', 23.321] }));
        it('not match a float with wrong length but right decimals', () => expect(Strings.match('one/23.321', '{}/{%3.3f}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('not match a float with right length but wrong decimals', () => expect(Strings.match('one/23.321', '{}/{%2.2f}')).toEqual({ matched: false, matches: {}, unnamedMatches: ['one'] }));
        it('throw if period isn\'t followed by a number', () => expect(() => Strings.match('one/23.321', '{}/{%2.f}')).toThrow());
        it('throw if decimals are specified with non-float type', () => expect(() => Strings.match('one/23.321', '{}/{%2.5d}')).toThrow());
    });

    describe('match complex expression', () => {
        const urlMatcher = 'https://{author}.github.io/{project}/{category}/{page%5s}.html';  // not an actual URL
        it('URL', () => expect(Strings.match('https://cengels.github.io/potence/Strings/match.html', urlMatcher)).toEqual({
            matched: true,
            matches: {
                author: 'cengels',
                project: 'potence',
                category: 'Strings',
                page: 'match'
            },
            unnamedMatches: []
        }));
    });
});
