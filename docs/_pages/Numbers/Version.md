---
layout:      class
title:       Version
module:      Numbers
added:       0.6.0
description: Represents an immutable MAJOR.MINOR.PATCH version following
             semantic versioning rules.
order:       -2
---

## Constructor

```ts
new Version(version: { major: number, minor: number, patch: number, preRelease: string, build: string })
new Version(version: string)
new Version(major?: number, minor?: number, patch?: number, preRelease?: string, build?: string)
new Version()
```

<div class="description">
    <p>Parses a version out of another version, a semantic versioning string,
       or individual major.minor.patch components.</p>

    <p markdown="span">An empty constructor call will result in a valid `0.0.0` version.</p>
</div>

## Public Properties

<table class="class-members">
    <tr>
        <td class="signature">
            <code>major</code>
        </td>
        <td class="description" markdown="span">
            The major component of the version. Increments whenever incompatible
            API changes are introduced, with the exception of `0.x.y`, which is
            for initial development and may see breaking changes at any time.
        </td>
    </tr>
    <tr>
        <td class="signature">
            <code>minor</code>
        </td>
        <td class="description" markdown="span">
            The minor component of the version. Increments whenever backwards-
            compatible functionality is added.
        </td>
    </tr>
    <tr>
        <td class="signature">
            <code>patch</code>
        </td>
        <td class="description" markdown="span">
            The patch component of the version. Increments whenever backwards-
            compatible bug fixes are introduced.
        </td>
    </tr>
    <tr>
        <td class="signature">
            <code>preRelease</code>
        </td>
        <td class="description" markdown="span">
            The pre-release component of the version. Is separated from the other
            components with a dash (`-`) and clearly distinguishes the version
            from a "normal" version (e.g. an `alpha` version), marking it as
            potentially unstable.
        </td>
    </tr>
    <tr>
        <td class="signature">
            <code>build</code>
        </td>
        <td class="description" markdown="span">
            The build metadata of the version. Is separated from the other components
            with a plus (`+`) and can contain additional information about the
            specific build.
        </td>
    </tr>
</table>

## Public Computed Properties

<table class="class-members">
    <tr>
        <td class="signature">
            <code>valid</code>
        </td>
        <td class="description" markdown="span">
            Returns a value indicating whether this `Version` instance
            represents a valid semantic version.
            If this value is `false`, all components of the instance are
            either `NaN` or an empty string.
        </td>
    </tr>
</table>

## Public Non-Mutator Methods

<table class="class-members">
    <tr>
        <td class="signature">
            {% highlight ts %}incrementMajor(): Version{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">Returns a new `Version` with the `major` component
            incremented by 1.
            Note that this will strip out any `preRelease` or `build`
            labels and reset the `patch` and `minor` components.</p>
            <p>If the version is invalid, the new instance will also be invalid.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}incrementMinor(): Version{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">Returns a new `Version` with the `minor` component
            incremented by 1.
            Note that this will strip out any `preRelease` or `build`
            labels and reset the `patch` component.</p>
            <p>If the version is invalid, the new instance will also be invalid.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}incrementPatch(): Version{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">Returns a new `Version` with the `patch` component
            incremented by 1.
            Note that this will strip out any `preRelease` or `build`
            labels.</p>
            <p>If the version is invalid, the new instance will also be invalid.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}equals(version: Version | string): boolean{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">Returns `true` if the two versions are completely identical.</p>
            <p>Note that two invalid versions are always identical.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}toString(): string{% endhighlight %}
        </td>
        <td class="description">
            <p>Returns the proper semantic string representation of this semantic version.</p>
            <p>Note that invalid versions return "Invalid Version".</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}toJSON(): string{% endhighlight %}
        </td>
        <td class="description">
            <p>Same output as `toString()`.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}compare(version: Version | string): CompareResult{% endhighlight %}
        </td>
        <td class="description">
            <p>Compares this version with another one, returning a result based on
            which should take precedence over the other.</p>
            <p markdown="span">If this version is lower than the passed version in precedence, returns
            `CompareResult.Less` (-1).  
            If this version is equal to the passed version in precedence, returns
            `CompareResult.Equal` (0).  
            If this version is greater than the passed version in precedence, returns
            `CompareResult.Greater` (1).  
            If this version is invalid but the passed version is not, returns
            `CompareResult.Less` (-1).</p>
            <p markdown="span">A pre-release version is always lower in precedence. If both versions
            have a pre-release component, each dot-separated identifier is compared
            numerically or lexically, whichever applies. If the number of identifiers
            is not equal and all preceding identifiers are the same, the version
            with *more* identifiers wins.</p>
            <p markdown="span">Note that a result of `0` (or `CompareResult.Equal`) does **not**
            mean both instances are identical, just that none take precedence
            over the other. Use `equals()` to check for equality.</p>
        </td>
    </tr>
</table>

## Remarks

This class is not capable of representing versions with individual components
larger than
[`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).
Versions constructed with such large numbers are not inherently invalid, but
their version components will be rounded to the next representable integer
value.
