---
layout:      page
title:       Numbers.compare()
module:      Numbers
description: Accurately compares two integral
             or floating point numbers with the given tolerance
             and returns a value indicating whether they are "equal".
parameters:
  value1:    The first number to compare.
  value2:    The second number to compare.
  tolerance: The tolerance to use for this comparison.
             By default, this is `0.0000001`. To use a custom tolerance, either
             supply this argument or configure a new global default tolerance
             using §Numbers.configure()§.
---
## Syntax

```ts
function compare(value1: number, value2: number, tolerance?: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.compare(0.1 + 0.2, 0.3)  // -> true
```

## Remarks

This function will always return false if one of the operands is either
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN),
[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY),
or [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY).

## On Tolerances

We should all be more tolerant of one another, but this goes doubly for floating
point numbers. Long story short: all numbers are represented by a finite number
of bits (64 in JavaScript), but what if the number of bits you have available
are not enough to store the floating point number in question?

The answer is that your number will essentially be truncated. If more than 64
bits are necessary to store your float, all bits beyond the 64th will be cut off
and you'll end up with an approximated value. A good example for this is any
fraction whose floating point representation is a [repeating
decimal](https://en.wikipedia.org/wiki/Repeating_decimal), like
<sup>1</sup>⁄<sub>3</sub> (`0.33333333...`). Since bits cannot infinitely
repeat, this means that your floating point third will only contain about 16
digits, which is mathematically not equal to <sup>1</sup>⁄<sub>3</sub>.

The same can happen with any kind of floating point arithmetic. For instance,
`0.1 + 0.2` does *not* equal `0.3` in most programming languages. Instead the
result will be something like `0.30000000000000004`. This is because neither `0.1`
nor `0.2` *nor* `0.3` can be accurately represented in binary notation, which means
they are rounded before they are stored. Generally, if you're converting such a
number to string, the language will cut off decimals after a certain point as it
realizes those are probably an inaccuracy.

You can try that yourself. Try to open a JavaScript console on this web page and
entering the number `0.10000000000000000555` (which is closer to `0.1`'s binary
representation). Chances are your console will simply print `0.1`.

The problem comes from attempting to either add, subtract, multiply, or divide
such inaccurate values. Instead of only the result being rounded, you'll be
doing a mathematical operation with *already rounded* numbers, which means that
even before the result is rounded to fit it into binary, it's already
inaccurate. That is why `0.1 + 0.2 !== 0.3`.

This function allows you to combat this problem. By specifying an appropriate
tolerance (or leaving the default tolerance), you'll essentially say, "If these
two decimals diverge from each other by a very small margin, please consider
that just floating point inaccuracy and return `true` for me anyway."

See
[here](https://indepth.dev/here-is-what-you-need-to-know-about-javascripts-number-type/)
for a good article on floating point inaccuracies.

If you're comparing two integral numbers with each other, there is no need to
use this function at all. In that case, you should use a simple equals
comparison (`===`) instead.

*Warning*: This function does not use
[`Number.EPSILON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)
as its default tolerance. *This is by design.*  As the MDN documentation states,
`Number.EPSILON` is not some kind of magic value to aid you in all your decimal
comparison pursuits. It is merely the difference between 1 and the smallest
floating point number greater than 1. This means that `Number.EPSILON` is an
*extremely small number*. It just so happens that `Math.abs(0.1 + 0.2 - 0.3) <
Number.EPSILON`, but for most floating point inaccuracies, this is **not** the
case.
