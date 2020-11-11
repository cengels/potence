---
layout:      class
title:       Range
module:      Numbers
description: A class that encompasses a range between two numbers.
---

## Constructor

```ts
public constructor(from: number, to: number);
```

<div class="description">
    <p>Creates a range from the given number to another.</p>

    <p markdown="span">Note that `from` does not necessarily need to be smaller than `to`.
    If it is greater, the range is considered inverted.</p>
</div>

## Public Properties

<table class="class-members">
    <tr>
        <td class="signature">
            <code>from</code>
        </td>
        <td class="description" markdown="span">
            Gets the number that was passed in as the range's left bound.
        </td>
    </tr>
    <tr>
        <td class="signature">
            <code>to</code>
        </td>
        <td class="description" markdown="span">
            Gets the number that was passed in as the range's right bound.
        </td>
    </tr>
</table>

## Public Mutator Methods

<table class="class-members">
    <tr>
        <td class="signature">
            {% highlight ts %}set(from: number, to: number): this{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Sets the values of `from` and `to` to the new values.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}invert(): this{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Gets the number that was passed in as the range's right bound.
        </td>
    </tr>
</table>

## Public Computed Properties

<table class="class-members">
    <tr>
        <td class="signature">
            {% highlight ts %}min(): number{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Gets either `from` or `to`, depending on which is smaller.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}max(): number{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Gets either `from` or `to`, depending on which is greater.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}center(): number{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">Gets the number in-between `from` and `to` which is an
            equal distance away from both `from` and `to`.</p>
            <p markdown="span">*Example*: `new Range(5, 10).center()` returns `7.5`.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}span(): number{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">Gets the total length of the range. This value will always be positive.</p>
            <p markdown="span">*Example*: `new Range(3, 7).span()` returns `4`.</p>
        </td>
    </tr>
</table>

## Public Non-Mutator Methods

<table class="class-members">
    <tr>
        <td class="signature">
            {% highlight ts %}clamp(value: number): number{% endhighlight %}
        </td>
        <td class="description">
            <p markdown="span">
                Clamps `value` to this range. If `value` exceeds the range's bounds,
                it will be clamped to that bound, otherwise `value` is returned unchanged.
            </p>
            <p markdown="span">*Example*: `new Range(0, 10).clamp(11)` returns `10`.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}contains(range: ReadonlyRange): boolean{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Returns `true` if the target range is completely contained in this range.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}contains(value: number, tolerance?: number): boolean{% endhighlight %}
        </td>
        <td class="description">
            <p>Checks if the number is contained in this range.</p>
            <p markdown="span">A number is considered *contained* by the range if it lies in-between or on the bounds of this range.</p>
            <p markdown="span">This function allows you to specify a tolerance to combat floating point inaccuracies. By default a tolerance of `0.00000001` is used. The tolerance does not need to be a decimal number though—you can specify arbitrary positive or negative tolerances to expand or narrow the range before the contains check.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}between(value: number): boolean{% endhighlight %}
        </td>
        <td class="description">
            <p>Checks if the number is in-between the end points of this range.</p>
            <p markdown="span">This function differs from `contains()` in that `contains()` also considers values on the two end points to be "inside" the range. This function does not.</p>
            <p markdown="span">It is recommended not to use this function with floating point numbers. Use `contains()` with an appropriate tolerance instead.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}overlaps(range: ReadonlyRange): boolean{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Returns `true` if some part of `range` overlaps with this range.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}intersect(range: ReadonlyRange): number{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Finds the intersection point closest to this range's center with the given range. If this range completely envelops the target range, returns this range's center. If there is no intersection, throws an error. To avoid this, check if there is an intersection using `overlap()` first.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}at(value: number): number{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Gets the value located at `value`. For the returned value to be inside this range, `value` should be between 0.0 and 1.0.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}relative(value: number): number{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Gets a relative value between 0.0 and 1.0 to indicate the position of the passed value inside the range. This function is the counter-component to `at()`.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}wrap(value: number): number{% endhighlight %}
        </td>
        <td class="description">
            <p>Wraps the number into this range. That is, if the number exceeds this range, it will "wrap around" the range's start.</p>
            <p>For instance, in a range of -3 to 3, the value 4 would be wrapped to -2.</p>
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}equals(range: ReadonlyRange): boolean{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Checks if the given range is identical to this one.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}equals(from: number, to: number): boolean{% endhighlight %}
        </td>
        <td class="description" markdown="span">
            Checks if this range has the given `from` and `to` values.
        </td>
    </tr>
    <tr>
        <td class="signature">
            {% highlight ts %}clone(): ReadonlyRange{% endhighlight %}
        </td>
        <td class="description">
            Clones the range.
        </td>
    </tr>
</table>

## Remarks

Note that all computed properties like `min()` or `max()` are cached after the
first call and only recomputed if the range bounds change. As a result, there is
no need to store their results in temporary variables to avoid recomputation.

There is also a read-only interface of `Range` available called `ReadonlyRange`.

Due to conflicts with the
[`Range`](https://github.com/microsoft/TypeScript/blob/b5b0437a86661c8d7bc76c5860c07305df17899c/lib/lib.dom.d.ts#L12437)
from `lib.dom.d.ts`, you may wish to create a new range using
[`Numbers.range()`]({% link docs/Numbers/range_func.md %})
instead of using the constructor directly.
