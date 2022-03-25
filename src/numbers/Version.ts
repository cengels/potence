import { Equatable } from '../types';
import CompareResult from './CompareResult';

/** Official JS RegExp. See https://semver.org/. */
const regExp = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

interface SemanticVersion {
    /**
     * The major component of the version. Increments whenever incompatible
     * API changes are introduced, with the exception of `0.x.y`, which is
     * for initial development and may see breaking changes at any time.
     */
     major: number;
     /**
      * The minor component of the version. Increments whenever backwards-
      * compatible functionality is added.
      */
     minor: number;
     /**
      * The patch component of the version. Increments whenever backwards-
      * compatible bug fixes are introduced.
      */
     patch: number;
     /**
      * The pre-release component of the version. Is separated from the other
      * components with a dash (`-`) and clearly distinguishes the version
      * from a "normal" version (e.g. an `alpha` version), marking it as
      * potentially unstable.
      */
     preRelease: string;
     /**
      * The build metadata of the version. Is separated from the other components
      * with a plus (`+`) and can contain additional information about the
      * specific build.
      */
     build: string;
}

function versionString(version: SemanticVersion): string {
    let string = [version.major, version.minor, version.patch]
        // Without this the string might use scientific notation
        // (which is not a valid semantic version string)
        .map(x => x.toLocaleString('fullwide', { useGrouping: false }))
        .join('.');

    if (version.preRelease.length > 0) {
        string += `-${version.preRelease}`;
    }

    if (version.build.length > 0) {
        string += `+${version.build}`;
    }

    return string;
}

/** 
 * Represents an immutable MAJOR.MINOR.PATCH version
 * following semantic versioning rules.
 */
export default class Version implements SemanticVersion, Equatable {
    public readonly major: number = 0;
    public readonly minor: number = 0;
    public readonly patch: number = 0;
    public readonly preRelease: string = '';
    public readonly build: string = '';

    /** 
     * Parses a version out of another version, a semantic versioning string,
     * or individual major.minor.patch components.
     * 
     * An empty constructor call will result in a valid `0.0.0` version.
     */
    public constructor(version: SemanticVersion | string);
    public constructor(major?: number, minor?: number, patch?: number, preRelease?: string, build?: string);
    public constructor(version?: SemanticVersion | string | number, minor?: number, patch?: number, preRelease?: string, build?: string) {
        if (typeof version === 'string') {
            const matches = version.match(regExp);

            if (matches != null) {
                // Array will always have a length of 6.
                this.major = parseInt(matches[1], 10);
                this.minor = parseInt(matches[2], 10);
                this.patch = parseInt(matches[3], 10);
                if (matches[4] != null) this.preRelease = matches[4];
                if (matches[5] != null) this.build = matches[5];
            } else {
                this.major = this.minor = this.patch = Number.NaN;
                this.preRelease = this.build = '';
            }
        } else if (version == null || typeof version === 'number') {
            if (version != null) this.major = version;
            if (minor != null) this.minor = minor;
            if (patch != null) this.patch = patch;
            if (preRelease != null) this.preRelease = preRelease;
            if (build != null) this.build = build;

            if (!regExp.test(versionString(this))) {
                this.major = this.minor = this.patch = Number.NaN;
                this.preRelease = this.build = '';
            }
        } else {
            if (!regExp.test(versionString(version))) {
                this.major = this.minor = this.patch = Number.NaN;
                this.preRelease = this.build = '';
            } else {
                this.major = version.major;
                this.minor = version.minor;
                this.patch = version.patch;
                this.preRelease = version.preRelease;
                this.build = version.build;
            }
        }
    }

    /** 
     * `true` if the version is a valid semantic version,
     * `false` otherwise.
     */
    public get valid(): boolean {
        return !Number.isNaN(this.major);
    }

    /**
     * Returns a new {@link Version} with the {@link patch} component
     * incremented by 1.
     * Note that this will strip out any {@link preRelease} or {@link build}
     * labels.
     * 
     * If the version is invalid, the new instance will also be invalid.
     */
    public incrementPatch(): Version {
        if (!this.valid) {
            return new Version(this);
        }

        return new Version(this.major, this.minor, this.patch + 1);
    }

    /**
     * Returns a new {@link Version} with the {@link minor} component
     * incremented by 1.
     * Note that this will strip out any {@link preRelease} or {@link build}
     * labels and reset the {@link patch} component.
     * 
     * If the version is invalid, the new instance will also be invalid.
     */
    public incrementMinor(): Version {
        if (!this.valid) {
            return new Version(this);
        }

        return new Version(this.major, this.minor + 1, 0);
    }

    /**
     * Returns a new {@link Version} with the {@link major} component
     * incremented by 1.
     * Note that this will strip out any {@link preRelease} or {@link build}
     * labels and reset the {@link minor} and {@link patch} components.
     * 
     * If the version is invalid, the new instance will also be invalid.
     */
    public incrementMajor(): Version {
        if (!this.valid) {
            return new Version(this);
        }

        return new Version(this.major + 1, 0, 0);
    }

