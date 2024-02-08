import { describe, expect, it } from 'vitest';
import Version from '../src/numbers/Version.js';

function components(version: Version): [number, number, number, string, string] {
    return [version.major, version.minor, version.patch, version.preRelease, version.build];
}

const validVersions: [string, number, number, number, string, string][] = [
    ['0.0.0', 0, 0, 0, '', ''],
    ['0.0.4', 0, 0, 4, '', ''],
    ['1.2.3', 1, 2, 3, '', ''],
    ['10.20.30', 10, 20, 30, '', ''],
    ['1.1.2-prerelease+meta', 1, 1, 2, 'prerelease', 'meta'],
    ['1.1.2+meta', 1, 1, 2, '', 'meta'],
    ['1.1.2+meta-valid', 1, 1, 2, '', 'meta-valid'],
    ['1.0.0-alpha', 1, 0, 0, 'alpha', ''],
    ['1.0.0-beta', 1, 0, 0, 'beta', ''],
    ['1.0.0-alpha.beta', 1, 0, 0, 'alpha.beta', ''],
    ['1.0.0-alpha.beta.1', 1, 0, 0, 'alpha.beta.1', ''],
    ['1.0.0-alpha.1', 1, 0, 0, 'alpha.1', ''],
    ['1.0.0-alpha0.valid', 1, 0, 0, 'alpha0.valid', ''],
    ['1.0.0-alpha.0valid', 1, 0, 0, 'alpha.0valid', ''],
    ['1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay', 1, 0, 0, 'alpha-a.b-c-somethinglong', 'build.1-aef.1-its-okay'],
    ['1.0.0-rc.1+build.1', 1, 0, 0, 'rc.1', 'build.1'],
    ['2.0.0-rc.1+build.123', 2, 0, 0, 'rc.1', 'build.123'],
    ['1.2.3-beta', 1, 2, 3, 'beta', ''],
    ['10.2.3-DEV-SNAPSHOT', 10, 2, 3, 'DEV-SNAPSHOT', ''],
    ['1.2.3-SNAPSHOT-123', 1, 2, 3, 'SNAPSHOT-123', ''],
    ['1.0.0', 1, 0, 0, '', ''],
    ['2.0.0', 2, 0, 0, '', ''],
    ['1.1.7', 1, 1, 7, '', ''],
    ['2.0.0+build.1848', 2, 0, 0, '', 'build.1848'],
    ['2.0.1-alpha.1227', 2, 0, 1, 'alpha.1227', ''],
    ['1.0.0-alpha+beta', 1, 0, 0, 'alpha', 'beta'],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12+788', 1, 2, 3, '---RC-SNAPSHOT.12.9.1--.12', '788'],
    ['1.2.3----R-S.12.9.1--.12+meta', 1, 2, 3, '---R-S.12.9.1--.12', 'meta'],
    ['1.2.3----RC-SNAPSHOT.12.9.1--.12', 1, 2, 3, '---RC-SNAPSHOT.12.9.1--.12', ''],
    ['1.0.0+0.build.1-rc.10000aaa-kk-0.1', 1, 0, 0, '', '0.build.1-rc.10000aaa-kk-0.1'],
    ['1.0.0-0A.is.legal', 1, 0, 0, '0A.is.legal', '']
];

const invalidVersions: string[] = [
    '1',
    '1.2',
    '1.2.3-0123',
    '1.2.3-0123.0123',
    '1.1.2+.123',
    '+invalid',
    '-invalid',
    '-invalid+invalid',
    '-invalid.01',
    'alpha',
    'alpha.beta',
    'alpha.beta.1',
    'alpha.1',
    'alpha+beta',
    'alpha_beta',
    'alpha.',
    'alpha..',
    'beta',
    '1.0.0-alpha_beta',
    '-alpha.',
    '1.0.0-alpha..',
    '1.0.0-alpha..1',
    '1.0.0-alpha...1',
    '1.0.0-alpha....1',
    '1.0.0-alpha.....1',
    '1.0.0-alpha......1',
    '1.0.0-alpha.......1',
    '01.1.1',
    '1.01.1',
    '1.1.01',
    '1.2',
    '1.2.3.DEV',
    '1.2-SNAPSHOT',
    '1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788',
    '1.2-RC-SNAPSHOT',
    '-1.0.3-gamma+b7718',
    '+justmeta',
    '9.8.7+meta+meta',
    '9.8.7-whatever+meta+meta',
    '99999999999999999999999.999999999999999999.99999999999999999----RC-SNAPSHOT.12.09.1--------------------------------..12'
];

describe('Version construction', () => {
    it('empty version', () => expect(components(new Version())).toEqual([0, 0, 0, '', '']));

    describe('string construction', () => {
        it.each(validVersions)('%s should be valid', (v, major, minor, patch, prerelease, build) => {
            const version = new Version(v);
            const expected = [major, minor, patch, prerelease, build];

            expect(version.valid).toBe(true);
            expect(components(version)).toEqual(expected);
        });

        it.each(invalidVersions)('%s should be invalid', v => expect(new Version(v).valid).toBe(false));
    });

    describe('component construction', () => {
        it.each(validVersions)('%s should be valid', (v, major, minor, patch, prerelease, build) => {
            const version = new Version(major, minor, patch, prerelease, build);
            const expected = [major, minor, patch, prerelease, build];

            expect(version.valid).toBe(true);
            expect(components(version)).toEqual(expected);
        });

        it('valid version (with undefineds)', () => {
            const version = new Version(undefined, 5, undefined, undefined, 'something');

            expect(version.valid).toBe(true);
            expect(components(version)).toEqual([0, 5, 0, '', 'something']);
        });

        describe('invalid version', () => {
            it('invalid version (float major)', () => expect(new Version(1.2, 2, 3, 'foo', 'bar').valid).toBe(false));
            it('invalid version (float minor)', () => expect(new Version(1, 2.1, 3, 'foo', 'bar').valid).toBe(false));
            it('invalid version (float patch)', () => expect(new Version(1, 2, 3.2, 'foo', 'bar').valid).toBe(false));
            it('invalid version (negative major)', () => expect(new Version(-1, 2, 3, 'foo', 'bar').valid).toBe(false));
            it('invalid version (negative minor)', () => expect(new Version(1, -2, 3, 'foo', 'bar').valid).toBe(false));
            it('invalid version (negative patch)', () => expect(new Version(1, 2, -3, 'foo', 'bar').valid).toBe(false));
            it('invalid version (non-ASCII pre-release)', () => expect(new Version(1, 2, 3, 'fo%o', 'bar').valid).toBe(false));
            it('invalid version (non-ASCII build metadata)', () => expect(new Version(1, 2, 3, 'foo', 'ba%r').valid).toBe(false));
        });
    });

    describe('Version construction', () => {
        describe('component construction', () => {
            it.each(validVersions)('valid versions', (v, major, minor, patch, prerelease, build) => {
                const version = new Version(new Version(v));
                const expected = [major, minor, patch, prerelease, build];
    
                expect(version.valid).toBe(true);
                expect(components(version)).toEqual(expected);
            });

            it('invalid version', () => expect(new Version(new Version('')).valid).toBe(false));
        });
    });

    describe('toString() should', () => {
        it('return Invalid Version', () => expect(new Version('').toString()).toBe('Invalid Version'));

        it.each(validVersions)('string constructor: %s should return itself', v => expect(new Version(v).toString()).toBe(v));
        it.each(validVersions)('components constructor: %s should return itself', (v, major, minor, patch, prerelease, build) => expect(new Version(major, minor, patch, prerelease, build).toJSON()).toBe(v));
    });
});
