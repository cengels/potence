---
layout:      page
title:       Numbers.isSafeFloat()
module:      Numbers
description: Checks if a number is a "safe" floating point number, that is
             whether it is unlikely to suffer from floating point inaccuracies.
parameters:
  value: A number which may or may not be a floating point number.
---
## Syntax

```ts
function isSafeFloat(value: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.isSafeFloat(0.1);  // -> false
Numbers.isSafeFloat(0.5);  // -> true
```

## Remarks

This function tests for floating point inaccuracy by conducting an arbitrary
mathematical operation on the value, inverting it, and comparing it with the
original value. As a result, this function **only returns a "guess"**. You
should not base any important conditions off the result of this function.

This function always returns false for
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN),
[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY),
and [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY).

To compare floating point numbers, use
[`Numbers.compare()`]({{ site.baseurl }}{% link _pages/Numbers/compare.md %})
instead. Its page also offers a more detailed explanation of floating
point inaccuracies.

Contrast [`Numbers.isUnsafeFloat()`]({{ site.baseurl }}{% link _pages/Numbers/isUnsafeFloat.md %}).