    /**
     * Compares this version with another one, returning a result based on
     * which should take precedence over the other.
     *
     * If this version is lower than the passed version in precedence, returns
     * {@link CompareResult.Less}.  
     * If this version is equal to the passed version in precedence, returns
     * {@link CompareResult.Equal}.  
     * If this version is greater than the passed version in precedence, returns
     * {@link CompareResult.Greater}.  
     * If this version is invalid but the passed version is not, returns
     * {@link CompareResult.Less}.
     * 
     * A pre-release version is always lower in precedence. If both versions
     * have a pre-release component, each dot-separated identifier is compared
     * numerically or lexically, whichever applies. If the number of identifiers
     * is not equal and all preceding identifiers are the same, the version
     * with *more* identifiers wins.
     *
     * Note that a result of `0` (or {@link CompareResult.Equal}) does **not**
     * mean both instances are identical, just that none take precedence
     * over the other. Use {@link equals}() to check for equality.
     */
    public compare(version: Version | string): CompareResult {
        if (typeof version === 'string') {
            version = new Version(version);
        }

        const patchResult = this.comparePatch(version);

        if (patchResult !== CompareResult.Equal) {
            return patchResult;
        }

        if (this.preRelease.length > 0 || version.preRelease.length > 0) {
            if (this.preRelease.length === 0) {
                return CompareResult.Greater;
            } else if (version.preRelease.length === 0) {
                return CompareResult.Less;
            } else {
                const thisIdentifiers = this.preRelease.split('.');
                const thatIdentifiers = version.preRelease.split('.');

                for (let i: number = 0; i < thisIdentifiers.length; i++) {
                    if (thatIdentifiers[i] == null) {
                        return CompareResult.Greater;
                    }

                    const num1 = Number(thisIdentifiers[i]);
                    const num2 = Number(thatIdentifiers[i]);

                    if (!Number.isNaN(num1) && !Number.isNaN(num2)) {
                        if (num1 === num2) {
                            continue;
                        }

                        return num1 < num2
                            ? CompareResult.Less
                            : CompareResult.Greater;
                    }

                    const result = thisIdentifiers[i].localeCompare(thatIdentifiers[i]);

                    if (result < 0) {
                        return CompareResult.Less;
                    } else if (result > 0) {
                        return CompareResult.Greater;
                    }
                }

                if (thisIdentifiers.length < thatIdentifiers.length) {
                    return CompareResult.Less;
                }
            }
        }

        return CompareResult.Equal;
    }

    /** Like {@link compare}, but only compares the major component. */
    public compareMajor(version: Version | string): CompareResult {
        if (typeof version === 'string') {
            version = new Version(version);
        }

        const validityResult = this.compareValidity(version);

        if (validityResult != null) {
            return validityResult;
        }

        if (this.major < version.major) {
            return CompareResult.Less;
        } else if (this.major > version.major) {
            return CompareResult.Greater;
        }

        return CompareResult.Equal;
    }

    /** Like {@link compare}, but only compares the major and minor components. */
    public compareMinor(version: Version | string): CompareResult {
        if (typeof version === 'string') {
            version = new Version(version);
        }

        const majorResult = this.compareMajor(version);

        if (majorResult !== CompareResult.Equal) {
            return majorResult;
        }

        if (this.minor < version.minor) {
            return CompareResult.Less;
        } else if (this.minor > version.minor) {
            return CompareResult.Greater;
        }

        return CompareResult.Equal;
    }

    /** Like {@link compare}, but only compares the major, minor, and patch components. */
    public comparePatch(version: Version | string): CompareResult {
        if (typeof version === 'string') {
            version = new Version(version);
        }

        const minorResult = this.compareMinor(version);

        if (minorResult !== CompareResult.Equal) {
            return minorResult;
        }

        if (this.patch < version.patch) {
            return CompareResult.Less;
        } else if (this.patch > version.patch) {
            return CompareResult.Greater;
        }

        return CompareResult.Equal;
    }

    private compareValidity(version: Version | string): CompareResult | null {
        if (typeof version === 'string') {
            version = new Version(version);
        }

        if (this.valid && version.valid) {
            return null;
        } else if (!this.valid && !version.valid) {
            return CompareResult.Equal;
        }
        
        if (version.valid) {
            return CompareResult.Less;
        } else {
            return CompareResult.Greater;
        }
    }

    /** 
     * Returns `true` if the two versions are completely identical.
     * 
     * Note that two invalid versions are always identical.
     */
    public equals(version: unknown): boolean {
        if (typeof version === 'object') {
            version = version?.toString();
        }

        return this.toString() === version;
    }

    /** 
     * Returns the proper semantic string representation
     * of this semantic version.
     * 
     * Note that invalid versions return "Invalid Version".
     */
    public toString(): string {
        if (!this.valid) {
            return 'Invalid Version';
        }

        return versionString(this);
    }
}
