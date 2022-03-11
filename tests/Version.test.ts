import CompareResult from '../src/numbers/CompareResult.js';
import Version from '../src/numbers/Version.js';

describe('Version.incrementPatch() should', () => {
    it('add 1 to the patch version', () => expect(new Version(1, 0, 0).incrementPatch().toString()).toEqual('1.0.1'));
    it('strip prelease label', () => expect(new Version(1, 0, 0, 'something').incrementPatch().toString()).toEqual('1.0.1'));
    it('strip build metadata', () => expect(new Version(1, 0, 0, undefined, 'something').incrementPatch().toString()).toEqual('1.0.1'));
    it('return same version when invalid', () => expect(new Version('').incrementPatch()).toEqual(new Version('')));
});

describe('Version.incrementMinor() should', () => {
    it('add 1 to the patch version', () => expect(new Version(1, 0, 0).incrementMinor().toString()).toEqual('1.1.0'));
    it('reset patch to 0', () => expect(new Version(1, 0, 5).incrementMinor().toString()).toEqual('1.1.0'));
    it('strip prelease label', () => expect(new Version(1, 0, 0, 'something').incrementMinor().toString()).toEqual('1.1.0'));
    it('strip build metadata', () => expect(new Version(1, 0, 0, undefined, 'something').incrementMinor().toString()).toEqual('1.1.0'));
    it('return same version when invalid', () => expect(new Version('').incrementMinor()).toEqual(new Version('')));
});

describe('Version.incrementMajor() should', () => {
    it('add 1 to the patch version', () => expect(new Version(1, 0, 0).incrementMajor().toString()).toEqual('2.0.0'));
    it('reset patch to 0', () => expect(new Version(1, 0, 5).incrementMajor().toString()).toEqual('2.0.0'));
    it('reset minor to 0', () => expect(new Version(1, 5, 0).incrementMajor().toString()).toEqual('2.0.0'));
    it('strip prelease label', () => expect(new Version(1, 0, 0, 'something').incrementMajor().toString()).toEqual('2.0.0'));
    it('strip build metadata', () => expect(new Version(1, 0, 0, undefined, 'something').incrementMajor().toString()).toEqual('2.0.0'));
    it('return same version when invalid', () => expect(new Version('').incrementMajor()).toEqual(new Version('')));
});

describe('Version.equals() should', () => {
    it('return true on 2 equivalent versions', () => expect(new Version(1, 0, 0).equals(new Version('1.0.0'))).toBe(true));
    it('return true with same prerelease', () => expect(new Version(1, 0, 0, 'foo').equals(new Version('1.0.0-foo'))).toBe(true));
    it('return true with same prerelease & build', () => expect(new Version(1, 0, 0, 'foo', 'bar').equals(new Version('1.0.0-foo+bar'))).toBe(true));
    it('return false with different version', () => expect(new Version(1, 0, 0).equals(new Version('1.0.1'))).toBe(false));
    it('return false with different prerelease', () => expect(new Version(1, 0, 0, 'foo').equals(new Version('1.0.0-bar'))).toBe(false));
    it('return false with different build', () => expect(new Version(1, 0, 0, 'foo', 'bar').equals(new Version('1.0.0-foo+foo'))).toBe(false));
    it('return true when both are invalid', () => expect(new Version('').equals(new Version(''))).toBe(true));
    it('work with a passed string', () => expect(new Version('1.0.0').equals('1.0.0')).toBe(true));
});

const comparisons: [string, Version, Version][] = [
    ['lower patch', new Version('1.0.0'), new Version('1.0.1')],
    ['lower minor', new Version('1.0.0'), new Version('1.1.0')],
    ['lower major', new Version('1.0.0'), new Version('2.0.0')],
    ['lower minor (greater patch)', new Version('1.0.99'), new Version('1.1.0')],
    ['lower major (greater minor, patch)', new Version('1.99.99'), new Version('2.0.0')],
    ['invalid version', new Version(''), new Version('0.0.0')],
    ['prerelease identifier', new Version('1.0.0-alpha'), new Version('1.0.0')],
    ['less prelease identifiers', new Version('1.0.0-alpha'), new Version('1.0.0-alpha.1')],
    ['prerelease number against word', new Version('1.0.0-alpha.1'), new Version('1.0.0-alpha.beta')],
    ['prerelease word against word', new Version('1.0.0-alpha.beta'), new Version('1.0.0-beta')],
    ['prerelease lower number', new Version('1.0.0-beta.2'), new Version('1.0.0-beta.11')],
    ['prerelease lower number (with preceding number)', new Version('1.0.0-1.2'), new Version('1.0.0-1.11')],
    ['prerelease lower rc', new Version('1.0.0-rc.9'), new Version('1.0.0-rc.10')]
];

describe('Version.compare() should', () => {
    describe('return Equal on', () => {
        it('equal versions', () => expect(new Version('1.0.0').compare(new Version('1.0.0'))).toBe(CompareResult.Equal));
        it('different build', () => expect(new Version('1.0.0+foo').compare(new Version('1.0.0+bar'))).toBe(CompareResult.Equal));
        it('same patch', () => expect(new Version('1.0.0-alpha').compare(new Version('1.0.0-alpha'))).toBe(CompareResult.Equal));
        it('both invalid', () => expect(new Version('').compare(new Version(''))).toBe(CompareResult.Equal));
    });

    describe('return Less on', () => {
        for (const [label, source, target] of comparisons) {
            it(label, () => expect(source.compare(target)).toBe(CompareResult.Less));
        }
    });

    describe('return Greater on', () => {
        for (const [label, source, target] of comparisons) {
            it(label, () => expect(target.compare(source)).toBe(CompareResult.Greater));
        }
    });

    it('work with a passed string', () => expect(new Version('1.0.0').compare('1.0.1')).toBe(CompareResult.Less));
});
